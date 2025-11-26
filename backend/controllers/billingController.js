import Stripe from "stripe";
import { getSubscriptionByIssuer, isSubscriptionActive, upsertSubscription } from "../services/subscriptionService.js";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: "2024-06-20" }) : null;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const PLANS = [
	{
		id: "polyid-monthly",
		name: process.env.MONTHLY_PLAN_NAME || "PolyID Pro",
		headline: "Unlimited credential issuance with analytics & support",
		priceUsd: Number(process.env.MONTHLY_PLAN_PRICE_USD || 79),
		interval: "monthly",
		currency: process.env.MONTHLY_PLAN_CURRENCY || "usd",
		features: ["Unlimited credential templates", "Priority verification APIs", "Usage analytics dashboard", "Email support"],
		stripePriceId: process.env.STRIPE_PRICE_ID_MONTHLY
	}
];

const publicPlans = PLANS.map(({ stripePriceId, ...rest }) => rest);

function ensureStripeAvailable() {
	if (!stripe) throw new Error("Stripe secret key is not configured");
}

function findPlan(planId) {
	return PLANS.find(plan => plan.id === planId);
}

function successUrl(extra = "") {
	return `${FRONTEND_URL}${extra}`;
}

export async function listPlans(req, res) {
	return res.json({ plans: publicPlans });
}

export async function getSubscriptionStatus(req, res) {
	try {
		const issuerId = req.user?.issuerId;
		const subscription = await getSubscriptionByIssuer(issuerId);
		return res.json({
			subscription,
			active: isSubscriptionActive(subscription)
		});
	} catch (err) {
		console.error("[billing] status error:", err.message);
		return res.status(500).json({ error: "Failed to load subscription status" });
	}
}

export async function createCheckoutSession(req, res) {
	try {
		ensureStripeAvailable();
		const issuerId = req.user?.issuerId;
		const email = req.user?.email;
		const planId = req.body?.planId || PLANS[0].id;

		const plan = findPlan(planId);
		if (!plan) {
			return res.status(400).json({ error: "Invalid plan selection" });
		}
		if (!plan.stripePriceId) {
			return res.status(500).json({ error: "Stripe price ID missing for plan. Set STRIPE_PRICE_ID_MONTHLY." });
		}

		const session = await stripe.checkout.sessions.create({
			mode: "subscription",
			customer_email: email,
			success_url: successUrl("/?billing=success"),
			cancel_url: successUrl("/?billing=cancelled"),
			line_items: [{ price: plan.stripePriceId, quantity: 1 }],
			metadata: {
				issuerId,
				planId: plan.id
			}
		});

		await upsertSubscription(issuerId, {
			status: "pending",
			plan_id: plan.id,
			plan_name: plan.name,
			plan_interval: plan.interval,
			price_usd: plan.priceUsd,
			checkout_session_id: session.id
		});

		return res.json({ checkoutUrl: session.url });
	} catch (err) {
		console.error("[billing] checkout error:", err);
		return res.status(500).json({ error: err.message || "Failed to create checkout session" });
	}
}

export async function createPortalSession(req, res) {
	try {
		ensureStripeAvailable();
		const issuerId = req.user?.issuerId;
		const subscription = await getSubscriptionByIssuer(issuerId);
		if (!subscription?.stripe_customer_id) {
			return res.status(400).json({ error: "Active subscription not found" });
		}

		const portal = await stripe.billingPortal.sessions.create({
			customer: subscription.stripe_customer_id,
			return_url: successUrl("/?billing=portal")
		});

		return res.json({ portalUrl: portal.url });
	} catch (err) {
		console.error("[billing] portal error:", err.message);
		return res.status(500).json({ error: "Failed to create billing portal session" });
	}
}

async function syncStripeSubscription(eventType, payload) {
	const issuerId = payload.metadata?.issuerId;
	if (!issuerId) return;

	let currentPeriodEnd = null;
	let stripeSubscriptionId = null;
	let stripeCustomerId = payload.customer || payload.customer_id || payload.customerId;

	if (payload.subscription) {
		stripeSubscriptionId = typeof payload.subscription === "string" ? payload.subscription : payload.subscription.id;
	}

	if (stripe && stripeSubscriptionId) {
		try {
			const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
			currentPeriodEnd = subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null;
			stripeCustomerId = subscription.customer;
		} catch (err) {
			console.warn("[billing] Unable to retrieve subscription", err.message);
		}
	}

	const statusMap = {
		"checkout.session.completed": "active",
		"invoice.payment_succeeded": "active",
		"invoice.payment_failed": "past_due",
		"customer.subscription.deleted": "cancelled"
	};

	const status = statusMap[eventType] || payload.status;

	await upsertSubscription(issuerId, {
		status,
		stripe_customer_id: stripeCustomerId || payload.customer_email || null,
		stripe_subscription_id: stripeSubscriptionId,
		current_period_end: currentPeriodEnd,
		last_event: eventType
	});
}

export async function stripeWebhookHandler(req, res) {
	if (!stripe) {
		return res.status(400).send("Stripe is not configured");
	}

	const signature = req.headers["stripe-signature"];
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

	if (!webhookSecret) {
		return res.status(400).send("Webhook secret missing");
	}

	let event;
	try {
		event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
	} catch (err) {
		console.error("[billing] webhook signature error:", err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	const eventType = event.type;
	const payload = event.data.object;

	try {
		await syncStripeSubscription(eventType, payload);
	} catch (err) {
		console.error("[billing] webhook processing error:", err.message);
		return res.status(500).send("Failed to process webhook");
	}

	return res.json({ received: true });
}

export async function activateTestSubscription(req, res) {
	try {
		const issuerId = req.user?.issuerId;
		if (!issuerId) return res.status(400).json({ error: "User not identified" });

		const subscription = await upsertSubscription(issuerId, {
			status: "active",
			plan_id: "polyid-monthly",
			plan_name: "PolyID Pro (Test)",
			current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
			last_event: "test_activation"
		});

		return res.json({ success: true, subscription });
	} catch (err) {
		console.error("[billing] test activation error:", err.message);
		return res.status(500).json({ error: "Failed to activate test subscription" });
	}
}



