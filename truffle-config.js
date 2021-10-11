require('babel-register');
require('babel-polyfill');
var HDWalletProvider = require("truffle-hdwallet-provider");


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7547,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function (){
        return new HDWalletProvider()
      },
      network_id: 4
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}