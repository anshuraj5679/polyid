const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
    console.log("🔍 Checking wallet status...\n");
    
    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey);
    const provider = new ethers.JsonRpcProvider(process.env.POLYGON_AMOY_RPC);
    const connectedWallet = wallet.connect(provider);
    
    console.log("🔑 Wallet Address:", wallet.address);
    
    const balance = await provider.getBalance(wallet.address);
    const balanceInMatic = ethers.formatEther(balance);
    console.log("💰 Balance:", balanceInMatic, "MATIC");
    
    if (parseFloat(balanceInMatic) < 0.01) {
        console.log("\n❌ Insufficient MATIC for deployment!");
        console.log("🚰 Get test MATIC from: https://faucet.polygon.technology/");
        console.log("📋 Use address:", wallet.address);
        console.log("💡 You need at least 0.01 MATIC to deploy the contract");
        return;
    }
    
    console.log("✅ Sufficient balance for deployment!");
    console.log("\n🚀 Ready to deploy contract!");
    console.log("Run: npx hardhat run scripts/deploy.js --network amoyTestnet");
}

main().catch(console.error);