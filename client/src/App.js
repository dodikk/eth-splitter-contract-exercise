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
      web3        : null,
      accounts    : null,
      contract    : null,
      senderAccountAddress        : null,
      firstReceiverAccountAddress : null,
      secondReceiverAccountAddress: null,
      firstReceiverBalance        : null,
      secondReceiverBalance       : null,
      senderBalance               : null,
      contractAddress : null,
      contractBalance : null
  };



  componentDidMount = async () =>
  {
    try
    {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(AdkSplitterForTwo);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();
      const instanceAddress = await instance.GetContractAddress();

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
          },

          this.runExample
      );
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


  runExample = async () =>
  {


/*
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.set(5, { from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.get();

    // Update state with the result.
    this.setState({ storageValue: response.toNumber() });
*/

  }; // runExample



  render()
  {

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

      </div>
    );
  } // render


} // class App

export default App;
