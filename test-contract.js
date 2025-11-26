const { ethers } = require("ethers");
require("dotenv").config();

async function testContract() {
    console.log("🧪 Testing deployed contract...\n");
    
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const rpcUrl = process.env.POLYGON_AMOY_RPC;
    
    console.log("📋 Contract Address:", contractAddress);
    console.log("🌐 RPC URL:", rpcUrl);
    
    if (!contractAddress) {
        console.log("❌ CONTRACT_ADDRESS not set in .env");
        return;
    }
    
    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        
        // Check if contract exists
        const code = await provider.getCode(contractAddress);
        if (code === "0x") {
            console.log("❌ No contract found at address:", contractAddress);
            return;
        }
        
        console.log("✅ Contract exists at address:", contractAddress);
        console.log("📏 Contract code length:", code.length, "characters");
        
        // Try to read contract name
        const abi = [
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function owner() view returns (address)"
        ];
        
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        try {
            const name = await contract.name();
            const symbol = await contract.symbol();
            const owner = await contract.owner();
            
            console.log("📛 Contract Name:", name);
            console.log("🏷️  Contract Symbol:", symbol);
            console.log("👤 Contract Owner:", owner);
            
            console.log("\n✅ Contract is working correctly!");
            console.log("🌐 View on Explorer: https://amoy.polygonscan.com/address/" + contractAddress);
            
        } catch (error) {
            console.log("⚠️  Contract exists but couldn't read details:", error.message);
        }
        
    } catch (error) {
        console.log("❌ Error testing contract:", error.message);
    }
}

testContract();