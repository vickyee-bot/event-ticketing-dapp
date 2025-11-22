require("@nomicfoundation/hardhat-toolbox");
const { ethers } = require("ethers");

const wallet = ethers.Wallet.createRandom();

console.log("🎯 DEPLOYMENT WALLET GENERATED:");
console.log("📍 Address:", wallet.address);
console.log("🔑 Private Key:", wallet.privateKey);
console.log(
  "💡 Fund this address with Fuji AVAX from: https://faucet.avax.network/"
);

module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [
        wallet.privateKey || "9215c9d8a6106e4656021787656d9cf590a72D4b",
      ],
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },
};
