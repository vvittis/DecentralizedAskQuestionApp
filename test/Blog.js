const Blog = artifacts.require('./Blog.sol')

require('chai').use(require('chai-as-promised')).should()

contract('Blog', ([deployer, author, commentator,tipper]) => {

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
    });


    describe('posts', async () => {
        let result, postCount;
        before(async () => {
            await blog.createPost('This is my first post', {from: author})

            result = await blog.createPost('This is my second post', {from: author})
            postCount = await blog.postCount()
            // await blog.createPost('', {from: author})

        })
        it('creates posts', async () => {
            assert.equal(postCount, 2);
        })

    });

    describe('comments', async () => {
        let result, commentCount;
        before(async () => {
            await blog.createPost('This is my first post', {from: author})
            await blog.commentPost(1, "This is my first comment to the first post ", {from: commentator})
            result = await blog.commentPost(1, "This is my second comment to the first post", {from: deployer})
            await blog.commentPost(2, "This is my first comment to the second post", {from: deployer})


        })
        it('comment posts', async () => {
            // console.log(blog.posts[1])
            // console.log(blog.comments[1][1])
            // console.log(blog.comments[1][2])
            const event = result.logs[0].args
            assert.equal(event.content, "This is my second comment to the first post", "Comment is ok ")
        })

        it('list posts', async () => {
            const post1 = await blog.posts(1)
            const post2 = await blog.posts(2)
            console.log("Post 1 " + post1.numberOfComments.toNumber())
            console.log("Post 2 " + post2.numberOfComments.toNumber())
        })

    });

    describe('tips', async () => {
        let result, commentCount;
        before(async () => {
            await blog.createPost('This is my first post', {from: author})
            await blog.commentPost(1, "This is my first comment to the first post ", {from: commentator})
        })
        it('tip posts', async () => {
            let result, oldAuthorBalance;
            oldAuthorBalance = await web3.eth.getBalance(author)
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

            result = await blog.tipPost(1, { from: tipper, value: web3.utils.toWei('1', 'Ether') })
            const event = result.logs[0].args
            assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')

            let newAuthorBalance
            newAuthorBalance = await web3.eth.getBalance(author)
            newAuthorBalance = new web3.utils.BN(newAuthorBalance)
        })


    });


})