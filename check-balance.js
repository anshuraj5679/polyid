const { ethers } = require("hardhat");

async function main() {
    const [signer] = await ethers.getSigners();
    console.log("Wallet Address:", signer.address);
    
    const balance = await signer.provider.getBalance(signer.address);
    console.log("Balance:", ethers.formatEther(balance), "MATIC");
    
    if (balance === 0n) {
        console.log("\n❌ No MATIC found in wallet!");
        console.log("🚰 Get test MATIC from: https://faucet.polygon.technology/");
        console.log("📋 Select 'Polygon Amoy' and enter your wallet address");
        process.exit(1);
    } else {
        console.log("✅ Wallet has sufficient balance for deployment");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});