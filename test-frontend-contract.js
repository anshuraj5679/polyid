const { ethers } = require("ethers");
require("dotenv").config();

async function testFrontendContract() {
    console.log("🧪 Testing Frontend Contract Connection...\n");
    
    const contractAddress = "0x757B359C814362e64A205F5D9B1d0eE8E1a1544F";
    const rpcUrl = "https://rpc-amoy.polygon.technology";
    const testAddress = "0x092661531D9186Fa6E48501A5e3b508B3F52e64c";
    
    console.log("📋 Contract Address:", contractAddress);
    console.log("🌐 RPC URL:", rpcUrl);
    console.log("👤 Test Address:", testAddress);
    
    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        
        // Simple ABI for testing
        const abi = [
            "function getCredentials(address student) view returns (uint256[])",
            "function tokenURI(uint256 tokenId) view returns (string)",
            "function ownerOf(uint256 tokenId) view returns (address)"
        ];
        
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        console.log("\n🔍 Checking credentials for address...");
        const credentials = await contract.getCredentials(testAddress);
        console.log("🎓 Credentials found:", credentials.length);
        
        for (let i = 0; i < credentials.length; i++) {
            const tokenId = credentials[i].toString();
            console.log(`\n📜 Token ${tokenId}:`);
            
            const owner = await contract.ownerOf(tokenId);
            console.log("   Owner:", owner);
            
            const uri = await contract.tokenURI(tokenId);
            console.log("   URI:", uri.substring(0, 50) + "...");
        }
        
        console.log("\n✅ Frontend should now show these credentials in on-chain mode!");
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

testFrontendContract();