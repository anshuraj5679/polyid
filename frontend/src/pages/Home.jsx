import { useEffect, useState } from "react";
import axios from "axios";
import { explorerAddress } from "../lib/explorer.js";
import { jwtDecode } from "jwt-decode";

export default function Home() {
	const [issuers, setIssuers] = useState([]);
	const [status, setStatus] = useState({ api: "checking...", contract: "" });
	const [userInfo, setUserInfo] = useState(null);
	const base = import.meta.env.VITE_API_BASE || "http://localhost:4000";
	const address = import.meta.env.VITE_CONTRACT_ADDRESS || "";
	
	useEffect(() => {
		// Get user info from JWT token
		const token = sessionStorage.getItem("polyid_jwt");
		if (token) {
			try {
				const decoded = jwtDecode(token);
				setUserInfo(decoded);
			} catch (error) {
				console.error("Error decoding token:", error);
			}
		}
	}, []);
	
	useEffect(() => {
		(async () => {
			try {
				const health = await axios.get(`${base}/api/health`).then(() => "ok").catch(() => "down");
				setStatus({ api: health, contract: address ? "set" : "missing" });
				const { data } = await axios.get(`${base}/api/issuers`);
				setIssuers(Array.isArray(data.issuers) ? data.issuers : []);
			} catch {
				setStatus((s) => ({ ...s, api: "down" }));
				setIssuers([]);
			}
		})();
	}, []);
	return (
		<div className="space-y-8">
			{/* Welcome Section - Show if logged in */}
			{userInfo && (
				<section className="p-6 rounded-xl border border-polyPurple/30 bg-gradient-to-r from-polyPurple/10 to-fuchsia-500/10">
					<div className="flex items-center gap-4">
						<div className="w-16 h-16 rounded-full bg-gradient-to-br from-polyPurple to-fuchsia-500 flex items-center justify-center text-2xl font-bold">
							{userInfo.email?.charAt(0).toUpperCase() || "U"}
						</div>
						<div>
							<h2 className="text-2xl font-semibold">Welcome back!</h2>
							<p className="text-neutral-300">{userInfo.email}</p>
							{userInfo.walletAddress && (
								<p className="text-sm text-neutral-400 mt-1">
									Wallet: {userInfo.walletAddress.slice(0, 6)}...{userInfo.walletAddress.slice(-4)}
								</p>
							)}
						</div>
					</div>
				</section>
			)}

			{/* PolyID Hero Section */}
			<section className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-polyPurple/20 via-fuchsia-500/10 to-transparent">
				<div className="flex items-start gap-6">
					{/* PolyID Logo */}
					<div className="flex-shrink-0">
						<div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-polyPurple to-fuchsia-500 flex items-center justify-center shadow-lg shadow-polyPurple/50">
							<svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
							</svg>
						</div>
					</div>
					
					{/* PolyID Description */}
					<div className="flex-1">
						<h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-polyPurple to-fuchsia-500 bg-clip-text text-transparent">
							PolyID
						</h2>
						<p className="text-lg text-neutral-200 mb-4">
							Decentralized Credential Verification Platform
						</p>
						<p className="text-neutral-300 mb-4">
							PolyID is a blockchain-based platform that enables universities to issue verifiable digital credentials as Soulbound Tokens (SBTs) on the Polygon network. These credentials are permanent, tamper-proof, and instantly verifiable by anyone, anywhere.
						</p>
						
						<div className="grid grid-cols-2 gap-4 mt-6">
							<div className="p-4 rounded-lg bg-white/5 border border-white/10">
								<div className="text-2xl mb-2">🎓</div>
								<div className="font-semibold text-sm">For Universities</div>
								<div className="text-xs text-neutral-400 mt-1">Issue verifiable credentials on blockchain</div>
							</div>
							<div className="p-4 rounded-lg bg-white/5 border border-white/10">
								<div className="text-2xl mb-2">👨‍🎓</div>
								<div className="font-semibold text-sm">For Students</div>
								<div className="text-xs text-neutral-400 mt-1">Own your credentials forever</div>
							</div>
							<div className="p-4 rounded-lg bg-white/5 border border-white/10">
								<div className="text-2xl mb-2">🔍</div>
								<div className="font-semibold text-sm">For Employers</div>
								<div className="text-xs text-neutral-400 mt-1">Verify credentials instantly</div>
							</div>
							<div className="p-4 rounded-lg bg-white/5 border border-white/10">
								<div className="text-2xl mb-2">⛓️</div>
								<div className="font-semibold text-sm">Blockchain Powered</div>
								<div className="text-xs text-neutral-400 mt-1">Secure, transparent, permanent</div>
							</div>
						</div>
					</div>
				</div>
				
				<div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-6 text-sm">
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-green-400"></span>
						<span className="text-neutral-400">API Status:</span>
						<span className="font-semibold text-green-400">{status.api}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-blue-400"></span>
						<span className="text-neutral-400">Contract:</span>
						<span className="font-semibold text-blue-400">{status.contract}</span>
					</div>
					{address && (
						<a 
							className="flex items-center gap-2 text-polyPurple hover:text-fuchsia-400 transition-colors" 
							href={explorerAddress(address)} 
							target="_blank" 
							rel="noreferrer"
						>
							<span>View on Explorer</span>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						</a>
					)}
				</div>
			</section>
			<section className="p-6 rounded-xl border border-white/10 bg-white/5">
				<h3 className="text-xl font-semibold mb-3">Verified Institutions</h3>
				<div className="flex flex-wrap gap-3">
					{issuers.map((u) => {
						const wa = (u.walletAddress || "").toString();
						const short = wa ? `${wa.slice(0, 6)}...${wa.slice(-4)}` : "";
						return (
							<div key={u._id || `${u.name}-${short}`} className="px-3 py-1 rounded-full border border-white/10 bg-polyPurple/20 text-sm">
								<span className="font-semibold">{u.name}</span>
								{short && <span className="ml-2 text-neutral-300">{short}</span>}
							</div>
						);
					})}
					{issuers.length === 0 && <div className="text-neutral-400 text-sm">No issuers yet.</div>}
				</div>
			</section>
			<section className="p-6 rounded-xl border border-white/10 bg-white/5">
				<h3 className="text-xl font-semibold mb-2">About Polygon</h3>
				<p className="text-neutral-300">Polygon Amoy is the latest testnet for Polygon PoS, offering fast and low-cost transactions for testing decentralized applications with full Ethereum compatibility.</p>
			</section>
			<section className="p-6 rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/5">
				<h3 className="text-xl font-semibold mb-2">Polygon ID (ZK Proof) — Coming Soon</h3>
				<p className="text-neutral-300">We will integrate Polygon ID to enable zero-knowledge proof verification of credentials without revealing sensitive details. Placeholder hooks are ready for seamless integration.</p>
			</section>
		</div>
	);
}
