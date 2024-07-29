# NFT Collection Template [Saphire Labs]

This project is a decentralized application (DApp) Template for minting NFTs (Non-Fungible Tokens) on the Ethereum blockchain. The application is built using Solidity for the smart contract, Truffle for development and deployment, and React.js for the frontend interface.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Compiling Contracts](#compiling-contracts)
- [Deploying Contracts](#deploying-contracts)
- [Running the Frontend](#running-the-frontend)
- [Testing the Contracts](#testing-the-contracts)
- [Interacting with the DApp](#interacting-with-the-dapp)

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (version 6.x or later)
- [Truffle](https://www.trufflesuite.com/) (version 5.x or later)
- [Ganache](https://www.trufflesuite.com/ganache) (for local development)

You also need a MetaMask wallet or any other Ethereum wallet to interact with the DApp.

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd nft-collection
   ```

2. **Install dependencies:**

   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

## Configuration

1. **Create a `.env` file:**

   In the root directory, create a `.env` file and add your environment variables:

   ```plaintext
   MNEMONIC="your mnemonic phrase here"
   INFURA_PROJECT_ID="your Infura project ID here"
   ETHERSCAN_API_KEY="your Etherscan API key here"
   ```

2. **Update `truffle-config.js`:**

   Ensure the `truffle-config.js` is set to compile contracts to the correct directory:

   ```javascript
   const HDWalletProvider = require("@truffle/hdwallet-provider");
   require("dotenv").config();

   module.exports = {
   	contracts_build_directory: "./client/src/contracts",

   	networks: {
   		development: {
   			host: "127.0.0.1",
   			port: 7545,
   			network_id: "*",
   		},
   		mainnet: {
   			provider: () =>
   				new HDWalletProvider({
   					mnemonic: process.env.MNEMONIC,
   					providerOrUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
   					numberOfAddresses: 1,
   					shareNonce: true,
   				}),
   			network_id: 1,
   			gas: 5500000,
   			gasPrice: 20000000000,
   			confirmations: 2,
   			timeoutBlocks: 200,
   			skipDryRun: true,
   		},
   		ropsten: {
   			provider: () =>
   				new HDWalletProvider({
   					mnemonic: process.env.MNEMONIC,
   					providerOrUrl: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
   					numberOfAddresses: 1,
   					shareNonce: true,
   				}),
   			network_id: 3,
   			gas: 5500000,
   			confirmations: 2,
   			timeoutBlocks: 200,
   			skipDryRun: true,
   		},
   	},

   	mocha: {},

   	compilers: {
   		solc: {
   			version: "0.8.19",
   			settings: {
   				optimizer: {
   					enabled: true,
   					runs: 200,
   				},
   			},
   		},
   	},

   	plugins: ["truffle-plugin-verify"],

   	api_keys: {
   		etherscan: process.env.ETHERSCAN_API_KEY,
   	},

   	db: {
   		enabled: false,
   	},
   };
   ```

## Compiling Contracts

1. **Compile the smart contracts:**

   ```bash
   truffle compile
   ```

## Deploying Contracts

1. **Deploy the smart contracts to the development network:**

   Ensure Ganache is running, then deploy the contracts:

   ```bash
   truffle migrate --reset --network development
   ```

2. **Deploy to other networks:**

   To deploy to Ropsten or Mainnet, ensure your `.env` file is correctly configured with your Infura and mnemonic details, then run:

   ```bash
   truffle migrate --network ropsten
   ```

   or

   ```bash
   truffle migrate --network mainnet
   ```

## Running the Frontend

1. **Start the React development server:**

   ```bash
   cd client
   npm start
   ```

2. **Open your browser:**

   Navigate to `http://localhost:3000` to interact with the DApp.

## Testing the Contracts

1. **Run the smart contract tests:**

   ```bash
   truffle test
   ```

## Interacting with the DApp

1. **Connect Wallet:**

   - Open the DApp in your browser.
   - Click on the "Connect Wallet" button to connect your MetaMask wallet.

2. **Mint NFT:**

   - Once connected, you can mint an NFT by clicking the "Mint 1 Token" button.
   - Ensure you have sufficient ETH in your wallet to cover the minting fee.

3. **Check Total Supply:**

   - The total supply of minted NFTs will be displayed on the main page.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [OpenZeppelin](https://openzeppelin.com/) for their awesome library of secure smart contracts.
- [Truffle](https://www.trufflesuite.com/) for the development framework.
- [MetaMask](https://metamask.io/) for the Ethereum wallet.
- [Infura](https://infura.io/) for the Ethereum API.

## Contact

For any questions or inquiries, please contact info@saphirelabs.com.
