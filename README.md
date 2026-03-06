# NFTs API

A comprehensive platform for creating, managing, and interacting with NFTs on the blockchain.

## Features

- **NFT Creation**: Upload and mint NFTs to IPFS
- **Collection Management**: View and browse NFT collections
- **Donation System**: Support NFT creators through donations
- **Wallet Integration**: Secure connection with MetaMask
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: Next.js, React, CSS Modules
- **Web3**: Thirdweb SDK, Ethers.js
- **Blockchain**: Ethereum (Sepolia testnet)
- **Database**: MongoDB
- **Smart Contracts**: Solidity

## Installation

### Prerequisites

- Node.js 16+
- npm or yarn
- MetaMask wallet
- MongoDB connection
- Thirdweb API key

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nfts-api.git
   cd nfts-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   Create a `.env.local` file with the following:
   ```
   THIRDWEB_CLIENT_ID=your_thirdweb_client_id
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Set up Hardhat for Sepolia**
   Update `web3/hardhat.config.js` with your Sepolia RPC URL and private key.

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Usage

### Creating an NFT
1. Connect your MetaMask wallet
2. Navigate to the upload page
3. Upload an image and fill in the details
4. Click "Mint NFT" to create your NFT

### Donating to Creators
1. Browse NFT collections
2. Click on an NFT to view details
3. Click "Donate" button
4. Enter amount and confirm transaction

## Smart Contracts

The project uses Solidity smart contracts for NFT management. Contracts are deployed on the Sepolia testnet.

## API Endpoints

- **GET /api/nfts** - Get all NFTs
- **GET /api/nfts/:id** - Get single NFT
- **POST /api/nfts** - Create new NFT
- **POST /api/donate** - Process donation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.