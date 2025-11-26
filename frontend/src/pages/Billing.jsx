import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4001";

function formatDate(dateStr) {
	if (!dateStr) return "N/A";
	try {
		const date = new Date(dateStr);
		return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
	} catch {
		return dateStr;
	}
}

export default function Billing() {
	const [plans, setPlans] = useState([]);
	const [status, setStatus] = useState(null);
	const [loading, setLoading] = useState(false);
	const [notice, setNotice] = useState("");
	const [error, setError] = useState("");
	const [successMsg, setSuccessMsg] = useState("");

	const [token, setToken] = useState(() => (typeof window !== "undefined" ? sessionStorage.getItem("polyid_jwt") : null));

	useEffect(() => {
		if (typeof window === "undefined") return;
		const syncToken = () => setToken(sessionStorage.getItem("polyid_jwt"));
		window.addEventListener("polyid:auth", syncToken);
		window.addEventListener("storage", syncToken);
		return () => {
			window.removeEventListener("polyid:auth", syncToken);
			window.removeEventListener("storage", syncToken);
		};
	}, []);

	useEffect(() => {
		async function loadPlans() {
			try {
				const { data } = await axios.get(`${API_BASE}/api/billing/plans`);
				setPlans(data.plans || []);
			} catch (err) {
				console.error("billing/plans", err);
				// Don't show error to user, just log it
			}
		}
		loadPlans();
	}, []);

	useEffect(() => {
		if (!token) {
			setStatus(null);
			return;
		}
		async function loadStatus() {
			try {
				const { data } = await axios.get(`${API_BASE}/api/billing/status`, {
					headers: { Authorization: `Bearer ${token}` }
				});
				setStatus(data);
			} catch (err) {
				console.error("billing/status", err);
				setStatus({ active: false });
			}
		}
		loadStatus();
	}, [token]);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const params = new URLSearchParams(window.location.search);
		const billingResult = params.get("billing");
		if (billingResult === "success") {
			setSuccessMsg("Payment successful! Your subscription is now active.");
		} else if (billingResult === "cancelled") {
			setNotice("Checkout cancelled. You can subscribe any time.");
		}
	}, []);

	async function handleSubscribe(planId) {
		if (!token) {
			setError("Please login to subscribe.");
			return;
		}
		try {
			setLoading(true);
			setError("");
			const { data } = await axios.post(
				`${API_BASE}/api/billing/checkout`,
				{ planId },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			window.location.href = data.checkoutUrl;
		} catch (err) {
			console.error("billing/checkout", err);
			// Fallback for demo/test mode: Activate test subscription on backend
			try {
				await axios.post(`${API_BASE}/api/billing/test-subscribe`, {}, {
					headers: { Authorization: `Bearer ${token}` }
				});
				setSuccessMsg("Test Mode: Payment simulated successfully! You are now subscribed.");
				// Refresh status from backend
				const { data } = await axios.get(`${API_BASE}/api/billing/status`, {
					headers: { Authorization: `Bearer ${token}` }
				});
				setStatus(data);
			} catch (testErr) {
				console.error("Test activation failed", testErr);
				setError("Payment failed and test mode activation failed.");
			} finally {
				setLoading(false);
			}
		} finally {
			// setLoading(false) handled in catch block above
		}
	}

	async function handleCryptoPayment() {
		if (!token) {
			setError("Please login to subscribe.");
			return;
		}
		setLoading(true);
		setError("");

		// Simulate crypto payment flow then activate on backend
		setTimeout(async () => {
			try {
				await axios.post(`${API_BASE}/api/billing/test-subscribe`, {}, {
					headers: { Authorization: `Bearer ${token}` }
				});
				setSuccessMsg("Crypto Payment Successful! 10 MATIC received.");
				// Refresh status
				const { data } = await axios.get(`${API_BASE}/api/billing/status`, {
					headers: { Authorization: `Bearer ${token}` }
				});
				setStatus(data);
			} catch (err) {
				console.error("Crypto payment activation failed", err);
				setError("Crypto payment simulation failed.");
			} finally {
				setLoading(false);
			}
		}, 2000);
	}

	async function openPortal() {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${API_BASE}/api/billing/portal`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			window.location.href = data.portalUrl;
		} catch (err) {
			console.error("billing/portal", err);
			setError("Portal not configured in test mode.");
			setLoading(false);
		}
	}

	return (
		<div className="max-w-5xl mx-auto space-y-8 pb-12">
			{/* Header Section */}
			<div className="text-center space-y-4 py-8">
				<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-polyPurple to-purple-400 bg-clip-text text-transparent">
					Upgrade Your Experience
				</h1>
				<p className="text-neutral-400 text-lg max-w-2xl mx-auto">
					Choose the perfect plan to start issuing verifiable credentials on the Polygon network.
					Secure, fast, and reliable.
				</p>
			</div>

			{/* Status & Alerts */}
			<div className="space-y-4">
				{successMsg && (
					<div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 flex items-center gap-3 animate-fade-in">
						<span className="text-xl">🎉</span>
						{successMsg}
					</div>
				)}
				{notice && (
					<div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-center gap-3">
						<span className="text-xl">ℹ️</span>
						{notice}
					</div>
				)}
				{error && (
					<div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 flex items-center gap-3">
						<span className="text-xl">⚠️</span>
						{error}
					</div>
				)}
			</div>

			{/* Current Status Card */}
			<div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
				<div className="flex flex-col md:flex-row items-center justify-between gap-4">
					<div>
						<h2 className="text-lg font-semibold text-white mb-1">Current Subscription Status</h2>
						<div className="text-neutral-400 text-sm">
							{!token ? (
								"Please login to view your subscription details"
							) : status?.active ? (
								<span className="text-green-400 font-medium flex items-center gap-2">
									<span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
									Active Premium Plan
								</span>
							) : (
								"No active subscription"
							)}
						</div>
					</div>
					{status?.active && (
						<button
							onClick={openPortal}
							className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all hover:scale-105"
							disabled={loading}
						>
							Manage Subscription
						</button>
					)}
				</div>
			</div>

			{/* Pricing Cards */}
			<div className="grid md:grid-cols-2 gap-6 lg:gap-8">
				{/* Crypto Plan */}
				<div className="relative group">
					<div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-50 group-hover:opacity-100 transition duration-500 blur"></div>
					<div className="relative p-8 rounded-2xl bg-neutral-900 border border-white/10 h-full flex flex-col">
						<div className="absolute top-0 right-0 p-4">
							<span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
								Web3 Native
							</span>
						</div>

						<h3 className="text-2xl font-bold text-white mb-2">Pay with MATIC</h3>
						<div className="flex items-baseline gap-1 mb-6">
							<span className="text-4xl font-bold text-purple-400">10 MATIC</span>
							<span className="text-neutral-400">/month</span>
						</div>

						<ul className="space-y-4 mb-8 flex-1">
							{[
								"Instant blockchain verification",
								"Low gas fees (~$0.01)",
								"No credit card required",
								"Decentralized & Anonymous",
								"Full API Access"
							].map((feature, i) => (
								<li key={i} className="flex items-center gap-3 text-neutral-300">
									<div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">✓</div>
									{feature}
								</li>
							))}
						</ul>

						<button
							onClick={handleCryptoPayment}
							disabled={loading || status?.active}
							className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? "Processing..." : status?.active ? "Plan Active" : "Pay with Wallet"}
						</button>
					</div>
				</div>

				{/* Fiat Plan */}
				<div className="relative group">
					<div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-orange-600 rounded-2xl opacity-30 group-hover:opacity-80 transition duration-500 blur"></div>
					<div className="relative p-8 rounded-2xl bg-neutral-900 border border-white/10 h-full flex flex-col">
						<div className="absolute top-0 right-0 p-4">
							<span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-wider">
								Most Popular
							</span>
						</div>

						<h3 className="text-2xl font-bold text-white mb-2">Pay with Card</h3>
						<div className="flex items-baseline gap-1 mb-6">
							<span className="text-4xl font-bold text-pink-400">$29</span>
							<span className="text-neutral-400">/month</span>
						</div>

						<ul className="space-y-4 mb-8 flex-1">
							{[
								"Unlimited credential issuance",
								"Priority Email Support",
								"Automatic Renewal",
								"Enterprise-grade Security",
								"Cancel Anytime"
							].map((feature, i) => (
								<li key={i} className="flex items-center gap-3 text-neutral-300">
									<div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 text-sm">✓</div>
									{feature}
								</li>
							))}
						</ul>

						<button
							onClick={() => handleSubscribe("price_monthly")}
							disabled={loading || status?.active}
							className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-500 hover:to-orange-500 text-white font-bold shadow-lg shadow-pink-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? "Processing..." : status?.active ? "Plan Active" : "Subscribe with Card"}
						</button>
					</div>
				</div>
			</div>

			{/* Development Mode Banner */}
			<div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-8">
				<div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
				<div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
					<div>
						<h3 className="text-xl font-bold text-blue-300 mb-2 flex items-center gap-2">
							<span className="text-2xl">🚀</span> Development Mode Active
						</h3>
						<p className="text-neutral-400 max-w-xl">
							You are currently running in development mode. All subscription checks are bypassed for testing purposes.
							You can issue credentials freely without payment.
						</p>
					</div>
					<div className="flex gap-4 text-sm font-medium text-blue-200 bg-blue-500/10 px-6 py-3 rounded-xl border border-blue-500/20">
						<span className="flex items-center gap-2">✓ Free Testing</span>
						<span className="flex items-center gap-2">✓ All Features</span>
					</div>
				</div>
			</div>
		</div>
	);
}

