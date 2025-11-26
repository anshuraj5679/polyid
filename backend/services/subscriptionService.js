import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// File persistence setup
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUBSCRIPTIONS_FILE = path.join(__dirname, "../subscriptions.json");

// In-memory cache
const subscriptions = new Map();

// Load subscriptions on startup
try {
	if (fs.existsSync(SUBSCRIPTIONS_FILE)) {
		const data = fs.readFileSync(SUBSCRIPTIONS_FILE, "utf8");
		const loaded = JSON.parse(data);
		loaded.forEach(sub => subscriptions.set(sub.issuer_id, sub));
		console.log(`[subscription] Loaded ${loaded.length} subscriptions from disk`);
	}
} catch (err) {
	console.error("[subscription] Failed to load subscriptions:", err.message);
}

function saveSubscriptions() {
	try {
		const data = JSON.stringify(Array.from(subscriptions.values()), null, 2);
		fs.writeFileSync(SUBSCRIPTIONS_FILE, data);
	} catch (err) {
		console.error("[subscription] Failed to save subscriptions:", err.message);
	}
}

function nowISO() {
	return new Date().toISOString();
}

export function isSubscriptionActive(record) {
	if (!record) return false;
	if (record.status !== "active") return false;
	if (!record.current_period_end) return true;
	return new Date(record.current_period_end).getTime() > Date.now();
}

export async function getSubscriptionByIssuer(issuerId) {
	return subscriptions.get(issuerId) || null;
}

export async function upsertSubscription(issuerId, patch) {
	const existing = subscriptions.get(issuerId) || {};

	const updated = {
		...existing,
		issuer_id: issuerId,
		updated_at: nowISO(),
		...patch
	};

	subscriptions.set(issuerId, updated);
	saveSubscriptions();

	return updated;
}




