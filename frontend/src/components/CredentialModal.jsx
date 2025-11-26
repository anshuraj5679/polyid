import { useState, useEffect } from "react";
import { X, ExternalLink, User, Calendar, Award, FileText, Shield } from "lucide-react";

export default function CredentialModal({ tokenId, isOpen, onClose }) {
	const [credential, setCredential] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (isOpen && tokenId) {
			loadCredentialDetails();
		}
	}, [isOpen, tokenId]);

	async function loadCredentialDetails() {
		setLoading(true);
		setError("");
		try {
			const base = import.meta.env.VITE_API_BASE || "http://localhost:4001";
			const response = await fetch(`${base}/api/credential/${tokenId}`);
			const data = await response.json();
			
			if (!response.ok) {
				throw new Error(data.error || "Failed to load credential");
			}

			// Decode metadata if it's base64
			let metadata = {};
			if (data.metadataURI) {
				if (data.metadataURI.startsWith("data:application/json;base64,")) {
					const base64Data = data.metadataURI.split(",")[1];
					metadata = JSON.parse(atob(base64Data));
				} else if (data.metadataURI.startsWith("ipfs://")) {
					// For IPFS, we'd fetch from gateway
					const ipfsHash = data.metadataURI.replace("ipfs://", "");
					const ipfsResponse = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
					metadata = await ipfsResponse.json();
				}
			}

			setCredential({
				...data,
				metadata
			});
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<div className="bg-neutral-900 rounded-xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-white/10">
					<h2 className="text-xl font-semibold flex items-center gap-2">
						<Award className="w-5 h-5 text-polyPurple" />
						Credential Details
					</h2>
					<button onClick={onClose} className="p-2 hover:bg-white/5 rounded">
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					{loading && (
						<div className="text-center py-8">
							<div className="animate-spin w-8 h-8 border-2 border-polyPurple border-t-transparent rounded-full mx-auto mb-4"></div>
							<p className="text-neutral-400">Loading credential details...</p>
						</div>
					)}

					{error && (
						<div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded">
							<strong>Error:</strong> {error}
						</div>
					)}

					{credential && (
						<div className="space-y-6">
							{/* Basic Info */}
							<div className="bg-white/5 rounded-lg p-4">
								<h3 className="font-semibold mb-3 flex items-center gap-2">
									<Shield className="w-4 h-4 text-green-400" />
									Blockchain Information
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
									<div>
										<span className="text-neutral-400">Token ID:</span>
										<div className="font-mono">#{credential.tokenId}</div>
									</div>
									<div>
										<span className="text-neutral-400">Status:</span>
										<div className={credential.revoked ? "text-red-400" : "text-green-400"}>
											{credential.revoked ? "Revoked" : "Valid"}
										</div>
									</div>
									<div className="md:col-span-2">
										<span className="text-neutral-400">Contract:</span>
										<div className="font-mono text-xs break-all">
											{import.meta.env.VITE_CONTRACT_ADDRESS}
										</div>
									</div>
								</div>
							</div>

							{/* Credential Details */}
							{credential.metadata && (
								<div className="bg-white/5 rounded-lg p-4">
									<h3 className="font-semibold mb-3 flex items-center gap-2">
										<FileText className="w-4 h-4 text-blue-400" />
										Credential Information
									</h3>
									<div className="space-y-4">
										{credential.metadata.name && (
											<div>
												<span className="text-neutral-400 text-sm">Credential Name:</span>
												<div className="text-lg font-semibold text-white">{credential.metadata.name}</div>
											</div>
										)}
										
										{credential.metadata.description && (
											<div>
												<span className="text-neutral-400 text-sm">Description:</span>
												<div className="text-neutral-200">{credential.metadata.description}</div>
											</div>
										)}

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{credential.metadata.issuedBy && (
												<div>
													<span className="text-neutral-400 text-sm flex items-center gap-1">
														<Award className="w-3 h-3" />
														Issued By:
													</span>
													<div className="font-semibold text-polyPurple">{credential.metadata.issuedBy}</div>
												</div>
											)}

											{credential.metadata.dateIssued && (
												<div>
													<span className="text-neutral-400 text-sm flex items-center gap-1">
														<Calendar className="w-3 h-3" />
														Date Issued:
													</span>
													<div>{credential.metadata.dateIssued}</div>
												</div>
											)}

											{credential.metadata.recipient && (
												<div className="md:col-span-2">
													<span className="text-neutral-400 text-sm flex items-center gap-1">
														<User className="w-3 h-3" />
														Recipient:
													</span>
													<div className="font-mono text-xs break-all">{credential.metadata.recipient}</div>
												</div>
											)}
										</div>

										{credential.metadata.file && credential.metadata.file !== "" && (
											<div>
												<span className="text-neutral-400 text-sm">Attached File:</span>
												<div>
													<a 
														href={credential.metadata.file} 
														target="_blank" 
														rel="noopener noreferrer"
														className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
													>
														View Attachment <ExternalLink className="w-3 h-3" />
													</a>
												</div>
											</div>
										)}
									</div>
								</div>
							)}

							{/* Technical Details */}
							<div className="bg-white/5 rounded-lg p-4">
								<h3 className="font-semibold mb-3 text-sm text-neutral-400">Technical Details</h3>
								<div className="space-y-2 text-xs">
									<div>
										<span className="text-neutral-500">Metadata URI:</span>
										<div className="font-mono text-neutral-300 break-all bg-black/20 p-2 rounded mt-1">
											{credential.metadataURI?.substring(0, 100)}...
										</div>
									</div>
									{credential.metadataUrl && (
										<div>
											<span className="text-neutral-500">IPFS Gateway:</span>
											<div className="font-mono text-neutral-300 break-all">
												<a href={credential.metadataUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
													{credential.metadataUrl}
												</a>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Explorer Links */}
							<div className="flex gap-3">
								<a
									href={`https://amoy.polygonscan.com/token/${import.meta.env.VITE_CONTRACT_ADDRESS}?a=${credential.tokenId}`}
									target="_blank"
									rel="noopener noreferrer"
									className="flex-1 bg-polyPurple hover:bg-polyPurple/80 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
								>
									<ExternalLink className="w-4 h-4" />
									View on Polygon Explorer
								</a>
								<a
									href={`https://amoy.polygonscan.com/address/${import.meta.env.VITE_CONTRACT_ADDRESS}`}
									target="_blank"
									rel="noopener noreferrer"
									className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded flex items-center gap-2"
								>
									Contract
								</a>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}