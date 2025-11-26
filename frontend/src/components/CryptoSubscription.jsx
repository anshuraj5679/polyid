import { useState } from "react";
import { useAccount, useBalance, useContractWrite, useWaitForTransaction } from "wagmi";
import { parseEther, formatEther } from "viem";

// Subscription contract address (you'll need to deploy this)
const SUBSCRIPTION_CONTRACT = process.env.VITE_SUBSCRIPTION_CONTRACT || "0x0000000000000000000000000000000000000000";

// Simple subscription contract ABI
const SUBSCRIPTION_ABI = [
	{
		inputs: [],
		name: "subscribe",
		outputs: [],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [],
		name: "monthlyPrice",
		outputs: [{ type: "uint256" }],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [{ name: "university", type: "address" }],
		name: "isSubscriptionActive",
		outputs: [{ type: "bool" }],
		stateMutability: "view",
		type: "function"
	}
];

export default function CryptoSubscription() {
	const { address, isConnected } = useAccount();
	const [isProcessing, setIsProcessing] = useState(false);
	const [txHash, setTxHash] = useState("");

	// Get wallet balance
	const { data: balance } = useBalance({
		address: address,
	});

	// Monthly price in MATIC (10 MATIC = ~$10 USD)
	const monthlyPriceInMatic = "10";

	// Subscribe function
	const { write: subscribe, data: txData } = useContractWrite({
		address: SUBSCRIPTION_CONTRACT,
		abi: SUBSCRIPTION_ABI,
		functionName: "subscribe",
		value: parseEther(monthlyPriceInMatic),
	});

	// Wait for transaction
	const { isLoading: isConfirming, isSuccess } = useWaitForTransaction({
		hash: txData?.hash,
	});

	async function handleSubscribe() {
		if (!isConnected) {
			alert("Please connect your wallet first");
			return;
		}

		if (!balance || parseFloat(formatEther(balance.value)) < parseFloat(monthlyPriceInMatic)) {
			alert(`Insufficient balance. You need at least ${monthlyPriceInMatic} MATIC`);
			return;
		}

		try {
			setIsProcessing(true);
			subscribe?.();
		} catch (error) {
			console.error("Subscription error:", error);
			alert("Transaction failed. Please try again.");
		} finally {
			setIsProcessing(false);
		}
	}

	return (
		<div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-purple-500/10 to-transparent">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-xl font-semibold">Pay with Crypto</h3>
				<div className="px-3 py-1 rounded bg-purple-500/20 text-purple-300 text-xs">
					Recommended
				</div>
			</div>

			<div className="mb-4">
				<div className="text-sm text-neutral-400">Monthly Price</div>
				<div className="text-3xl font-bold text-purple-300">
					{monthlyPriceInMatic} MATIC
				</div>
				<div className="text-sm text-neutral-400">≈ $10 USD</div>
			</div>

			<div className="space-y-2 text-sm text-neutral-300 mb-4">
				<div className="flex items-center gap-2">
					<span className="w-1.5 h-1.5 rounded-full bg-green-400" />
					Instant activation
				</div>
				<div className="flex items-center gap-2">
					<span className="w-1.5 h-1.5 rounded-full bg-green-400" />
					Low gas fees (~$0.01)
				</div>
				<div className="flex items-center gap-2">
					<span className="w-1.5 h-1.5 rounded-full bg-green-400" />
					No credit card needed
				</div>
				<div className="flex items-center gap-2">
					<span className="w-1.5 h-1.5 rounded-full bg-green-400" />
					Decentralized payment
				</div>
			</div>

			{isConnected ? (
				<div className="space-y-3">
					<div className="p-3 rounded bg-black/30 text-sm">
						<div className="text-neutral-400">Your Balance</div>
						<div className="text-lg font-semibold">
							{balance ? `${parseFloat(formatEther(balance.value)).toFixed(4)} MATIC` : "Loading..."}
						</div>
					</div>

					<button
						onClick={handleSubscribe}
						disabled={isProcessing || isConfirming || !subscribe}
						className="w-full py-3 rounded bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
					>
						{isConfirming ? "Confirming..." : isProcessing ? "Processing..." : "Subscribe with MATIC"}
					</button>

					{isSuccess && (
						<div className="p-3 rounded bg-green-500/10 border border-green-500/30 text-green-300 text-sm">
							✅ Subscription successful! You can now issue credentials.
						</div>
					)}
				</div>
			) : (
				<div className="p-3 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm">
					⚠️ Connect your wallet to subscribe
				</div>
			)}

			<div className="mt-4 p-3 rounded bg-blue-500/10 border border-blue-500/30 text-xs text-blue-300">
				<div className="font-semibold mb-1">Need test MATIC?</div>
				<a 
					href="https://faucet.polygon.technology/" 
					target="_blank" 
					rel="noopener noreferrer"
					className="underline hover:text-blue-200"
				>
					Get free test MATIC from Polygon Faucet →
				</a>
			</div>
		</div>
	);
}
