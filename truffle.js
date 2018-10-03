/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

module.exports = {

networks: {

    development: 
    { // This one is optional and reduces the scope for failing fast

// https://hackernoon.com/ethereum-development-walkthrough-part-2-truffle-ganache-geth-and-mist-8d6320e12269    
//
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    },

    net2048: 
     {
      host: "localhost",
      port: 8555,
      network_id: 2048,
      gas: 4600000,
      from: "0x395708e60ed5a060f899e5eb449d1eac9a2da44e"
    },

} // networks

};
