import { useEffect, useState } from "react";
import { useChainId, useSwitchChain } from "wagmi";

const AMOY_CHAIN_ID = 80002;

export default function NetworkGuard({ children }) {
	const chainId = useChainId();
	const { switchChainAsync } = useSwitchChain();
	const [error, setError] = useState("");
	const [autoTried, setAutoTried] = useState(false);

	async function addNetwork() {
		await window.ethereum.request({
			method: "wallet_addEthereumChain",
			params: [
				{
					chainId: "0x13882", // 80002
					chainName: "Polygon Amoy Testnet",
					nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
					rpcUrls: [import.meta.env.VITE_RPC_URL || "https://rpc-amoy.polygon.technology"],
					blockExplorerUrls: ["https://amoy.polygonscan.com"]
				}
			]
		});
	}

	async function tryFixNetwork() {
		try {
			setError("");
			// First try switching directly
			await switchChainAsync({ chainId: AMOY_CHAIN_ID });
		} catch (e1) {
			// If unknown chain (4902), add then switch
			if (e1?.code === 4902 || /Unrecognized chain/i.test(e1?.message || "")) {
				try {
					await addNetwork();
					await switchChainAsync({ chainId: AMOY_CHAIN_ID });
				} catch (e2) {
					setError(e2?.message || "Failed to add/switch network");
				}
			} else if (e1?.code === 4001) {
				setError("You rejected the request in your wallet. Please approve to continue.");
			} else {
				setError(e1?.message || "Failed to switch network");
			}
		}
	}

	useEffect(() => {
		// On first render, attempt auto-fix once if wallet present and not on desired chain
		if (!autoTried && typeof chainId === "number" && chainId !== 0 && chainId !== AMOY_CHAIN_ID && window.ethereum) {
			setAutoTried(true);
			tryFixNetwork();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chainId, autoTried]);

	const needsSwitch = typeof chainId === "number" && chainId !== 0 && chainId !== AMOY_CHAIN_ID;

	return (
		<div>
			{needsSwitch && (
				<div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 p-3 rounded mb-4 text-sm flex items-center justify-between gap-3">
					<div>You're connected to chain {chainId}. Switch to Polygon Amoy Testnet (80002).
						{error && <div className="text-red-400 text-xs mt-1">{error}</div>}
					</div>
					<div className="flex gap-2">
						<button className="px-3 py-1 rounded bg-polyPurple" onClick={tryFixNetwork}>Fix Network</button>
					</div>
				</div>
			)}
			{children}
		</div>
	);
}
