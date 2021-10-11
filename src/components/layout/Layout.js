import classes from './Layout.module.css'
import React, {Component} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import NavigationBar from "./Navbar";
import Banner from "./Banner";
import PostSection from "../posts/PostSection";
import Web3 from "web3";
import Blog from "../../abis/Blog.json";

const easABI = require("../../abis/EAS.json");
const easAddress = "0xBf49E19254DF70328C6696135958C94CD6cd0430";
export const CHAINID = 1;
const usernameUUID =
    "0x905ec5d9ea1aa3b8f5b42ce85ee7c72d6265ff1fa9b4a9aebe5f6716e1fefeb1";

class Layout extends Component {


    async componentWillMount() {
        await this.fetchData()
    }


    async fetchData() {

        if (window.ethereum) {
            console.log("Inisde Eth")
            window.web3 = new Web3(window.ethereum)
            // } else
            // if (window.web3) {
            // window.web3 = new Web3(window.web3.currentProvider)
            // window.web3 = new Web3(window.ethereum)
            const web3 = window.web3
            const networkId = await web3.eth.net.getId()
            console.log(networkId)
            const networkData = Blog.networks[networkId]
            console.log(networkData)
            if (networkData) {
                this.setState({loading: false})
                this.setState({postLoading: false})

                const blogPost = new web3.eth.Contract(Blog.abi, networkData.address)
                console.log("Hi")
                console.log(blogPost)
                this.setState({blogPost: blogPost})
                console.log(this.state.blogPost)
                const postCount = await blogPost.methods.postCount().call()
                this.setState({postCount: postCount})
                // Load Posts
                this.setState({posts: []})
                for (var i = 1; i <= postCount; i++) {
                    const post = await blogPost.methods.posts(i).call()
                    this.setState({
                        posts: [...this.state.posts, post]
                    })
                }
                // Sort posts. Show highest tipped posts first
                this.setState({
                    posts: this.state.posts.sort((a, b) => b.id - a.id)
                })
                this.setState({loading: false})
            }

        }

    }

    async createPost(title, content) {
        this.setState({postLoading: true})
        this.state.blogPost.methods.createPost(title, content).send({from: this.props.account.toString()})
            .once('receipt', (receipt) => {
                this.fetchData()
                this.setState({postLoading: false})
                console.log(this.state.accountAddress)
            })
    }

    async commentPost(id, content) {
        this.setState({postLoading: true})
        this.setState({commentLoading: true})
        this.state.blogPost.methods.commentPost(id, content).send({from: this.state.accountAddress})
            .once('receipt', (receipt) => {
                this.fetchData()
                this.setState({commentLoading: false})
                this.setState({postLoading: false})
            })
    }

    async setUserAddress(input) {
        this.setState({accountAddress: input})
    }

    async likePost(postid, author) {
        console.log(postid)
        console.log(author)
        console.log(this.props.account.toString())
        console.log("Inside likePost")
    }

    constructor(props) {
        super(props)
        this.state = {
            accountAddress: '',
            userConnected: false,
            blogPost: null,
            postCount: 0,
            posts: [],
            loading: true,
            commentLoading: false,
            postLoading: true
        }

        this.createPost = this.createPost.bind(this)
        this.commentPost = this.commentPost.bind(this)
        this.setUserAddress = this.setUserAddress.bind(this)
        this.likePost = this.likePost.bind(this)
    }

    render() {
        return (

            <Container fluid className={classes.container}>
                <NavigationBar userAccount={this.setUserAddress} account={this.props.account}
                               setAccount={this.props.setAccount}/>
                <Row className={classes.main}>
                    <Col lg={4} className={classes.col4}> <Banner
                        createpost={this.createPost}
                        input={this.props.account}

                    /> </Col>
                    <Col lg={8} className={classes.col8}> <PostSection
                        likePost={this.likePost}
                        commentLoading={this.state.commentLoading}
                        blogPost={this.state.blogPost}
                        account={this.props.account}
                        loading={this.state.loading}
                        postLoading={this.state.postLoading}
                        postSectionPosts={this.state.posts}
                        commentPost={this.commentPost}
                        input={this.props.account}/> </Col>
                </Row>

                <footer id="sticky-footer" className="flex-shrink-0 py-4 bg-dark text-white-50">
                    <div className="container text-center">
                        <small>Copyright &copy; billvittis.eth</small>
                    </div>
                </footer>

            </Container>

        )
    }
}

export default Layout