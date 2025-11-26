require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { PRIVATE_KEY, POLYGON_AMOY_RPC } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: {
		version: "0.8.24",
		settings: {
			optimizer: { enabled: true, runs: 200 }
		}
	},
	networks: {
		amoyTestnet: {
			url: POLYGON_AMOY_RPC || "https://rpc-amoy.polygon.technology",
			accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
		}
	}
};

