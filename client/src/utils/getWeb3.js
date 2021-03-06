import Web3 from "web3";


var Web3WsProvider = require('web3-providers-ws');

const getWeb3 = () =>
  new Promise((resolve, reject) => 
  {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", () => 
    {
      let web3 = window.web3;

      // Checking if Web3 has been injected by the browser (Mist/MetaMask).
      const alreadyInjected = typeof web3 !== "undefined";

      if (alreadyInjected)
      {
        // Use Mist/MetaMask's provider.
        web3 = new Web3(web3.currentProvider);
        console.log("Injected web3 detected.");
        resolve(web3);

        console.log(web3);
      }
      else
      {
        // Fallback to localhost if no web3 injection. We've configured this to
        // use the development console's port by default.
        //

        var privateNetWebSocketUrl = 'ws://localhost:8555'  ;
        var privateNetRpcUrl       = 'http://localhost:8545';

        var ganacheWebSocketUrl    = 'ws://localhost:7545'  ;
        var ganacheRpcUrl          = 'http://localhost:7545';


        var isUseWebSockets = true;
        var provider = null;

        if (isUseWebSockets)
        {
// set a custom timeout at 30 seconds, 
// and credentials 
// (you can also add the credentials to the URL: ws://username:password@localhost:8546)
//	        
        var options = 
        {
            timeout: 30000, 
//            headers: {authorization: 'Basic username:password'} 
        }; 
         

            var ws = 
                new Web3WsProvider(
                        ganacheWebSocketUrl, 
                        options);

            provider = ws;
        }
        else
        {
            provider =
                new Web3.providers.HttpProvider(ganacheRpcUrl);
        }


        web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);

      } // else - web3 not injected yet

    }); // window.addEventListener

  }); // getWeb3 - promise

export default getWeb3;
