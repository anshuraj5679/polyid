const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
    const privateKey = process.env.PRIVATE_KEY;
    
    if (!privateKey) {
        console.log("❌ PRIVATE_KEY not found in .env file");
        return;
    }
    
    // Create wallet from private key
    const wallet = new ethers.Wallet(privateKey);
    console.log("🔑 Wallet Address:", wallet.address);
    
    // Connect to Polygon Amoy
    const provider = new ethers.JsonRpcProvider(process.env.POLYGON_AMOY_RPC || "https://rpc-amoy.polygon.technology");
    const connectedWallet = wallet.connect(provider);
    
    try {
        const balance = await provider.getBalance(wallet.address);
        console.log("💰 Balance:", ethers.formatEther(balance), "MATIC");
        
        if (balance === 0n) {
            console.log("\n❌ Wallet has no MATIC!");
            console.log("🚰 Get test MATIC from faucet:");
            console.log("   • https://faucet.polygon.technology/");
            console.log("   • https://www.alchemy.com/faucets/polygon-amoy");
            console.log("📋 Use this address:", wallet.address);
        } else {
            console.log("✅ Wallet ready for deployment!");
        }
    } catch (error) {
        console.log("❌ Error checking balance:", error.message);
    }
}

main().catch(console.error);