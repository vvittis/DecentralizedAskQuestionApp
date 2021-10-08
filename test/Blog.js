const Blog = artifacts.require('Blog')

require('chai').use(require('chai-as-promised')).should()

contract('Blog', (accounts) => {

    let blog;
    before(async () => {
        blog = await Blog.deployed()
    })
    describe('deployment', async () => {
        // check the returned address


        it('deploys successfully', async () => {
            const blogAddress = await blog.address
            assert.notEqual(blogAddress, 0x0) // not zero address
            assert.notEqual(blogAddress, '')
            assert.notEqual(blogAddress, null)
            assert.notEqual(blogAddress, undefined)
        })

        it('has value', async () => {
            const name = await blog.value()
            assert.equal(name, 5)
        })
    })


})