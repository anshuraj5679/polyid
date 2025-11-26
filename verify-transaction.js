const { ethers } = require("ethers");
require("dotenv").config();

async function verifyTransaction() {
    console.log("🔍 Verifying blockchain transaction...\n");
    
    const provider = new ethers.JsonRpcProvider(process.env.POLYGON_AMOY_RPC);
    const contractAddress = process.env.CONTRACT_ADDRESS;
    
    console.log("📋 Contract Address:", contractAddress);
    console.log("🌐 Network: Polygon Amoy Testnet");
    
    // Check if contract exists
    const code = await provider.getCode(contractAddress);
    console.log("📏 Contract Code Length:", code.length, "characters");
    
    if (code === "0x") {
        console.log("❌ No contract found at this address");
        return;
    }
    
    console.log("✅ Contract exists on blockchain");
    
    // Get contract instance
    const abi = [
        "function getCredentials(address student) view returns (uint256[])",
        "function tokenURI(uint256 tokenId) view returns (string)",
        "function ownerOf(uint256 tokenId) view returns (address)",
        "function isVerifiedIssuer(address issuer) view returns (bool)"
    ];
    
    const contract = new ethers.Contract(contractAddress, abi, provider);
    
    // Check issuer status
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    const isVerified = await contract.isVerifiedIssuer(wallet.address);
    console.log("🔐 Issuer Status:", isVerified ? "✅ Verified" : "❌ Not Verified");
    
    // Check credentials for the test address
    const testAddress = "0x092661531D9186Fa6E48501A5e3b508B3F52e64c";
    console.log("👤 Checking credentials for:", testAddress);
    
    const credentials = await contract.getCredentials(testAddress);
    console.log("🎓 Number of credentials:", credentials.length);
    
    for (let i = 0; i < credentials.length; i++) {
        const tokenId = credentials[i].toString();
        console.log(`\n📜 Credential ${i + 1}:`);
        console.log("   Token ID:", tokenId);
        
        try {
            const owner = await contract.ownerOf(tokenId);
            console.log("   Owner:", owner);
            
            const uri = await contract.tokenURI(tokenId);
            console.log("   Metadata URI:", uri.substring(0, 100) + "...");
            
            // Decode base64 metadata if it's a data URI
            if (uri.startsWith("data:application/json;base64,")) {
                const base64Data = uri.split(",")[1];
                const metadata = JSON.parse(Buffer.from(base64Data, 'base64').toString());
                console.log("   📋 Decoded Metadata:");
                console.log("      Name:", metadata.name);
                console.log("      Description:", metadata.description);
                console.log("      Issued By:", metadata.issuedBy);
                console.log("      Date:", metadata.dateIssued);
            }
        } catch (error) {
            console.log("   ❌ Error reading credential:", error.message);
        }
    }
    
    console.log("\n🌐 View on Explorer:");
    console.log(`   Contract: https://amoy.polygonscan.com/address/${contractAddress}`);
    if (credentials.length > 0) {
        console.log(`   Latest Token: https://amoy.polygonscan.com/token/${contractAddress}?a=${credentials[credentials.length - 1]}`);
    }
}

verifyTransaction().catch(console.error);