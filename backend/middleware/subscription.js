import { getSubscriptionByIssuer, isSubscriptionActive } from "../services/subscriptionService.js";

export async function requireActiveSubscription(req, res, next) {
	try {
		const issuerId = req.user?.issuerId;
		if (!issuerId) {
			return res.status(401).json({ error: "Missing issuer id in token" });
		}

		// Development mode: bypass subscription check if Supabase not configured
		const isDevelopment = !process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY;
		
		if (isDevelopment) {
			console.log("[subscription] Development mode: bypassing subscription check");
			req.subscription = {
				issuer_id: issuerId,
				status: "active",
				plan_id: "dev-unlimited",
				current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
			};
			return next();
		}

		const subscription = await getSubscriptionByIssuer(issuerId);

		if (!isSubscriptionActive(subscription)) {
			return res.status(402).json({
				error: "Active subscription required to issue credentials",
				subscription,
				needsPayment: true
			});
		}

		req.subscription = subscription;
		next();
	} catch (err) {
		console.error("[subscription] middleware error:", err.message);
		
		// Fallback to development mode on error
		console.log("[subscription] Error occurred, falling back to development mode");
		req.subscription = {
			issuer_id: req.user?.issuerId,
			status: "active",
			plan_id: "dev-unlimited",
			current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
		};
		return next();
	}
}



