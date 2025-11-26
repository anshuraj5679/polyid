const { ethers } = require("hardhat");

async function setVerifiedIssuer() {
    console.log("🔐 Setting verified issuer on contract...\n");
    
    const [deployer] = await ethers.getSigners();
    console.log("Using account:", deployer.address);
    
    const contractAddress = process.env.CONTRACT_ADDRESS;
    console.log("Contract address:", contractAddress);
    
    // Get contract instance
    const Contract = await ethers.getContractFactory("PolyIDSBT");
    const contract = new ethers.Contract(
        contractAddress,
        Contract.interface,
        deployer
    );
    
    // Set the deployer wallet as verified issuer
    console.log("Setting verified issuer...");
    const tx = await contract.setVerifiedIssuer(deployer.address, true);
    console.log("Transaction hash:", tx.hash);
    
    const receipt = await tx.wait();
    console.log("✅ Transaction confirmed in block:", receipt.blockNumber);
    
    // Verify it worked
    const isVerified = await contract.isVerifiedIssuer(deployer.address);
    console.log("✅ Issuer verification status:", isVerified);
    
    console.log("\n🎉 Setup complete! Your wallet can now issue credentials.");
}

setVerifiedIssuer()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Error:", error);
        process.exit(1);
    });