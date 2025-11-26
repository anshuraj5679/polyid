import { useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";

export default function IssuedCredentials() {
	const { address: connectedWallet } = useAccount();
	const [issuerWallet, setIssuerWallet] = useState("");
	const [credentials, setCredentials] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const base = import.meta.env.VITE_API_BASE || "http://localhost:4001";

	async function loadIssuedCredentials() {
		if (!issuerWallet || !issuerWallet.trim()) {
			setError("Please enter a wallet address");
			return;
		}

		try {
			setLoading(true);
			setError("");
			setCredentials([]);

			const { data } = await axios.get(`${base}/api/issuer/${issuerWallet}/credentials`);
			
			if (data.credentials && data.credentials.length > 0) {
				setCredentials(data.credentials);
			} else {
				setError("No credentials issued by this university yet");
			}
		} catch (err) {
			console.error("Error loading issued credentials:", err);
			setError(err.response?.data?.error || "Failed to load credentials");
			setCredentials([]);
		} finally {
			setLoading(false);
		}
	}

	function useMyWallet() {
		if (connectedWallet) {
			setIssuerWallet(connectedWallet);
		}
	}

	return (
		<div className="space-y-6">
			<div className="p-6 rounded-xl border border-white/10 bg-white/5">
				<h2 className="text-2xl font-semibold mb-2">Issued Credentials</h2>
				<p className="text-neutral-300 mb-4">
					View all credentials issued by a university. Enter the university's wallet address to see all students they've issued credentials to.
				</p>

				<div className="flex gap-2 items-center">
					<input
						className="flex-1 px-3 py-2 rounded bg-neutral-900 border border-white/10 focus:border-polyPurple focus:outline-none font-mono text-sm"
						placeholder="University Wallet Address (0x...)"
						value={issuerWallet}
						onChange={(e) => setIssuerWallet(e.target.value)}
					/>
					{connectedWallet && (
						<button
							onClick={useMyWallet}
							className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-sm whitespace-nowrap"
						>
							Use My Wallet
						</button>
					)}
					<button
						onClick={loadIssuedCredentials}
						disabled={loading}
						className="px-6 py-2 rounded bg-polyPurple hover:opacity-90 disabled:opacity-50 font-medium"
					>
						{loading ? "Loading..." : "Load"}
					</button>
				</div>

				{error && (
					<div className="mt-4 p-3 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm">
						{error}
					</div>
				)}
			</div>

			{credentials.length > 0 && (
				<div className="p-6 rounded-xl border border-white/10 bg-white/5">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-xl font-semibold">
							Credentials Issued by University
						</h3>
						<div className="px-4 py-2 rounded-lg bg-polyPurple/20 text-polyPurple font-semibold">
							Total: {credentials.length} {credentials.length === 1 ? 'Credential' : 'Credentials'}
						</div>
					</div>

					<div className="space-y-4">
						{credentials.map((cred, index) => (
							<div
								key={cred.tokenId || index}
								className="p-5 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 via-white/3 to-transparent hover:from-white/10 hover:border-polyPurple/30 transition-all"
							>
								{/* Header Section */}
								<div className="flex items-start justify-between mb-4 pb-3 border-b border-white/10">
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<div className="text-2xl font-bold text-polyPurple">
												#{index + 1}
											</div>
											<div className="flex-1">
												<div className="text-lg font-semibold text-white">
													{cred.name || cred.courseName || "Credential"}
												</div>
												<div className="text-xs text-neutral-400 font-mono">
													Token ID: {cred.tokenId}
												</div>
											</div>
										</div>
									</div>
									<div className={`px-3 py-1 rounded-full text-xs font-semibold ${
										cred.revoked 
											? "bg-red-500/20 text-red-300" 
											: "bg-green-500/20 text-green-300"
									}`}>
										{cred.revoked ? "❌ Revoked" : "✅ Active"}
									</div>
								</div>

								{/* Student Details Section */}
								<div className="space-y-3">
									{cred.studentName && (
										<div className="space-y-1">
											<div className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">
												Student Name
											</div>
											<div className="text-lg font-semibold bg-black/40 p-2 rounded border border-white/5">
												👤 {cred.studentName}
											</div>
										</div>
									)}
									
									<div className="grid md:grid-cols-2 gap-4">
										<div className="space-y-1">
											<div className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">
												Student Wallet Address
											</div>
											<div className="font-mono text-sm bg-black/40 p-2 rounded border border-white/5 break-all">
												{cred.studentAddress || cred.student || cred.recipient || "N/A"}
											</div>
										</div>
										
										<div className="space-y-1">
											<div className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">
												Issued By Institution
											</div>
											<div className="text-sm bg-black/40 p-2 rounded border border-white/5">
												{cred.issuedBy || "N/A"}
											</div>
										</div>
									</div>

									<div className="space-y-1">
										<div className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">
											Credential Description
										</div>
										<div className="text-sm text-neutral-300 bg-black/40 p-2 rounded border border-white/5">
											{cred.description || "No description provided"}
										</div>
									</div>

									<div className="grid md:grid-cols-2 gap-4">
										<div className="space-y-1">
											<div className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">
												Date Issued
											</div>
											<div className="text-sm bg-black/40 p-2 rounded border border-white/5">
												📅 {new Date(cred.dateIssued || cred.createdAt).toLocaleDateString('en-US', {
													year: 'numeric',
													month: 'long',
													day: 'numeric'
												})}
											</div>
										</div>

										<div className="space-y-1">
											<div className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">
												Time Issued
											</div>
											<div className="text-sm bg-black/40 p-2 rounded border border-white/5">
												🕐 {new Date(cred.createdAt).toLocaleTimeString('en-US', {
													hour: '2-digit',
													minute: '2-digit',
													second: '2-digit'
												})}
											</div>
										</div>
									</div>
								</div>

								{/* Footer Section */}
								{cred.metadataUrl && (
									<div className="mt-4 pt-3 border-t border-white/10">
										<a
											href={cred.metadataUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 underline"
										>
											<span>🔗 View Metadata on IPFS</span>
											<span>→</span>
										</a>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			)}

			{loading && (
				<div className="p-6 rounded-xl border border-white/10 bg-white/5">
					<div className="animate-pulse space-y-4">
						<div className="h-20 bg-white/5 rounded"></div>
						<div className="h-20 bg-white/5 rounded"></div>
						<div className="h-20 bg-white/5 rounded"></div>
					</div>
				</div>
			)}
		</div>
	);
}
