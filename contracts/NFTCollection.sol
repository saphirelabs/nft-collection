// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721Enumerable, Ownable {
	uint256 public constant MAX_SUPPLY = 10000;
	uint256 public constant PRICE = 0.05 ether;
	uint256 public constant MAX_MINT_PER_USER = 5;
	string private _baseTokenURI;

	uint256 private _nextTokenId = 1;
	mapping(address => uint256) private _mintedTokensCount;

	constructor(string memory baseURI) ERC721("NFTCollection", "NFTC") {
		require(bytes(baseURI).length > 0, "Base URI cannot be empty");
		setBaseURI(baseURI);
	}

	function mint(uint256 numberOfTokens) public payable {
		require(totalSupply() + numberOfTokens <= MAX_SUPPLY, "Exceeds MAX_SUPPLY");
		require(msg.value >= PRICE * numberOfTokens, "Ether sent is not correct");
		require(
			_mintedTokensCount[msg.sender] + numberOfTokens <= MAX_MINT_PER_USER,
			"Exceeds MAX_MINT_PER_USER"
		);

		for (uint256 i = 0; i < numberOfTokens; i++) {
			uint256 mintIndex = _nextTokenId;
			if (totalSupply() < MAX_SUPPLY) {
				_safeMint(msg.sender, mintIndex);
				_nextTokenId++;
				_mintedTokensCount[msg.sender]++;
			}
		}
	}

	function setBaseURI(string memory baseURI) public onlyOwner {
		_baseTokenURI = baseURI;
	}

	function _baseURI() internal view override returns (string memory) {
		return _baseTokenURI;
	}

	function withdraw() public onlyOwner {
		uint256 balance = address(this).balance;
		payable(msg.sender).transfer(balance);
	}
}
