import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";

const RPC_URL = import.meta.env.VITE_RPC_URL || "https://rpc-amoy.polygon.technology";

export const polygonAmoyTestnet = {
	id: 80002,
	name: "Polygon Amoy Testnet",
	nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
	rpcUrls: {
		default: { http: [RPC_URL] }
	},
	blockExplorers: {
		default: { name: "Polygonscan", url: "https://amoy.polygonscan.com" }
	},
	testnet: true
};

export const wagmiConfig = getDefaultConfig({
	appName: "PolyID",
	projectId: "polyid-temp-project",
	chains: [polygonAmoyTestnet],
	ssr: false,
	transports: {
		[polygonAmoyTestnet.id]: http(RPC_URL)
	}
});
