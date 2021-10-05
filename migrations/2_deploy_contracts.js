const TokenFarm = artifacts.require("TokenFarm");
const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken");

module.exports = async function(deployer, networks, accounts) {  // using async for step by step

  // Deploy Mock Dai Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  // Deploy Mock Dapp Token
  await deployer.deploy(DappToken)
  const dappToken = await DappToken.deployed()


  // deployer.deploy(TokenFarm(dappToken,daiToken));
  // Deploy Token Farm
  await deployer.deploy(TokenFarm,dappToken.address, daiToken.address)
  const tokenFarm = await TokenFarm.deployed()

  // Liquidity Pool -> Add all DappToken into TokenFarm in order to distribute them to all users

  await dappToken.transfer(tokenFarm.address,'1000000000000000000000000')

  // Transfer 100 Mock Dai tokens to investor

  await daiToken.transfer(accounts[1], '100000000000000000000' )

};
