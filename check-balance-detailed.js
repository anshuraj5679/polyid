const { ethers } = require("ethers");
require("dotenv").config();

async function checkBalance() {
    console.log("🔍 Detailed Balance Check\n");
    
    const privateKey = process.env.PRIVATE_KEY;
    console.log("🔑 Private Key (first 10 chars):", privateKey ? privateKey.substring(0, 10) + "..." : "NOT SET");
    
    if (!privateKey) {
        console.log("❌ No private key found in .env");
        return;
    }
    
    try {
        // Create wallet from private key
        const wallet = new ethers.Wallet(privateKey);
        console.log("📋 Wallet Address:", wallet.address);
        
        // Try multiple RPC endpoints
        const rpcEndpoints = [
            "https://rpc-amoy.polygon.technology",
            "https://polygon-amoy.g.alchemy.com/v2/demo",
            "https://rpc.ankr.com/polygon_amoy"
        ];
        
        for (const rpc of rpcEndpoints) {
            console.log(`\n🌐 Checking balance via: ${rpc}`);
            try {
                const provider = new ethers.JsonRpcProvider(rpc);
                const balance = await provider.getBalance(wallet.address);
                const balanceInMatic = ethers.formatEther(balance);
                
                console.log("💰 Balance:", balanceInMatic, "MATIC");
                
                if (parseFloat(balanceInMatic) > 0) {
                    console.log("✅ Found MATIC! Ready to deploy.");
                    
                    // Also check network info
                    const network = await provider.getNetwork();
                    console.log("🌐 Network Chain ID:", network.chainId.toString());
                    console.log("🌐 Network Name:", network.name);
                    
                    return { balance: balanceInMatic, provider, wallet: wallet.connect(provider) };
                }
            } catch (error) {
                console.log("❌ Error with", rpc, ":", error.message);
            }
        }
        
        console.log("\n❌ No MATIC found on any RPC endpoint");
        console.log("🚰 Please get test MATIC from:");
        console.log("   • https://faucet.polygon.technology/ (Select 'Polygon Amoy')");
        console.log("   • https://www.alchemy.com/faucets/polygon-amoy");
        console.log("📋 Wallet Address:", wallet.address);
        console.log("⏱️  Note: Faucet tokens may take 1-2 minutes to arrive");
        
    } catch (error) {
        console.log("❌ Error creating wallet:", error.message);
    }
}

checkBalance().catch(console.error);