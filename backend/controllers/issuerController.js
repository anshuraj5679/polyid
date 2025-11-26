import { Issuer } from "../models/Issuer.js";

// Import in-memory users from auth controller
import { getInMemoryUsers } from "./authController.js";

// Import credentials getter from temp-issue route
import { getCredentialsByIssuer } from "../routes/temp-issue.js";

export async function listVerified(req, res) {
	try {
		const issuers = await Issuer.find({ verified: true }).select("name email walletAddress verified createdAt");
		return res.json({ issuers });
	} catch (e) {
		console.warn("MongoDB not available, returning in-memory issuers:", e.message);
		
		// Get all users from in-memory storage
		const inMemoryUsers = getInMemoryUsers();
		const mockIssuers = Array.from(inMemoryUsers.values()).map(user => ({
			_id: user._id,
			name: user.name,
			email: user.email,
			walletAddress: user.walletAddress,
			verified: user.verified,
			createdAt: user.createdAt || new Date()
		}));
		
		return res.json({ issuers: mockIssuers });
	}
}

export async function getIssuerCredentials(req, res) {
	try {
		const { walletAddress } = req.params;
		
		if (!walletAddress) {
			return res.status(400).json({ error: "Wallet address is required" });
		}
		
		// For now, use in-memory credentials (when contract is deployed, query blockchain)
		const credentials = getCredentialsByIssuer(walletAddress);
		
		return res.json({ 
			issuerWallet: walletAddress,
			count: credentials.length,
			credentials 
		});
		
	} catch (error) {
		console.error("Error fetching issuer credentials:", error);
		return res.status(500).json({ error: "Failed to fetch credentials" });
	}
}












