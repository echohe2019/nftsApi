// Simple network test
const { ethers } = require("hardhat");

async function main() {
  console.log("Testing Sepolia network connection...");
  
  // Get provider
  const provider = new ethers.providers.JsonRpcProvider("https://rpc.sepolia.org");
  
  try {
    // Get network info
    const network = await provider.getNetwork();
    console.log("Network:", network.name);
    console.log("Chain ID:", network.chainId);
    
    // Get block number
    const blockNumber = await provider.getBlockNumber();
    console.log("Latest block number:", blockNumber);
    
    console.log("Connection successful!");
  } catch (error) {
    console.error("Connection failed:", error.message);
  }
}

main();
