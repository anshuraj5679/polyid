import { useEffect, useState } from "react";
import axios from "axios";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../lib/contract.js";
import { explorerToken } from "../lib/explorer.js";
import CredentialModal from "../components/CredentialModal.jsx";

export default function MyCredentials() {
	const { address: connected } = useAccount();
	const [address, setAddress] = useState("");
	const [items, setItems] = useState([]);
	const [onchain, setOnchain] = useState(true);
	const [error, setError] = useState("");
	const [selectedTokenId, setSelectedTokenId] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [hasLoaded, setHasLoaded] = useState(false);
	const base = import.meta.env.VITE_API_BASE || "http://localhost:4001";

	const [searchType, setSearchType] = useState("student"); // "student" or "issuer"

	useEffect(() => {
		if (connected) setAddress(connected);
	}, [connected]);

	const { data: tokenIdsData, refetch: refetchIds, isFetching: fetchingIds } = useReadContract({
		address: CONTRACT_ADDRESS || undefined,
		abi: CONTRACT_ABI,
		functionName: "getCredentials",
		args: address ? [address] : undefined,
		enabled: Boolean(address && onchain && CONTRACT_ADDRESS && searchType === "student")
	});

	async function loadOffchain() {
		try {
			let data;
			if (searchType === "student") {
				const response = await axios.get(`${base}/api/verify/${address}`);
				data = response.data;
			} else {
				const response = await axios.get(`${base}/api/issuers/${address}/credentials`);
				data = response.data;
			}

			setItems(Array.isArray(data.credentials) ? data.credentials : []);
			setError("");
		} catch (e) {
			setError(e.response?.data?.error || e.message);
			setItems([]);
		}
	}

	useEffect(() => {
		(async () => {
			// Only load if user has explicitly clicked "Load" button
			if (!hasLoaded) {
				return;
			}

			// Don't auto-load if address is empty or just whitespace
			if (!address || !address.trim()) {
				setItems([]);
				setError("");
				return;
			}

			console.log("🔍 Loading credentials...");
			console.log("📋 Address:", address);
			console.log("🔍 Type:", searchType);
			console.log("⛓️ On-chain mode:", onchain);

			if (onchain && CONTRACT_ADDRESS && searchType === "student") {
				try {
					if (!tokenIdsData || tokenIdsData.length === 0) {
						console.log("⚠️ No tokens found on blockchain for this address");
						setItems([]);
						setError("");
						return;
					}

					const ids = (tokenIdsData || []).map((x) => x.toString());
					console.log("🎯 Processing token IDs:", ids);

					const results = [];
					for (const id of ids) {
						try {
							const { data } = await axios.get(`${base}/api/credential/${id}`);
							console.log(`✅ Token ${id} data:`, data);

							// Fetch and parse metadata
							let metadata = {};
							if (data.metadataUrl) {
								try {
									// Try to fetch metadata from IPFS or data URI
									if (data.metadataUrl.startsWith('data:')) {
										// Parse data URI
										const base64Data = data.metadataUrl.split(',')[1];
										const jsonString = atob(base64Data);
										metadata = JSON.parse(jsonString);
									} else {
										// Fetch from IPFS
										const metadataResponse = await fetch(data.metadataUrl);
										metadata = await metadataResponse.json();
									}
									console.log(`📄 Metadata for token ${id}:`, metadata);
								} catch (metadataError) {
									console.warn(`⚠️ Failed to parse metadata for token ${id}:`, metadataError.message);
								}
							}

							results.push({
								tokenId: id,
								metadataURI: data.metadataURI,
								metadataUrl: data.metadataUrl,
								revoked: data.revoked,
								// Add parsed metadata fields
								name: metadata.name || "Credential",
								studentName: metadata.studentName || metadata.recipient || "",
								description: metadata.description || "",
								issuedBy: metadata.issuedBy || "",
								dateIssued: metadata.dateIssued || "",
								recipient: metadata.recipient || "",
								file: metadata.file || metadata.image || ""
							});
						} catch (tokenError) {
							console.warn(`⚠️ Failed to load token ${id}:`, tokenError.message);
						}
					}
					setItems(results);
					setError("");
				} catch (e) {
					console.error("❌ On-chain loading error:", e);
					setError(e.response?.data?.error || e.message);
					setItems([]);
				}
			} else if (address.trim()) {
				console.log("📡 Loading from API...");
				await loadOffchain();
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasLoaded, address, onchain, tokenIdsData, searchType]);

	// State for selected credential details
	const [selectedCredential, setSelectedCredential] = useState(null);
	const [detailsModalOpen, setDetailsModalOpen] = useState(false);

	function openDetailsModal(credential) {
		setSelectedCredential(credential);
		setDetailsModalOpen(true);
	}

	function closeDetailsModal() {
		setSelectedCredential(null);
		setDetailsModalOpen(false);
	}

	return (
		<div className="space-y-4">
			<div className="space-y-3">
				{/* Search Type Toggle */}
				<div className="flex gap-4 border-b border-white/10 pb-2">
					<button
						className={`pb-2 text-sm font-medium transition-colors ${searchType === "student" ? "text-polyPurple border-b-2 border-polyPurple" : "text-neutral-400 hover:text-white"}`}
						onClick={() => { setSearchType("student"); setOnchain(true); setItems([]); setHasLoaded(false); }}
					>
						Student Wallet
					</button>
					<button
						className={`pb-2 text-sm font-medium transition-colors ${searchType === "issuer" ? "text-polyPurple border-b-2 border-polyPurple" : "text-neutral-400 hover:text-white"}`}
						onClick={() => { setSearchType("issuer"); setOnchain(false); setItems([]); setHasLoaded(false); }}
					>
						University Wallet
					</button>
				</div>

				<div className="flex gap-2 items-center">
					<input
						className="flex-1 px-3 py-2 rounded bg-neutral-900 border border-white/10"
						placeholder={searchType === "student" ? "Student Wallet Address" : "University / Issuer Wallet Address"}
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<label className={`flex items-center gap-2 text-sm ${searchType === "issuer" ? "opacity-50 cursor-not-allowed" : ""}`}>
						<input
							type="checkbox"
							checked={onchain}
							onChange={(e) => setOnchain(e.target.checked)}
							disabled={searchType === "issuer"}
						/>
						On-chain mode
					</label>
					<button
						className="px-4 py-2 rounded bg-polyPurple"
						onClick={() => {
							setHasLoaded(true);
							if (onchain && searchType === "student") {
								refetchIds();
							} else {
								loadOffchain();
							}
						}}
					>
						{fetchingIds ? "Loading..." : "Load"}
					</button>
				</div>

				{/* Status Information */}
				<div className="text-xs text-neutral-400 space-y-1">
					<div>Contract: {CONTRACT_ADDRESS || "Not configured"}</div>
					<div>Mode: {onchain ? "On-chain (Blockchain)" : "Off-chain (API)"}</div>
					{onchain && tokenIdsData && <div>Blockchain tokens found: {tokenIdsData.length}</div>}
				</div>
			</div>
			{error && <div className="text-red-400 text-sm">{error}</div>}

			{/* Compact Credential List */}
			<div className="space-y-3">
				{items.map((c, index) => (
					<div key={c.tokenId} className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="text-xl font-bold text-polyPurple">
									#{index + 1}
								</div>
								<div>
									<div className="font-semibold text-white">
										{c.name || "Credential"}
									</div>
									<div className="text-xs text-neutral-400 font-mono">
										Token ID: {c.tokenId}
									</div>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className={`px-3 py-1 rounded-full text-xs font-semibold ${c.revoked
									? "bg-red-500/20 text-red-300"
									: "bg-green-500/20 text-green-300"
									}`}>
									{c.revoked ? "❌ Revoked" : "✅ Active"}
								</div>
								<button
									onClick={() => openDetailsModal(c)}
									className="px-4 py-2 rounded bg-polyPurple hover:bg-polyPurple/80 text-white text-sm font-medium transition-colors"
								>
									View Details
								</button>
								{CONTRACT_ADDRESS && (
									<a
										className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 text-white text-sm"
										href={explorerToken(CONTRACT_ADDRESS, c.tokenId)}
										target="_blank"
										rel="noreferrer"
									>
										Explorer →
									</a>
								)}
							</div>
						</div>
					</div>
				))}
				{items.length === 0 && !error && hasLoaded && <div className="text-neutral-400 text-sm p-4 text-center">No credentials found for this wallet address.</div>}
				{items.length === 0 && !hasLoaded && <div className="text-neutral-400 text-sm p-4 text-center">Enter a student wallet address and click "Load" to view credentials.</div>}
			</div>

			{/* Details Modal */}
			{detailsModalOpen && selectedCredential && (
				<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closeDetailsModal}>
					<div className="bg-neutral-900 rounded-xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
						{/* Modal Header */}
						<div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-neutral-900 z-10">
							<h2 className="text-2xl font-bold text-white">Credential Details</h2>
							<button
								onClick={closeDetailsModal}
								className="text-neutral-400 hover:text-white text-2xl font-bold"
							>
								×
							</button>
						</div>

						{/* Modal Content */}
						<div className="p-6 space-y-6">
							{/* Token ID and Status */}
							<div className="flex items-center justify-between pb-4 border-b border-white/10">
								<div>
									<div className="text-sm text-neutral-400">Token ID</div>
									<div className="text-xl font-mono font-bold text-polyPurple">{selectedCredential.tokenId}</div>
								</div>
								<div className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedCredential.revoked
									? "bg-red-500/20 text-red-300"
									: "bg-green-500/20 text-green-300"
									}`}>
									{selectedCredential.revoked ? "❌ Revoked" : "✅ Active"}
								</div>
							</div>

							{/* Student Name */}
							{selectedCredential.studentName && (
								<div className="space-y-2">
									<div className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
										Student Name
									</div>
									<div className="text-2xl font-bold text-white bg-black/40 p-4 rounded-lg border border-white/5">
										👤 {selectedCredential.studentName}
									</div>
								</div>
							)}

							{/* Course Name */}
							<div className="space-y-2">
								<div className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
									Course / Credential Name
								</div>
								<div className="text-lg font-semibold text-white bg-black/40 p-4 rounded-lg border border-white/5">
									🎓 {selectedCredential.name || "N/A"}
								</div>
							</div>

							{/* Issued By */}
							<div className="space-y-2">
								<div className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
									Issued By Institution
								</div>
								<div className="text-lg text-white bg-black/40 p-4 rounded-lg border border-white/5">
									🏛️ {selectedCredential.issuedBy || "N/A"}
								</div>
							</div>

							{/* Date Issued */}
							<div className="space-y-2">
								<div className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
									Date Issued
								</div>
								<div className="text-lg text-white bg-black/40 p-4 rounded-lg border border-white/5">
									📅 {selectedCredential.dateIssued ? new Date(selectedCredential.dateIssued).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									}) : 'N/A'}
								</div>
							</div>

							{/* Uploaded File/Image */}
							{(selectedCredential.file || selectedCredential.image) && (
								<div className="space-y-2">
									<div className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
										Credential Attachment
									</div>
									<div className="bg-black/40 p-4 rounded-lg border border-white/5 flex justify-center">
										<img
											src={selectedCredential.file || selectedCredential.image}
											alt="Credential Attachment"
											className="max-h-64 rounded object-contain"
											onError={(e) => {
												e.target.style.display = 'none';
												e.target.parentNode.innerHTML = `<div class="text-neutral-400 text-sm">Attachment available but cannot be displayed directly. <a href="${selectedCredential.file || selectedCredential.image}" target="_blank" class="text-blue-400 underline">Download/View</a></div>`;
											}}
										/>
									</div>
								</div>
							)}

							{/* Description */}
							{selectedCredential.description && (
								<div className="space-y-2">
									<div className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
										Credential Description
									</div>
									<div className="text-base text-neutral-300 bg-black/40 p-4 rounded-lg border border-white/5 leading-relaxed">
										{selectedCredential.description}
									</div>
								</div>
							)}

							{/* Metadata Link */}
							{selectedCredential.metadataUrl && (
								<div className="pt-4 border-t border-white/10">
									<a
										href={selectedCredential.metadataUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 underline"
									>
										<span>🔗 View Metadata on IPFS</span>
										<span>→</span>
									</a>
								</div>
							)}
						</div>

						{/* Modal Footer */}
						<div className="p-6 border-t border-white/10 flex justify-end gap-3 sticky bottom-0 bg-neutral-900">
							{CONTRACT_ADDRESS && (
								<a
									className="px-6 py-2 rounded bg-neutral-700 hover:bg-neutral-600 text-white font-medium"
									href={explorerToken(CONTRACT_ADDRESS, selectedCredential.tokenId)}
									target="_blank"
									rel="noreferrer"
								>
									View on Explorer →
								</a>
							)}
							<button
								onClick={closeDetailsModal}
								className="px-6 py-2 rounded bg-polyPurple hover:bg-polyPurple/80 text-white font-medium"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
