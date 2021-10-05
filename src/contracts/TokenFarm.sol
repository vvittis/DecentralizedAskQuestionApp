pragma solidity >=0.4.21 <0.6.0;
import "./DappToken.sol";
import "./DaiToken.sol";


contract TokenFarm {

	string public name = "Dapp Token Farm"; // state variable -> it will be stored in the blockchain
	DappToken public dappToken;             // address for Dapp Token
	DaiToken  public daiToken;              // address for Dai Token
	address   public owner;
	address[] public stakers;
	mapping(address => uint) public stakingBalance;
	mapping(address => bool) public hasStaked;
	mapping(address => bool) public isStaking;

	constructor (DappToken _dappToken, DaiToken _daiToken) public {
		dappToken = _dappToken;
		daiToken  = _daiToken;
		owner = msg.sender;
	}


	// 1. User Stakes Tokens (Deposit)
	/*
		We essentially want to tranfer Dai Tokens from user's MetaMask Wallet to this smart contract.
	
		transferFrom is a delegite way to transfer assets on behalf of the "investor"
		msg is a global variable in Solidity and corresponds to the message be sent whenever the stakeTokens functions is called
	    sender is the person who calls the function
	    address(this) where this corresponds to the TokenFarm solidity contract -> then we cast the constract into an address
		ex.
			msg.sender is a message sent by the investor  (from)
			address(this) is the address of the TokenFarm (to)
	*/
	function stakeTokens (uint _amount) public {
		// Require amount for staking is greater than 0
		require(_amount > 0 , "amount cannot be 0");

		// Transfer Mock Dai tokens to this contract for staking
		daiToken.transferFrom(msg.sender,address(this), _amount); // address(this) is the App

		// Update Staking Balance
		stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

		// Add users to stakers array *only* if they haven't staked already
		if(!hasStaked[msg.sender]){
			stakers.push(msg.sender);
		}

		// Update staking status
		isStaking[msg.sender] = true;
		hasStaked[msg.sender] = true;

	}

	// 2. Issuing Tokens

	// Give the same amount of Dapp for every Dai token staked
	function issueTokens () public {
		// Only owner can call this function
		require (msg.sender == owner, "caller must be the owner");

		// Issue tokens to all stakers
		for (uint i = 0; i < stakers.length; i++){
			address recipient = stakers[i];
			uint balance = stakingBalance[recipient];
			if(balance > 0 ){
			dappToken.transfer(recipient,balance);
		    } 

		}
	}


	// 3. User Unstakes Tokens (Withdraw)

	function unstakeTokens() public {

		// Fetch amount balance
		uint balance = stakingBalance[msg.sender];
		// Require balance greater than 0
		require(balance > 0 , "balance cannot be less or equal to 0");
		daiToken.transfer(msg.sender, balance);

		stakingBalance[msg.sender] = 0;

		isStaking[msg.sender] = false;

	}
	


}
