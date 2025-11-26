const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    console.log("🚀 Deploying PolyIDSBT Contract...\n");
    
    // Use Hardhat's default funded account for deployment
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with account:", deployer.address);
    
    try {
        const balance = await deployer.provider.getBalance(deployer.address);
        console.log("Account balance:", ethers.formatEther(balance), "MATIC");
        
        if (balance === 0n) {
            console.log("❌ No balance in deployer account");
            console.log("🔄 Trying to use a funded testnet account...");
            
            // Create a wallet with a known funded private key (Hardhat default)
            const fundedPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
            const fundedWallet = new ethers.Wallet(fundedPrivateKey, deployer.provider);
            
            const fundedBalance = await deployer.provider.getBalance(fundedWallet.address);
            console.log("Funded account balance:", ethers.formatEther(fundedBalance), "MATIC");
            
            if (fundedBalance > 0n) {
                console.log("✅ Using funded account for deployment");
                const Contract = await ethers.getContractFactory("PolyIDSBT", fundedWallet);
                const contract = await Contract.deploy();
                await contract.waitForDeployment();
                const contractAddress = await contract.getAddress();
                
                console.log("✅ PolyIDSBT deployed to:", contractAddress);
                
                // Update environment files
                updateEnvFiles(contractAddress);
                
                return contractAddress;
            }
        }
        
        // Try with original deployer
        console.log("🔨 Compiling and deploying contract...");
        const Contract = await ethers.getContractFactory("PolyIDSBT");
        const contract = await Contract.deploy();
        await contract.waitForDeployment();
        const contractAddress = await contract.getAddress();
        
        console.log("✅ PolyIDSBT deployed to:", contractAddress);
        
        // Update environment files
        updateEnvFiles(contractAddress);
        
        return contractAddress;
        
    } catch (error) {
        console.error("❌ Deployment failed:", error.message);
        
        if (error.message.includes("insufficient funds")) {
            console.log("\n💡 Solution: Get test MATIC from faucet");
            console.log("🚰 Visit: https://faucet.polygon.technology/");
            console.log("📋 Address: 0x8aDEc9885b3A4E5824f329fCCC3026BaFdce6B8F");
            console.log("⏱️  Wait 1-2 minutes after requesting, then try again");
        }
        
        throw error;
    }
}

function updateEnvFiles(contractAddress) {
    console.log("\n📝 Updating environment files...");
    
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
    
    console.log("\n🎉 Contract deployed and configured successfully!");
    console.log("🔗 Contract Address:", contractAddress);
    console.log("🌐 View on Explorer: https://amoy.polygonscan.com/address/" + contractAddress);
}

main()
    .then((address) => {
        console.log("\n✅ Deployment completed successfully!");
        console.log("📋 Next steps:");
        console.log("1. Restart your backend server");
        console.log("2. Test the Issue button in your frontend");
        console.log("3. Create an admin issuer account");
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });