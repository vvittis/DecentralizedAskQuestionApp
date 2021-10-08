const Blog = artifacts.require('Blog')

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Blog)
  const blog = await Blog.deployed()

}