import { useState, useEffect } from "react";
import { BarChart3, Users, Award, TrendingUp, Calendar } from "lucide-react";

export default function Analytics() {
	const [stats, setStats] = useState({
		totalCredentials: 0,
		totalIssuers: 0,
		credentialsThisMonth: 0,
		revokedCredentials: 0,
		topInstitutions: [],
		recentActivity: []
	});

	useEffect(() => {
		loadAnalytics();
	}, []);

	async function loadAnalytics() {
		try {
			const base = import.meta.env.VITE_API_BASE || "http://localhost:4001";
			
			// Mock analytics data (replace with real API calls)
			const mockStats = {
				totalCredentials: 156,
				totalIssuers: 12,
				credentialsThisMonth: 23,
				revokedCredentials: 3,
				topInstitutions: [
					{ name: "MIT", count: 45 },
					{ name: "Harvard", count: 38 },
					{ name: "Stanford", count: 32 },
					{ name: "Tech University", count: 28 }
				],
				recentActivity: [
					{ type: "issued", institution: "MIT", count: 5, date: "2024-11-01" },
					{ type: "verified", count: 23, date: "2024-11-01" },
					{ type: "revoked", institution: "Harvard", count: 1, date: "2024-10-31" }
				]
			};
			
			setStats(mockStats);
		} catch (error) {
			console.error("Failed to load analytics:", error);
		}
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-3 mb-6">
				<BarChart3 className="w-8 h-8 text-polyPurple" />
				<h1 className="text-2xl font-bold">PolyID Analytics</h1>
			</div>

			{/* Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div className="bg-white/5 border border-white/10 rounded-lg p-4">
					<div className="flex items-center gap-3">
						<Award className="w-8 h-8 text-blue-400" />
						<div>
							<div className="text-2xl font-bold">{stats.totalCredentials}</div>
							<div className="text-sm text-neutral-400">Total Credentials</div>
						</div>
					</div>
				</div>

				<div className="bg-white/5 border border-white/10 rounded-lg p-4">
					<div className="flex items-center gap-3">
						<Users className="w-8 h-8 text-green-400" />
						<div>
							<div className="text-2xl font-bold">{stats.totalIssuers}</div>
							<div className="text-sm text-neutral-400">Verified Issuers</div>
						</div>
					</div>
				</div>

				<div className="bg-white/5 border border-white/10 rounded-lg p-4">
					<div className="flex items-center gap-3">
						<TrendingUp className="w-8 h-8 text-polyPurple" />
						<div>
							<div className="text-2xl font-bold">{stats.credentialsThisMonth}</div>
							<div className="text-sm text-neutral-400">This Month</div>
						</div>
					</div>
				</div>

				<div className="bg-white/5 border border-white/10 rounded-lg p-4">
					<div className="flex items-center gap-3">
						<Calendar className="w-8 h-8 text-red-400" />
						<div>
							<div className="text-2xl font-bold">{stats.revokedCredentials}</div>
							<div className="text-sm text-neutral-400">Revoked</div>
						</div>
					</div>
				</div>
			</div>

			{/* Top Institutions */}
			<div className="bg-white/5 border border-white/10 rounded-lg p-6">
				<h3 className="text-lg font-semibold mb-4">Top Issuing Institutions</h3>
				<div className="space-y-3">
					{stats.topInstitutions.map((inst, index) => (
						<div key={inst.name} className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 rounded-full bg-polyPurple/20 flex items-center justify-center text-sm font-bold">
									{index + 1}
								</div>
								<span>{inst.name}</span>
							</div>
							<div className="text-neutral-400">{inst.count} credentials</div>
						</div>
					))}
				</div>
			</div>

			{/* Recent Activity */}
			<div className="bg-white/5 border border-white/10 rounded-lg p-6">
				<h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
				<div className="space-y-3">
					{stats.recentActivity.map((activity, index) => (
						<div key={index} className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0">
							<div className="flex items-center gap-3">
								<div className={`w-3 h-3 rounded-full ${
									activity.type === 'issued' ? 'bg-green-400' :
									activity.type === 'verified' ? 'bg-blue-400' : 'bg-red-400'
								}`} />
								<span className="capitalize">{activity.type}</span>
								{activity.institution && <span className="text-neutral-400">by {activity.institution}</span>}
							</div>
							<div className="text-right">
								<div className="font-semibold">{activity.count}</div>
								<div className="text-xs text-neutral-400">{activity.date}</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Polygon Network Stats */}
			<div className="bg-gradient-to-r from-polyPurple/10 to-fuchsia-500/10 border border-polyPurple/20 rounded-lg p-6">
				<h3 className="text-lg font-semibold mb-4">Polygon Network Benefits</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
					<div>
						<div className="font-semibold text-green-400">Low Gas Fees</div>
						<div className="text-neutral-300">~$0.001 per credential</div>
					</div>
					<div>
						<div className="font-semibold text-blue-400">Fast Transactions</div>
						<div className="text-neutral-300">~2 second confirmation</div>
					</div>
					<div>
						<div className="font-semibold text-polyPurple">Carbon Neutral</div>
						<div className="text-neutral-300">Eco-friendly blockchain</div>
					</div>
				</div>
			</div>
		</div>
	);
}