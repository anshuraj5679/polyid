import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Issuer } from "../models/Issuer.js";

import fs from "fs";
import path from "path";

// In-memory storage for when MongoDB is not available
const inMemoryUsers = new Map();
const USERS_FILE = "users.json";

// Load users from file on startup
function loadUsers() {
	try {
		if (fs.existsSync(USERS_FILE)) {
			const data = fs.readFileSync(USERS_FILE, "utf8");
			const users = JSON.parse(data);
			users.forEach(u => inMemoryUsers.set(u.email, u));
			console.log(`[auth] Loaded ${users.length} users from ${USERS_FILE}`);
		}
	} catch (e) {
		console.error("[auth] Failed to load users:", e.message);
	}
}

// Save users to file
function saveUsers() {
	try {
		const users = Array.from(inMemoryUsers.values());
		fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
		console.log(`[auth] Saved ${users.length} users to ${USERS_FILE}`);
	} catch (e) {
		console.error("[auth] Failed to save users:", e.message);
	}
}

// Export function to get in-memory users
export function getInMemoryUsers() {
	return inMemoryUsers;
}

// Initialize default test user with proper password hash
async function initializeDefaultUser() {
	loadUsers(); // Load existing users first

	// Only add default admin if not exists
	if (!inMemoryUsers.has("admin@test.edu")) {
		const passwordHash = await bcrypt.hash("password123", 10);
		const admin = {
			email: "admin@test.edu",
			passwordHash: passwordHash,
			_id: "mock-admin-id",
			name: "Test University",
			walletAddress: "0x8aDEc9885b3A4E5824f329fCCC3026BaFdce6B8F",
			verified: true,
			createdAt: new Date()
		};
		inMemoryUsers.set("admin@test.edu", admin);
		saveUsers(); // Save default user
	}
}

// Initialize on module load
initializeDefaultUser();

export async function login(req, res) {
	try {
		const { email, password } = req.body;

		let issuer = null;
		let usingInMemory = false;

		// Try MongoDB first
		try {
			issuer = await Issuer.findOne({ email, verified: true });
		} catch (dbError) {
			console.warn("MongoDB not available, using in-memory storage:", dbError.message);
			usingInMemory = true;
		}

		// If MongoDB failed or no user found, check in-memory storage
		if (!issuer && usingInMemory) {
			const inMemoryUser = inMemoryUsers.get(email);
			if (inMemoryUser) {
				issuer = inMemoryUser;
			}
		}

		// If still no user found, return error
		if (!issuer) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		// Verify password
		const ok = await bcrypt.compare(password, issuer.passwordHash);
		if (!ok) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		// Generate token
		const token = jwt.sign(
			{ issuerId: issuer._id, email: issuer.email, walletAddress: issuer.walletAddress },
			process.env.JWT_SECRET || "secret",
			{ expiresIn: "12h" }
		);

		console.log(`[auth] Login successful for: ${email} (${usingInMemory ? 'in-memory' : 'MongoDB'})`);
		return res.json({ token });

	} catch (e) {
		console.error("[auth] Login error:", e.message);
		return res.status(500).json({ error: e.message });
	}
}

export async function seedIssuer(req, res) {
	try {
		const { name, email, password, walletAddress } = req.body;
		let usingInMemory = false;

		// Try MongoDB first
		try {
			const exists = await Issuer.findOne({ email });
			if (exists) return res.status(400).json({ error: "Issuer exists" });

			const passwordHash = await bcrypt.hash(password, 10);
			const issuer = await Issuer.create({ name, email, passwordHash, walletAddress, verified: true });
			console.log(`[auth] Created issuer in MongoDB: ${email}`);
			return res.json({ issuer });
		} catch (dbError) {
			console.warn("MongoDB not available, using in-memory storage:", dbError.message);
			usingInMemory = true;
		}

		// Use in-memory storage when MongoDB not available
		if (usingInMemory) {
			// Check if user already exists in memory
			if (inMemoryUsers.has(email)) {
				return res.status(400).json({ error: "Issuer exists" });
			}

			// Hash password and store in memory
			const passwordHash = await bcrypt.hash(password, 10);
			const issuer = {
				_id: `in-memory-${Date.now()}`,
				name,
				email,
				passwordHash,
				walletAddress,
				verified: true,
				createdAt: new Date()
			};

			inMemoryUsers.set(email, issuer);
			saveUsers(); // Persist to file
			console.log(`[auth] Created issuer in-memory: ${email}`);
			console.log(`[auth] Total in-memory users: ${inMemoryUsers.size}`);

			// Return issuer without passwordHash
			const { passwordHash: _, ...issuerResponse } = issuer;
			return res.json({ issuer: issuerResponse });
		}
	} catch (e) {
		console.error("[auth] Seed error:", e.message);
		return res.status(500).json({ error: e.message });
	}
}



