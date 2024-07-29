const NFTCollection = artifacts.require("NFTCollection");

module.exports = function (deployer) {
	deployer.deploy(NFTCollection, "https://base-url.com");
};
