// require("dotenv").config();
// const fs =require("fs")
// const path =require("path")
// // const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
// const HDWalletProvider = require("@truffle/hdwallet-provider");
// // const privateKeys = process.env.PRIVATE_KEYS || "";
// // const INFURA_API_KEY="https://mainnet.infura.io/v3/a6133da368b044e4ac867f17244de67b"
// // const PRIVATE_KEYS ="1d41042bc397622377f28c3babae80f99df42ec8023e51dfcf079c38b0d25721"
// const {INFURA_API_KEY,PRIVATE_KEYS} =process.env;
// const mnemonic =fs.readFileSync("migrations/.secret").toString().trim();

// module.exports = {
//   contracts_build_directory:path.join(__dirname,"./build/contracts"),
//   networks: {
//     development: {
//       host: "127.0.0.1",
//       port: 7545,
//       network_id: "*", //match any network id
//     },

//     rinkeby: {
//       // provider: function () {
//       //   return new HDWalletProvider(
//       //     // privateKeys.split(","), // array of private keys
//       //     mnemonic , `https://rinkeby.infura.io/v3/${INFURA_API_KEY}` // Url to an Ethereum node
//       //   );
//       // },
//       provider:()=>new HDWalletProvider(mnemonic,`https://rinkeby.infura.io/v3/a6133da368b044e4ac867f17244de67b`),
//       gas: 5500000,
//       // gasPrice: 25000000000,
//       network_id: 4,
//     },

//     // ropsten: {
//     //   provider: function () {
//     //     return new HDWalletProvider(
//     //       mnemonic,
//     //       "https://ropsten.infura.io/v3/84bae3d7e7a745c5830e69ba34961d6f"
//     //     );
//     //   },
//     //   test: {
//     //     provider: function () {
//     //       return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/");
//     //     },
//     //     network_id: "*",
//     //   },
//     // },
//   },
//   contracts_directory: "./contracts",
//   contracts_build_directory: "./build/contracts",
//   plugins:["truffle-plugin-verify"],
//   api_keys:{},
//   // Configure your compilers
//   compilers: {
//     solc: {
//       optimizer: {
//         enabled: true,
//         runs: 200,
//       },
//       version: "^0.8.0",
//     },
//   },
// };
require("dotenv").config();

const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKeys = process.env.PRIVATE_KEYS || "";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", //match any network id
    },

    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          privateKeys.split(","), // array of private keys
          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}` // Url to an Ethereum node
        );
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 4,
    },

    // ropsten: {
    //   provider: function () {
    //     return new HDWalletProvider(
    //       mnemonic,
    //       "https://ropsten.infura.io/v3/84bae3d7e7a745c5830e69ba34961d6f"
    //     );
    //   },
    //   test: {
    //     provider: function () {
    //       return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/");
    //     },
    //     network_id: "*",
    //   },
    // },
  },
  contracts_directory: "./contracts",
  contracts_build_directory: "./build/contracts",

  // Configure your compilers
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      version: "^0.8.0",
    },
  },
};