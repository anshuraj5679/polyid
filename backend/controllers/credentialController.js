import { getContract } from "../config/ethers.js";
import { pinataGateway } from "../config/pinata.js";

export async function getByToken(req, res) {
	try {
		const { tokenId } = req.params;
		const contract = getContract();
		if (!contract) return res.status(500).json({ error: "Contract address not configured" });
		const uri = await contract.tokenURI(tokenId);
		const isRevoked = await contract.revoked(tokenId);
		const ipfsHash = uri.replace("ipfs://", "");
		const metadataUrl = uri.startsWith("ipfs://") ? `${pinataGateway}${ipfsHash}` : uri;
		return res.json({ tokenId, metadataURI: uri, metadataUrl, revoked: isRevoked });
	} catch (e) {
		return res.status(500).json({ error: e.message });
	}
}

export async function revoke(req, res) {
	try {
		const { tokenId } = req.params;
		const contract = getContract();
		if (!contract) return res.status(500).json({ error: "Contract address not configured" });
		const tx = await contract.revokeCredential(tokenId);
		const receipt = await tx.wait();
		return res.json({ tokenId, transactionHash: receipt.hash });
	} catch (e) {
		return res.status(500).json({ error: e.message });
	}
}

