async function main() {
  const hre = require("hardhat");

  console.log("Testing Sepolia network connection...");

  // Get the network information
  const network = await hre.ethers.provider.getNetwork();
  console.log("Network:", network.name);
  console.log("Chain ID:", network.chainId);

  // Get the latest block number
  const blockNumber = await hre.ethers.provider.getBlockNumber();
  console.log("Latest block number:", blockNumber);

  console.log("Connection successful!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
