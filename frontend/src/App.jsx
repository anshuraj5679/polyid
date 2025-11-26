import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import axios from "axios";
import Home from "./pages/Home.jsx";
import IssueCredential from "./pages/IssueCredential.jsx";
import MyCredentials from "./pages/MyCredentials.jsx";
import Verify from "./pages/Verify.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminSignup from "./pages/AdminSignup.jsx";
import Billing from "./pages/Billing.jsx";
import NetworkGuard from "./components/NetworkGuard.jsx";
import IntroAnimation from "./components/IntroAnimation.jsx";
import { CONTRACT_ADDRESS } from "./lib/contract.js";
import { explorerAddress } from "./lib/explorer.js";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4001";

function NavItem({ label, active, onClick }) {
	return (
		<button onClick={onClick} className={`px-3 py-2 rounded-md text-sm font-medium ${active ? "bg-polyPurple/20 text-white" : "text-neutral-300 hover:text-white hover:bg-white/5"}`}>
			{label}
		</button>
	);
}

export default function App() {
	const [showIntro, setShowIntro] = useState(true);
	const [page, setPage] = useState("home");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [subscriptionStatus, setSubscriptionStatus] = useState(null);

	// Check subscription status when logged in
	useEffect(() => {
		if (!isLoggedIn) {
			setSubscriptionStatus(null);
			return;
		}

		async function checkSubscription() {
			try {
				const token = sessionStorage.getItem("polyid_jwt");
				if (!token) return;

				const { data } = await axios.get(`${API_BASE}/api/billing/status`, {
					headers: { Authorization: `Bearer ${token}` }
				});
				setSubscriptionStatus(data);
			} catch (err) {
				console.error("Failed to check subscription:", err);
				setSubscriptionStatus(null);
			}
		}

		checkSubscription();
		// Refresh subscription status every 30 seconds
		const interval = setInterval(checkSubscription, 30000);
		return () => clearInterval(interval);
	}, [isLoggedIn]);

	useEffect(() => {
		if (typeof window === "undefined") return;

		// Check initial login state
		setIsLoggedIn(!!sessionStorage.getItem("polyid_jwt"));

		const params = new URLSearchParams(window.location.search);
		if (params.get("billing")) {
			setPage("billing");
		}

		function handleNavigate(event) {
			if (event.detail) {
				setPage(event.detail);
			}
		}

		function handleAuth() {
			setIsLoggedIn(!!sessionStorage.getItem("polyid_jwt"));
		}

		// Clear session on window close/refresh
		function handleBeforeUnload() {
			sessionStorage.removeItem("polyid_jwt");
		}

		window.addEventListener("polyid:navigate", handleNavigate);
		window.addEventListener("polyid:auth", handleAuth);
		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("polyid:navigate", handleNavigate);
			window.removeEventListener("polyid:auth", handleAuth);
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	function handleLogout() {
		sessionStorage.removeItem("polyid_jwt");
		setIsLoggedIn(false);
		setPage("home");
		if (typeof window !== "undefined") {
			window.dispatchEvent(new Event("polyid:auth"));
		}
	}

	return (
		<div className="min-h-screen">
			{showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
			<header className="border-b border-white/10 sticky top-0 backdrop-blur bg-neutral-950/60">
				<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
					<div className="flex items-center gap-3">
						{/* PolyID Logo */}
						<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-polyPurple to-fuchsia-500 flex items-center justify-center shadow-lg shadow-polyPurple/30">
							<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
							</svg>
						</div>
						<div>
							<div className="text-lg font-bold bg-gradient-to-r from-polyPurple to-fuchsia-500 bg-clip-text text-transparent">
								PolyID
							</div>
							<div className="text-[10px] text-neutral-400 -mt-1">Verifiable Credentials</div>
						</div>
						{CONTRACT_ADDRESS && (
							<a className="ml-2 text-xs text-neutral-300 hover:text-white underline" href={explorerAddress(CONTRACT_ADDRESS)} target="_blank" rel="noreferrer">
								Contract
							</a>
						)}
					</div>
					<div className="flex gap-2">
						<NavItem label="Home" active={page === "home"} onClick={() => setPage("home")} />
						<NavItem label="Issue" active={page === "issue"} onClick={() => setPage("issue")} />
						<NavItem label="My Credentials" active={page === "mine"} onClick={() => setPage("mine")} />
						<NavItem label="Verify" active={page === "verify"} onClick={() => setPage("verify")} />
						{!isLoggedIn && <NavItem label="Sign Up" active={page === "signup"} onClick={() => setPage("signup")} />}
						<NavItem label={isLoggedIn ? "Account" : "Login"} active={page === "admin"} onClick={() => setPage("admin")} />
						<NavItem label="Billing" active={page === "billing"} onClick={() => setPage("billing")} />
					</div>
					<div className="flex items-center gap-3">
						{isLoggedIn && (
							<>
								{subscriptionStatus !== null && (
									<button
										onClick={() => setPage("billing")}
										className={`px-3 py-1.5 text-xs rounded border transition-all hover:scale-105 ${subscriptionStatus.active
											? "bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30"
											: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/30"
											}`}
										title={subscriptionStatus.active ? "Click to manage subscription" : "Click to subscribe"}
									>
										{subscriptionStatus.active ? "✓ Subscribed" : "⚠ No Subscription"}
									</button>
								)}
								<button onClick={handleLogout} className="px-3 py-1.5 text-sm rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30">
									Logout
								</button>
							</>
						)}
						<ConnectButton />
					</div>
				</div>
			</header>
			<NetworkGuard>
				<motion.main className="max-w-6xl mx-auto px-4 py-8" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
					{page === "home" && <Home />}
					{page === "issue" && <IssueCredential />}
					{page === "mine" && <MyCredentials />}
					{page === "verify" && <Verify />}
					{page === "admin" && <AdminLogin onLoggedIn={() => setPage("issue")} onSwitchToSignup={() => setPage("signup")} />}
					{page === "signup" && <AdminSignup onSignupSuccess={() => setPage("admin")} />}
					{page === "billing" && <Billing />}
				</motion.main>
			</NetworkGuard>
		</div>
	);
}

