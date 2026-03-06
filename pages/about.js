import Head from "next/head";
import { Header } from "../Components";

const About = () => {
  return (
    <>
      <Header />
      <Head>
        <title>About - NFTs API</title>
      </Head>
      <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1>About NFTs API</h1>
        <p>
          Welcome to NFTs API - a platform for creating, managing, and
          interacting with NFTs on the blockchain.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Create and upload NFTs to IPFS</li>
          <li>View and browse NFT collections</li>
          <li>Donate to NFT creators</li>
          <li>Secure wallet integration with MetaMask</li>
        </ul>
        <h2>Technology Stack</h2>
        <ul>
          <li>Next.js - React Framework</li>
          <li>Thirdweb - Web3 SDK</li>
          <li>Ethers.js - Ethereum library</li>
          <li>MongoDB - Database</li>
          <li>Solidity - Smart Contracts</li>
        </ul>
      </div>
    </>
  );
};

export default About;
