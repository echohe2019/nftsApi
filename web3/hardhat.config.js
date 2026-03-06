/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY =
  "ee15c07aacb21f3760c88b7ec9743d0ae762d7059e0e24a272e5cdb49ad31a68";
const SEPOLIA_RPC_URL = "https://rpc.sepolia.org";
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
      chainId: 11155111,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
