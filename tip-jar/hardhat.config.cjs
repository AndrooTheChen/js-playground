require('@nomiclabs/hardhat-waffle'); // import the waffle plugin

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: './src/artifacts', // Where the compilation artifacts will live
    sources: './src/contracts' // Where the smart contract source code will found
  },
  networks: {
    // define the networks where hardhat will deploy
    hardhat: {
      chainId: 1337 // To be able to work with metamask in localhost
    }
  }
};
