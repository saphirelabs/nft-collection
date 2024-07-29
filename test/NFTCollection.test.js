const NFTCollection = artifacts.require("NFTCollection");

contract("NFTCollection", (accounts) => {
	it("should mint a new token starting from ID 1", async () => {
		const instance = await NFTCollection.deployed();
		const initialBalance = await instance.balanceOf(accounts[0]);

		await instance.mint(1, {
			from: accounts[0],
			value: web3.utils.toWei("0.05", "ether"),
		});

		const finalBalance = await instance.balanceOf(accounts[0]);
		assert.equal(
			finalBalance.toNumber(),
			initialBalance.toNumber() + 1,
			"Balance should increase by 1"
		);

		const tokenId = await instance.tokenOfOwnerByIndex(accounts[0], 0);
		assert.equal(tokenId.toNumber(), 1, "Token ID should be 1");
	});

	it("should not exceed MAX_SUPPLY", async () => {
		const instance = await NFTCollection.deployed();
		let exceeded = false;

		try {
			await instance.mint(10001, {
				from: accounts[0],
				value: web3.utils.toWei("500.05", "ether"),
			});
		} catch (e) {
			exceeded = true;
		}

		assert.equal(
			exceeded,
			true,
			"Should not be able to mint more than MAX_SUPPLY"
		);
	});

	it("should allow the owner to withdraw funds", async () => {
		const instance = await NFTCollection.deployed();
		const initialOwnerBalance = web3.utils.toBN(
			await web3.eth.getBalance(accounts[0])
		);

		await instance.withdraw({ from: accounts[0] });

		const finalOwnerBalance = web3.utils.toBN(
			await web3.eth.getBalance(accounts[0])
		);
		assert(
			finalOwnerBalance.gt(initialOwnerBalance),
			"Owner balance should increase after withdraw"
		);
	});

	it("should not allow more than 5 tokens per user", async () => {
		const instance = await NFTCollection.deployed();
		let exceeded = false;

		try {
			await instance.mint(6, {
				from: accounts[1],
				value: web3.utils.toWei("0.3", "ether"),
			});
		} catch (e) {
			exceeded = true;
		}

		assert.equal(
			exceeded,
			true,
			"Should not be able to mint more than 5 tokens per user"
		);
	});

	it("should allow up to 5 tokens per user", async () => {
		const instance = await NFTCollection.deployed();
		const initialBalance = await instance.balanceOf(accounts[2]);

		await instance.mint(5, {
			from: accounts[2],
			value: web3.utils.toWei("0.25", "ether"),
		});

		const finalBalance = await instance.balanceOf(accounts[2]);
		assert.equal(
			finalBalance.toNumber(),
			initialBalance.toNumber() + 5,
			"Balance should increase by 5"
		);
	});
});
