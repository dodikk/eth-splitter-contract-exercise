import React, { Component } from "react";
import AdkSplitterForTwo from "./contracts/AdkSplitterForTwo.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";

import "./App.css";

class App extends Component
{
  // TODO: not using props for hard-coded addresses
  // since they will move to "state"
  // when input fields and submit button get added

  // TODO: maybe use nested structures
  // after getting more familiar with react.js

  state =
  {
      web3                        : null,
      accounts                    : null,
      contract                    : null,
      senderAccountAddress        : null,
      firstReceiverAccountAddress : null,
      secondReceiverAccountAddress: null,
      firstReceiverBalance        : null,
      secondReceiverBalance       : null,
      senderBalance               : null,
      contractAddress             : null,
      contractBalance             : null
  };

  _blockchainLogsSubscription     = null;
  _pendingTransactionSubscription = null;
  _ethFilterSubscription          = null;

  componentDidMount = async () =>
  {
    try
    {
      console.log("=== componentDidMount");

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(AdkSplitterForTwo);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();
      const instanceAddress = await instance.GetContractAddress();

      console.log(instance);
      console.log("contract : " + instanceAddress);


      var sender         = accounts[2];
      var firstReceiver  = accounts[0];
      var secondReceiver = accounts[1];


      var senderBalance         = await web3.eth.getBalance(sender         );
      var firstReceiverBalance  = await web3.eth.getBalance(firstReceiver  );
      var secondReceiverBalance = await web3.eth.getBalance(secondReceiver );
      var instanceBalance       = await web3.eth.getBalance(instanceAddress);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
          {
              web3                        : web3                ,
              accounts                    : accounts            ,
              contract                    : instance            ,
              senderAccountAddress        : sender              ,
              firstReceiverAccountAddress : firstReceiver       ,
              secondReceiverAccountAddress: secondReceiver      ,
              senderBalance               : senderBalance       ,
              firstReceiverBalance        : firstReceiverBalance,
              secondReceiverBalance       : secondReceiverBalance,
              contractAddress             : instanceAddress      ,
              contractBalance             : instanceBalance
          }
      ); // this.setState()


// ========== subscriptions  ================= //
// 
// TODO: make a separate function
//
//============================


      console.log("[BEGIN] subscribing event...");
      instance.LogEndSplit(                                
                    {fromBlock: 'latest'}               ,  
                    this.onContractStateChangedWatch    ); 
      console.log("[END] subscribed event");





// this subscription works 
// but it causes an error in the firefox console
//
// TypeError: can't assign to property "data" 
// on "0x5b4ed3ad2c3382baba5d694651118ec13272b5644ab155711ce6140ab344400e": not an object 
// index.js:359 
//
//
// https://github.com/HaoLLL/web3-eth-contract/blob/master/src/index.js#L351
//
      console.log("[BEGIN] subscribing txpool...");

      this._pendingTransactionSubscription =  
          web3.eth.subscribe(
              'pendingTransactions');
//              this.onTransactionMinedMaybe); 
      this._pendingTransactionSubscription.subscribe( this.onTransactionMinedMaybe );

      console.log("[END] subscribing txpool...");





// https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethfilter
//      console.log("[BEGIN] subscribing filter...");
//      this._ethFilterSubscription = web3.eth.subscribe("latestBlock");
//      this._ethFilterSubscription.watch(this.onBlockMined);
//      console.log("[END] subscribing filter...");
      

/*
I subscribed to the event but it was not working. The callback was never called. Then I found out that I needed to activate the WebSockets server (--ws and similar in geth).
Found it in this Ethereum Stack Exchange Post


https://github.com/ethereum/web3.js/issues/989
*/


/*
//      this._blockchainLogsSubscription =
//          web3.eth.subscribe(
//              'logs'                                 ,
//               { address: instanceAddress }          ,
//               this.onContractStateChangeSubscribed  );
//
//      this._blockchainLogsSubscription =
//          this._blockchainLogsSubscription
//              .on("data" , this.onContractStateChanged)
//              .on("error", this.onContractStateError  );
*/



    }
    catch (error)
    {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    } // catch

  }; // componentDidMount


  performSplit = async () =>
  {

     console.log("=== [begin] perform split");
    // TODO: fix hard code

     var submittedTransaction = 
     await this.state.contract.Split(
         this.state.firstReceiverAccountAddress,
         this.state.secondReceiverAccountAddress,
         {
             from: this.state.senderAccountAddress,
             value: 1000000,
             gasPrice: 10000 
         });

     console.log(submittedTransaction);


// this works as event listener too
// commented to test the ```web3.eth.subscribe('pendingTransactions')```
// 
//
//
//     await this.onContractStateChangedImpl();

     console.log("=== [end] perform split"); 

    // the changes will be updated by the log events listener

  }; // runExample

//================= EVENTS ================== //
//========================================== //


  onBlockMined = async (maybeError, maybeBlockData) =>
  {
      console.log("=== onBlockMined");
      await this.onContractStateChangedImpl();
  }

  onTransactionMinedMaybe = async (maybeError, maybeTxHash) =>
  {
      console.log("=== onTransaction - maybe");

      if (maybeTxHash == null)
      {
           console.log(maybeError);
      }
      else
      {
          await this.onTransactionMined(maybeTxHash);
      }
  }


  onTransactionMined = async (txHash) =>
  {
      console.log("=== onTransaction");
      await this.onContractStateChangedImpl();
  }


  onContactStateChangedWatch = async (maybeError, maybeResult) =>
  {
      console.log("===onContractStateChangedWatch");

      console.log(maybeResult);
      console.log(maybeError);

      if (maybeError)
      {
          alert(maybeError);
      }
      else
      {
          await this.onContractStateChangedImpl();
      }
  }

  onContractStateChanged = async (logRecord) =>
  {
      console.log("===onContractStateChanged");
      console.log(logRecord);

      await this.onContractStateChangedImpl();
  }

  onContractStateChangedImpl = async () =>
  {
      console.log("===== onContractStateChangedImpl");

      var web3 = this.state.web3;

      var senderBalance         = await web3.eth.getBalance(this.state.senderAccountAddress         );
      var firstReceiverBalance  = await web3.eth.getBalance(this.state.firstReceiverAccountAddress  );
      var secondReceiverBalance = await web3.eth.getBalance(this.state.secondReceiverAccountAddress );
      var instanceBalance       = await web3.eth.getBalance(this.state.contractAddress              );

      console.log("[BEGIN] setState()");


//      var previousStateDeepCopy = 
//              JSON.parse( JSON.stringify(this.state) );
//      var newState = previousStateDeepCopy;
//
//      newState.senderBalance         = senderBalance        ;
//      newState.firstReceiverBalance  = firstReceiverBalance ;
//      newState.secondReceiverBalance = secondReceiverBalance;
//      newState.contractBalance       = instanceBalance      ;
//
//      this.setState(newState);
      

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
         

      this.setState(
         {
              senderBalance               : senderBalance       ,
              firstReceiverBalance        : firstReceiverBalance,
              secondReceiverBalance       : secondReceiverBalance,
              contractBalance             : instanceBalance
          }
      ); // this.setState()
      
      console.log("[END] setState()");
  }

  onContractStateChangeError = async (error) =>
  {
       console.log("=== blockchain log error");
       console.log(error);

       // TODO: better message or handling
       alert(error);
  }

  onContractStateChangeSubscribed = async (maybeError, maybeResult) =>
  {
      console.log("=== subscribed");
      console.log(maybeResult);
  }


  render()
  {

    console.log("=== render");

    if (!this.state.web3)
    {
        return <div>Loading Web3, accounts, and contract...</div>;

    } // if - no web3


    return (
      <div className="adk Splitter App">
        <h1>Welcome to the excercise ether splitting app</h1>
        <p>When the button is tapped, the transfer should happen</p>
        <h2>Accounts state</h2>


        <table>
        <tbody>
           <tr>
               <th></th>
               <th>Address</th>
               <th>Balance in Wei</th>
               <th>Balance in ether</th>
          </tr>

           <tr>
               <td>Sender</td>
               <td>{this.state.senderAccountAddress}</td>
               <td>{this.state.senderBalance}</td>
               <td>{ this.state.web3.utils.fromWei( this.state.senderBalance, 'ether') }</td>
           </tr>

          <tr>
               <td>First Receiver</td>
               <td>{this.state.firstReceiverAccountAddress}</td>
               <td>{this.state.firstReceiverBalance}</td>
               <td>{ this.state.web3.utils.fromWei( this.state.firstReceiverBalance, 'ether') }</td>
           </tr>

          <tr>
               <td>Second Receiver</td>
               <td>{this.state.secondReceiverAccountAddress}</td>
               <td>{this.state.secondReceiverBalance}</td>
               <td>{ this.state.web3.utils.fromWei( this.state.secondReceiverBalance, 'ether') }</td>
           </tr>



           <tr>
               <td>Contract</td>
               <td>{this.state.contractAddress}</td>
               <td>{this.state.contractBalance}</td>
               <td>{ this.state.web3.utils.fromWei( this.state.contractBalance, 'ether') }</td>
           </tr>

        </tbody>
        </table>


        <p>

             <button onClick={ () => this.performSplit() }  > Split ether  </button>
        </p>

      </div>
    );
  } // render


} // class App

export default App;
