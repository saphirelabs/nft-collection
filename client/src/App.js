import React, { useEffect, useState } from "react";
import Web3 from "web3";
import NFTCollection from "./contracts/NFTCollection.json";
import {
	Container,
	Header,
	Supply,
	MintButton,
	ConnectButton,
} from "./AppElements";

const App = () => {
	const [account, setAccount] = useState("");
	const [contract, setContract] = useState(null);
	const [totalSupply, setTotalSupply] = useState("0");
	const [web3, setWeb3] = useState(null);
	const [loading, setLoading] = useState(true);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		const loadBlockchainData = async () => {
			try {
				if (window.ethereum) {
					const web3 = new Web3(window.ethereum);
					setWeb3(web3);

					const networkId = await web3.eth.net.getId();
					const networkData = NFTCollection.networks[networkId];
					if (networkData) {
						const abi = NFTCollection.abi;
						const address = networkData.address;
						const contract = new web3.eth.Contract(abi, address);
						setContract(contract);

						const totalSupply = await contract.methods.totalSupply().call();
						setTotalSupply(totalSupply.toString());
					} else {
						window.alert("Smart contract not deployed to detected network.");
					}
				} else if (window.web3) {
					const web3 = new Web3(window.web3.currentProvider);
					setWeb3(web3);

					const networkId = await web3.eth.net.getId();
					const networkData = NFTCollection.networks[networkId];
					if (networkData) {
						const abi = NFTCollection.abi;
						const address = networkData.address;
						const contract = new web3.eth.Contract(abi, address);
						setContract(contract);

						const totalSupply = await contract.methods.totalSupply().call();
						setTotalSupply(totalSupply.toString());
					} else {
						window.alert("Smart contract not deployed to detected network.");
					}
				} else {
					const web3 = new Web3(
						new Web3.providers.HttpProvider("http://localhost:7545")
					);
					setWeb3(web3);

					const networkId = await web3.eth.net.getId();
					const networkData = NFTCollection.networks[networkId];
					if (networkData) {
						const abi = NFTCollection.abi;
						const address = networkData.address;
						const contract = new web3.eth.Contract(abi, address);
						setContract(contract);

						const totalSupply = await contract.methods.totalSupply().call();
						setTotalSupply(totalSupply.toString());
					} else {
						window.alert("Smart contract not deployed to detected network.");
					}
				}
			} catch (error) {
				console.error("Error loading blockchain data", error);
				window.alert("An error occurred while loading blockchain data.");
			}
			setLoading(false);
		};

		loadBlockchainData();
	}, []);

	const connectWallet = async () => {
		if (window.ethereum) {
			try {
				await window.ethereum.request({ method: "eth_requestAccounts" });
				const accounts = await web3.eth.getAccounts();
				setAccount(accounts[0]);
				setConnected(true);
			} catch (error) {
				console.error("User denied account access");
				window.alert("User denied account access");
			}
		} else {
			window.alert("Please install MetaMask!");
		}
	};

	const mint = async (numberOfTokens) => {
		if (contract) {
			try {
				const gasPrice = await web3.eth.getGasPrice();
				await contract.methods.mint(numberOfTokens).send({
					from: account,
					value: web3.utils.toWei((0.05 * numberOfTokens).toString(), "ether"),
					gasPrice: gasPrice,
				});

				// Update total supply after minting
				const updatedTotalSupply = await contract.methods.totalSupply().call();
				setTotalSupply(updatedTotalSupply.toString());
			} catch (error) {
				console.error("Minting failed", error);
				window.alert("Minting failed: " + error.message);
			}
		}
	};

	return (
		<Container>
			<Header>NFT Collection</Header>
			{connected ? (
				<>
					<Supply>Total Supply: {totalSupply}</Supply>
					<MintButton onClick={() => mint(1)} disabled={loading || !contract}>
						Mint 1 Token
					</MintButton>
				</>
			) : (
				<ConnectButton onClick={connectWallet}>Connect Wallet</ConnectButton>
			)}
		</Container>
	);
};

export default App;
