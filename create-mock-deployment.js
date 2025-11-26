const fs = require("fs");

// Create a mock contract address for testing
const mockContractAddress = "0x1234567890123456789012345678901234567890";

console.log("🔧 Creating mock deployment for testing...\n");

function updateEnvFiles(contractAddress) {
    console.log("📝 Updating environment files with mock contract...");
    
    // Update root .env
    const rootEnvPath = ".env";
    if (fs.existsSync(rootEnvPath)) {
        let content = fs.readFileSync(rootEnvPath, "utf8");
        content = content.replace(/CONTRACT_ADDRESS=.*/, `CONTRACT_ADDRESS=${contractAddress}`);
        fs.writeFileSync(rootEnvPath, content);
        console.log("✅ Updated .env");
    }
    
    // Update backend .env
    const backendEnvPath = "backend/.env";
    if (fs.existsSync(backendEnvPath)) {
        let content = fs.readFileSync(backendEnvPath, "utf8");
        content = content.replace(/CONTRACT_ADDRESS=.*/, `CONTRACT_ADDRESS=${contractAddress}`);
        fs.writeFileSync(backendEnvPath, content);
        console.log("✅ Updated backend/.env");
    }
    
    // Update frontend .env
    const frontendEnvPath = "frontend/.env";
    if (fs.existsSync(frontendEnvPath)) {
        let content = fs.readFileSync(frontendEnvPath, "utf8");
        if (content.includes("VITE_CONTRACT_ADDRESS=")) {
            content = content.replace(/VITE_CONTRACT_ADDRESS=.*/, `VITE_CONTRACT_ADDRESS=${contractAddress}`);
        } else {
            content += `\nVITE_CONTRACT_ADDRESS=${contractAddress}`;
        }
        fs.writeFileSync(frontendEnvPath, content);
        console.log("✅ Updated frontend/.env");
    }
}

updateEnvFiles(mockContractAddress);

console.log("\n⚠️  MOCK DEPLOYMENT COMPLETE");
console.log("🔗 Mock Contract Address:", mockContractAddress);
console.log("\n📋 This is a temporary solution for testing the frontend.");
console.log("🚰 To deploy a real contract:");
console.log("1. Get test MATIC from: https://faucet.polygon.technology/");
console.log("2. Use wallet address: 0x8aDEc9885b3A4E5824f329fCCC3026BaFdce6B8F");
console.log("3. Run: npx hardhat run scripts/deploy.js --network amoyTestnet");
console.log("\n✅ Your Issue button should now work in test mode!");