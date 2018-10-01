
var BigNumber = require('bignumber.js');
const AdkSplitterForTwo = artifacts.require("./AdkSplitterForTwo.sol");


contract('AdkSplitterForTwo', 
function(accounts)
{

    var _samePerson = accounts[1]; // zero might be coinbase. avoiding that due to balance checks

    var _firstStranger  = accounts[2];
    var _secondStranger = accounts[3];





it("should revert when fallback function is called", 
async function()
{
    var samePerson     = _samePerson    ;
    var firstStranger  = _firstStranger ;
    var secondStranger = _secondStranger;


    var initialSenderBalance         = await web3.eth.getBalance(samePerson    );
    var initialFirstStrangerBalance  = await web3.eth.getBalance(firstStranger );
    var initialSecondStrangerBalance = await web3.eth.getBalance(secondStranger);


    var splitterContractInstance = await AdkSplitterForTwo.deployed();


    var splitterInstanceAddress = await splitterContractInstance.GetContractAddress();
    var initialContractBalance  = await web3.eth.getBalance(splitterInstanceAddress);


        try
        {
	    var splitOpReceipt =
            await splitterContractInstance.sendTransaction(
            {
                from    : samePerson, 
                value   : 2000      ,
                gasPrice: 0
            });


// https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/test/helpers/assertRevert.js
//=====
            assert.fail("expected revert function to terminate the contract");
            return;
       }
       catch (ex)
       {
           var actualSenderBalance         = await web3.eth.getBalance(samePerson    );
           var actualFirstStrangerBalance  = await web3.eth.getBalance(firstStranger );
           var actualSecondStrangerBalance = await web3.eth.getBalance(secondStranger);
           var actualContractBalance       = await web3.eth.getBalance(splitterInstanceAddress);



           assert.deepEqual(
               actualSenderBalance .toString(10),
               initialSenderBalance.toString(10),
               "unexpected sender balance change when split is supposed to do nothing");


           assert.deepEqual(
               actualFirstStrangerBalance.toString(10),
               initialFirstStrangerBalance.toString(10),
               "unexpected first balance change when split is supposed to do nothing");



           assert.deepEqual(
               actualSecondStrangerBalance.toString(10),
               initialSecondStrangerBalance.toString(10),
               "unexpected second balance change when split is supposed to do nothing");

          assert.deepEqual(
               actualContractBalance.toString(10),
               initialContractBalance.toString(10),
               "unexpected contract balance change");

       }

});






it("should revert undividable one wei", 
async function()
{
    var samePerson     = _samePerson    ;
    var firstStranger  = _firstStranger ;
    var secondStranger = _secondStranger;


    var initialSenderBalance         = await web3.eth.getBalance(samePerson    );
    var initialFirstStrangerBalance  = await web3.eth.getBalance(firstStranger );
    var initialSecondStrangerBalance = await web3.eth.getBalance(secondStranger);


        var splitterContractInstance = 
            await AdkSplitterForTwo.deployed();

    var splitterInstanceAddress = await splitterContractInstance.GetContractAddress();
    var initialContractBalance  = await web3.eth.getBalance(splitterInstanceAddress);


        try
        {
	    var splitOpReceipt =
            await splitterContractInstance.Split(
		samePerson,
		samePerson,
            {
                from    : samePerson, 
                value   : 1         ,
                gasPrice: 0
            });


// https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/test/helpers/assertRevert.js
//=====
            assert.fail("expected revert function to terminate the contract");
            return;
       }
       catch (ex)
       {
           var actualSenderBalance         = await web3.eth.getBalance(samePerson    );
           var actualFirstStrangerBalance  = await web3.eth.getBalance(firstStranger );
           var actualSecondStrangerBalance = await web3.eth.getBalance(secondStranger);
           var actualContractBalance       = await web3.eth.getBalance(splitterInstanceAddress);



           assert.deepEqual(
               actualSenderBalance .toString(10),
               initialSenderBalance.toString(10),
               "unexpected sender balance change when split is supposed to do nothing");


           assert.deepEqual(
               actualFirstStrangerBalance.toString(10),
               initialFirstStrangerBalance.toString(10),
               "unexpected first balance change when split is supposed to do nothing");



           assert.deepEqual(
               actualSecondStrangerBalance.toString(10),
               initialSecondStrangerBalance.toString(10),
               "unexpected second balance change when split is supposed to do nothing");


          assert.deepEqual(
               actualContractBalance.toString(10),
               initialContractBalance.toString(10),
               "unexpected contract balance change");


       }

});



it("should revert undividable zero wei", 
async function()
{
    var samePerson     = _samePerson    ;
    var firstStranger  = _firstStranger ;
    var secondStranger = _secondStranger;


    var initialSenderBalance         = await web3.eth.getBalance(samePerson    );
    var initialFirstStrangerBalance  = await web3.eth.getBalance(firstStranger );
    var initialSecondStrangerBalance = await web3.eth.getBalance(secondStranger);



        var splitterContractInstance = 
            await AdkSplitterForTwo.deployed();


    var splitterInstanceAddress = await splitterContractInstance.GetContractAddress();
    var initialContractBalance  = await web3.eth.getBalance(splitterInstanceAddress);


        try
        {
	    var splitOpReceipt =
            await splitterContractInstance.Split(
		samePerson,
		samePerson,
            {
                from    : samePerson, 
                value   : 0         ,
                gasPrice: 0
            });


// https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/test/helpers/assertRevert.js
//=====
            assert.fail("expected revert function to terminate the contract");
            return;
       }
       catch (ex)
       {
           var actualSenderBalance         = await web3.eth.getBalance(samePerson    );
           var actualFirstStrangerBalance  = await web3.eth.getBalance(firstStranger );
           var actualSecondStrangerBalance = await web3.eth.getBalance(secondStranger);
           var actualContractBalance       = await web3.eth.getBalance(splitterInstanceAddress);



           assert.deepEqual(
               actualSenderBalance .toString(10),
               initialSenderBalance.toString(10),
               "unexpected sender balance change when split is supposed to do nothing");


           assert.deepEqual(
               actualFirstStrangerBalance.toString(10),
               initialFirstStrangerBalance.toString(10),
               "unexpected first balance change when split is supposed to do nothing");



           assert.deepEqual(
               actualSecondStrangerBalance.toString(10),
               initialSecondStrangerBalance.toString(10),
               "unexpected second balance change when split is supposed to do nothing");

          assert.deepEqual(
               actualContractBalance.toString(10),
               initialContractBalance.toString(10),
               "unexpected contract balance change");


       }

});













    it("should create no transactions if all users are same", 
    async function()
    {
       var samePerson = _samePerson;

        var initialBalance = await web3.eth.getBalance(samePerson);


        var splitterContractInstance = 
            await AdkSplitterForTwo.deployed();


    var splitterInstanceAddress = await splitterContractInstance.GetContractAddress();
    var initialContractBalance  = await web3.eth.getBalance(splitterInstanceAddress);


       
        try
        {
	    var splitOpReceipt =
            await splitterContractInstance.Split(
		samePerson,
		samePerson,
            {
                from : samePerson, 
                value: 2000      ,
                gasPrice: 0
            });


// https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/test/helpers/assertRevert.js
//=====
            assert.fail("expected revert function to terminate the contract");
            return;
       }
       catch (ex)
       {
           var actualBalance = await web3.eth.getBalance(samePerson);
           var actualContractBalance = await web3.eth.getBalance(splitterInstanceAddress);



           assert.deepEqual(
               actualBalance .toString(10),
               initialBalance.toString(10),
               "unexpected balance change when split is supposed to do nothing");


          assert.deepEqual(
               actualContractBalance.toString(10),
               initialContractBalance.toString(10),
               "unexpected contract balance change");


       }

        // ??? revert ==> no transaction ==> no events
        // no transaction object to get tx.logs  from
        //
	// assert.fail("[debug] force fail to see the events log");

    });




it("should give equal shares to strangers", async function()
{
    var samePerson     = accounts[4]    ;
    var firstStranger  = _firstStranger ;
    var secondStranger = _secondStranger;


    var initialSenderBalance         = await web3.eth.getBalance(samePerson    );
    var initialFirstStrangerBalance  = await web3.eth.getBalance(firstStranger );
    var initialSecondStrangerBalance = await web3.eth.getBalance(secondStranger);

    var gasPriceWei   = 10000;
    var weiToSplit    = 2000 ;
    var strangerShare = 1000 ;


    var splitterContractInstance = await AdkSplitterForTwo.deployed();

    var splitterInstanceAddress = await splitterContractInstance.GetContractAddress();
    var initialContractBalance  = await web3.eth.getBalance(splitterInstanceAddress);



    var splitTransactionReceipt = null;
    try
    {
        var splitTransactionReceipt =
        await splitterContractInstance.Split(
            firstStranger,
            secondStranger,
         {
             from    : samePerson ,
             value   : weiToSplit ,
             gasPrice: gasPriceWei
         });
    }
    catch (ex)
    {
        console.log(ex);
        assert.fail("unexpected exception generated by the contract");

        return;
    }


    var splitTransactionHash = splitTransactionReceipt.tx;
    var splitTransaction = await web3.eth.getTransaction(splitTransactionHash);

    var gasUsed_bn  = new BigNumber(splitTransactionReceipt.receipt.gasUsed);
    var gasPrice_bn = new BigNumber(gasPriceWei);

    var minerReward_bn = gasUsed_bn.multipliedBy(gasPrice_bn);


    var expectedSenderBalance         = initialSenderBalance.minus(weiToSplit).minus(minerReward_bn);
    var expectedFirstStrangerBalance  = initialFirstStrangerBalance.plus(strangerShare);
    var expectedSecondStrangerBalance = initialSecondStrangerBalance.plus(strangerShare);


    var actualSenderBalance         = await web3.eth.getBalance(samePerson    );
    var actualFirstStrangerBalance  = await web3.eth.getBalance(firstStranger );
    var actualSecondStrangerBalance = await web3.eth.getBalance(secondStranger);
    var actualContractBalance       = await web3.eth.getBalance(splitterInstanceAddress);


    assert.deepEqual(actualSenderBalance        .toString(10), expectedSenderBalance        .toString(10), "sender balance mismatch"         );
    assert.deepEqual(actualFirstStrangerBalance .toString(10), expectedFirstStrangerBalance .toString(10), "first stranger balance mismatch" );
    assert.deepEqual(actualSecondStrangerBalance.toString(10), expectedSecondStrangerBalance.toString(10), "second stranger balance mismatch");

          assert.deepEqual(
               actualContractBalance.toString(10),
               initialContractBalance.toString(10),
               "unexpected contract balance change");



    var events = splitTransactionReceipt.logs;
    assert.equal(6, events.length);

    assert.equal(events[0].event, "LogBeginSplit");
    assert.equal(events[1].event, "LogTransferToFirstReceiverBegin");
    assert.equal(events[2].event, "LogTransferToFirstReceiverEnd");
    assert.equal(events[3].event, "LogTransferToSecondReceiverBegin");
    assert.equal(events[4].event, "LogTransferToSecondReceiverEnd");
    assert.equal(events[5].event, "LogEndSplit");

    // assert.fail("[debug] force fail to see the events log");

});


it("should give equal shares to strangers -- odd amount", async function()
{
    var samePerson     = _samePerson    ;
    var firstStranger  = _firstStranger ;
    var secondStranger = _secondStranger;


    var initialSenderBalance         = await web3.eth.getBalance(samePerson    );
    var initialFirstStrangerBalance  = await web3.eth.getBalance(firstStranger );
    var initialSecondStrangerBalance = await web3.eth.getBalance(secondStranger);

    var weiToSplit    = 15;
    var strangerShare = 7 ;


    var splitterContractInstance = await AdkSplitterForTwo.deployed();

    var splitterInstanceAddress = await splitterContractInstance.GetContractAddress();
    var initialContractBalance  = await web3.eth.getBalance(splitterInstanceAddress);
    var actualContractBalance       = await web3.eth.getBalance(splitterInstanceAddress);



    var splitTransactionReceipt = null;
    try
    {
        var splitTransactionReceipt =
        await splitterContractInstance.Split(
            firstStranger,
            secondStranger,
         {
             from    : samePerson ,
             value   : weiToSplit ,
             gasPrice: 0
         });
    }
    catch (ex)
    {
        console.log(ex);
        assert.fail("unexpected exception generated by the contract");

        return;
    }



    var expectedSenderBalance         = initialSenderBalance.minus(2 * strangerShare);
    var expectedFirstStrangerBalance  = initialFirstStrangerBalance.plus(strangerShare);
    var expectedSecondStrangerBalance = initialSecondStrangerBalance.plus(strangerShare);


    var actualSenderBalance         = await web3.eth.getBalance(samePerson    );
    var actualFirstStrangerBalance  = await web3.eth.getBalance(firstStranger );
    var actualSecondStrangerBalance = await web3.eth.getBalance(secondStranger);
    var actualContractBalance       = await web3.eth.getBalance(splitterInstanceAddress);



    assert.deepEqual(actualSenderBalance        .toString(10), expectedSenderBalance        .toString(10), "sender balance mismatch"         );
    assert.deepEqual(actualFirstStrangerBalance .toString(10), expectedFirstStrangerBalance .toString(10), "first stranger balance mismatch" );
    assert.deepEqual(actualSecondStrangerBalance.toString(10), expectedSecondStrangerBalance.toString(10), "second stranger balance mismatch");

          assert.deepEqual(
               actualContractBalance.toString(10),
               initialContractBalance.toString(10),
               "unexpected contract balance change");


    var events = splitTransactionReceipt.logs;
    assert.equal(8, events.length);

    assert.equal(events[0].event, "LogBeginSplit");
    assert.equal(events[1].event, "LogTransferToFirstReceiverBegin");
    assert.equal(events[2].event, "LogTransferToFirstReceiverEnd");
    assert.equal(events[3].event, "LogTransferToSecondReceiverBegin");
    assert.equal(events[4].event, "LogTransferToSecondReceiverEnd");
    assert.equal(events[5].event, "LogTransferChangeToSenderBegin");
    assert.equal(events[6].event, "LogTransferChangeToSenderEnd");
    assert.equal(events[7].event, "LogEndSplit");

    // assert.fail("[debug] force fail to see the events log");

});





it("should make only one transaction if first receiver is same as sender", async function()
{
    var samePerson     = accounts[5]    ;
    var firstStranger  = samePerson     ;
    var secondStranger = _secondStranger;


    var weiToSplit    = 2000 ;
    var strangerShare = 1000 ;


    var initialSenderBalance         = await web3.eth.getBalance(samePerson    );
    var initialFirstStrangerBalance  = await web3.eth.getBalance(firstStranger );
    var initialSecondStrangerBalance = await web3.eth.getBalance(secondStranger);


    var splitterContractInstance = await AdkSplitterForTwo.deployed();

    var splitterInstanceAddress = await splitterContractInstance.GetContractAddress();
    var initialContractBalance  = await web3.eth.getBalance(splitterInstanceAddress);



    var splitTransactionReceipt = null;
    try
    {
        var splitTransactionReceipt =
        await splitterContractInstance.Split(
            firstStranger,
            secondStranger,
         {
             from    : samePerson ,
             value   : weiToSplit ,
             gasPrice: 0
         });
    }
    catch (ex)
    {
        console.log(ex);
        assert.fail("unexpected exception generated by the contract");

        return;
    }


    var expectedFirstStrangerBalance  = initialFirstStrangerBalance.minus(strangerShare);
    var expectedSenderBalance         = expectedFirstStrangerBalance;
    var expectedSecondStrangerBalance = initialSecondStrangerBalance.plus(strangerShare);


    var actualSenderBalance         = await web3.eth.getBalance(samePerson    );
    var actualFirstStrangerBalance  = await web3.eth.getBalance(firstStranger );
    var actualSecondStrangerBalance = await web3.eth.getBalance(secondStranger);
    var actualContractBalance       = await web3.eth.getBalance(splitterInstanceAddress);



    assert.deepEqual(actualSenderBalance        .toString(10), expectedSenderBalance        .toString(10), "sender balance mismatch"         );
    assert.deepEqual(actualFirstStrangerBalance .toString(10), expectedFirstStrangerBalance .toString(10), "first stranger balance mismatch" );
    assert.deepEqual(actualSecondStrangerBalance.toString(10), expectedSecondStrangerBalance.toString(10), "second stranger balance mismatch");


          assert.deepEqual(
               actualContractBalance.toString(10),
               initialContractBalance.toString(10),
               "unexpected contract balance change");


    var events = splitTransactionReceipt.logs;
    assert.equal(6, events.length);

    assert.equal(events[0].event, "LogBeginSplit");
    assert.equal(events[1].event, "LogTransferToFirstReceiverBegin");
    assert.equal(events[2].event, "LogTransferToFirstReceiverEnd");
    assert.equal(events[3].event, "LogTransferToSecondReceiverBegin");
    assert.equal(events[4].event, "LogTransferToSecondReceiverEnd");
    assert.equal(events[5].event, "LogEndSplit");

    // assert.fail("[debug] force fail to see the events log");

});




it("should make only one transaction if second receiver is same as sender", async function()
{
    var samePerson     = accounts[6]    ;
    var firstStranger  = _firstStranger ;
    var secondStranger = samePerson     ;


    var weiToSplit    = 2000 ;
    var strangerShare = 1000 ;


    var initialSenderBalance         = await web3.eth.getBalance(samePerson    );
    var initialFirstStrangerBalance  = await web3.eth.getBalance(firstStranger );
    var initialSecondStrangerBalance = await web3.eth.getBalance(secondStranger);


    var splitterContractInstance = await AdkSplitterForTwo.deployed();

    var splitterInstanceAddress = await splitterContractInstance.GetContractAddress();
    var initialContractBalance  = await web3.eth.getBalance(splitterInstanceAddress);




    var splitTransactionReceipt = null;
    try
    {
        var splitTransactionReceipt =
        await splitterContractInstance.Split(
            firstStranger,
            secondStranger,
         {
             from    : samePerson ,
             value   : weiToSplit ,
             gasPrice: 0
         });
    }
    catch (ex)
    {
        console.log(ex);
        assert.fail("unexpected exception generated by the contract");

        return;
    }


    var expectedFirstStrangerBalance  = initialFirstStrangerBalance.plus(strangerShare);
    var expectedSecondStrangerBalance = initialSecondStrangerBalance.minus(strangerShare);
    var expectedSenderBalance         = expectedSecondStrangerBalance;


    var actualSenderBalance         = await web3.eth.getBalance(samePerson    );
    var actualFirstStrangerBalance  = await web3.eth.getBalance(firstStranger );
    var actualSecondStrangerBalance = await web3.eth.getBalance(secondStranger);
    var actualContractBalance       = await web3.eth.getBalance(splitterInstanceAddress);



    assert.deepEqual(actualSenderBalance        .toString(10), expectedSenderBalance        .toString(10), "sender balance mismatch"         );
    assert.deepEqual(actualFirstStrangerBalance .toString(10), expectedFirstStrangerBalance .toString(10), "first stranger balance mismatch" );
    assert.deepEqual(actualSecondStrangerBalance.toString(10), expectedSecondStrangerBalance.toString(10), "second stranger balance mismatch");


          assert.deepEqual(
               actualContractBalance.toString(10),
               initialContractBalance.toString(10),
               "unexpected contract balance change");




    var events = splitTransactionReceipt.logs;
    assert.equal(6, events.length);

    assert.equal(events[0].event, "LogBeginSplit");
    assert.equal(events[1].event, "LogTransferToFirstReceiverBegin");
    assert.equal(events[2].event, "LogTransferToFirstReceiverEnd");
    assert.equal(events[3].event, "LogTransferToSecondReceiverBegin");
    assert.equal(events[4].event, "LogTransferToSecondReceiverEnd");
    assert.equal(events[5].event, "LogEndSplit");

    // assert.fail("[debug] force fail to see the events log");

});





}); // contract

