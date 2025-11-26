const { ethers } = require("hardhat");

async function main() {
	const [deployer] = await ethers.getSigners();
	console.log("Deploying with:", deployer.address);
	console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

	const Contract = await ethers.getContractFactory("PolyIDSBT");
	const contract = await Contract.deploy();
	await contract.waitForDeployment();
	const contractAddress = await contract.getAddress();
	console.log("PolyIDSBT deployed to:", contractAddress);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});



