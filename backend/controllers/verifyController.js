import { getContract } from "../config/ethers.js";
import { pinataGateway } from "../config/pinata.js";

// Import function to get credentials by student address
import { getCredentialsByStudent } from "../routes/temp-issue.js";

export async function listByAddress(req, res) {
	try {
		const { address } = req.params;
		const contract = getContract();

		// Always fetch from in-memory storage first
		const memoryCredentials = getCredentialsByStudent(address);
		let items = [...memoryCredentials];

		if (contract) {
			try {
				const tokenIds = await contract.getCredentials(address);
				const blockchainItems = [];

				for (const id of tokenIds) {
					const tokenId = id.toString();
					// Check if we already have this token from memory to avoid duplicates
					// (Optional: could prefer blockchain version if we want to verify revocation status live)
					const existingIndex = items.findIndex(i => i.tokenId === tokenId);

					if (existingIndex >= 0) {
						// We have it in memory, but let's update revocation status from chain if possible
						try {
							const isRevoked = await contract.revoked(tokenId);
							items[existingIndex].revoked = isRevoked;
						} catch (e) {
							// Ignore error checking revocation
						}
						continue;
					}

					const uri = await contract.tokenURI(tokenId);
					const isRevoked = await contract.revoked(tokenId);
					const ipfsHash = uri.replace("ipfs://", "");
					const metadataUrl = uri.startsWith("ipfs://") ? `${pinataGateway}${ipfsHash}` : uri;

					blockchainItems.push({ tokenId, metadataURI: uri, metadataUrl, revoked: isRevoked });
				}

				items = [...items, ...blockchainItems];
			} catch (err) {
				console.warn("Failed to fetch from blockchain:", err.message);
				// Continue with just memory items
			}
		}

		return res.json({ address, credentials: items });
	} catch (e) {
		console.warn("Error in verify controller:", e.message);
		return res.status(500).json({ error: e.message });
	}
}

