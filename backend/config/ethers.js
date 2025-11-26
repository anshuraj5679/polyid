import { ethers } from "ethers";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const abi = JSON.parse(readFileSync(join(__dirname, "../abi/PolyIDSBT.json"), "utf8"));

const rpcUrl = process.env.POLYGON_AMOY_RPC || "https://rpc-amoy.polygon.technology";
const provider = new ethers.JsonRpcProvider(rpcUrl);

const privateKey = process.env.ISSUER_WALLET_PRIVATE_KEY || process.env.PRIVATE_KEY;
if (!privateKey) {
	console.warn("[ethers] No private key found in env; write ops will fail.");
}

const wallet = privateKey ? new ethers.Wallet(privateKey, provider) : null;

export function getContract() {
	const address = process.env.CONTRACT_ADDRESS;
	if (!address) {
		console.warn("[ethers] CONTRACT_ADDRESS not set; contract calls will fail.");
		return null;
	}
	if (wallet) return new ethers.Contract(address, abi, wallet);
	return new ethers.Contract(address, abi, provider);
}

export { provider, wallet };

