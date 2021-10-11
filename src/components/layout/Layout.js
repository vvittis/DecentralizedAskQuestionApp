import classes from './Layout.module.css'
import React, {Component} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Button from "react-bootstrap/Button";
import NavigationBar from "./Navbar";
import Banner from "./Banner";
import PostSection from "../posts/PostSection";
import Web3 from "web3";
import Blog from "../../abis/Blog.json";


class Layout extends Component {


    async componentWillMount() {

        await this.fetchData()
    }


    async fetchData() {

        if (window.ethereum) {

            window.web3 = new Web3(window.ethereum)
            // } else
            // if (window.web3) {
            // window.web3 = new Web3(window.web3.currentProvider)
            // window.web3 = new Web3(window.ethereum)

            console.log('use effect')
            const web3 = window.web3
            console.log(this.props.account)
            const networkId = await web3.eth.net.getId()
            console.log(networkId.toString())
            const networkData = Blog.networks[networkId]
            console.log(networkData)
            if (networkData) {
                this.setState({loading: false})
                this.setState({postLoading: false})
                const blogPost = new web3.eth.Contract(Blog.abi, networkData.address)
                this.setState({blogPost: blogPost})
                const postCount = await blogPost.methods.postCount().call()
                this.setState({postCount: postCount})
                console.log("Number of Posts: " + this.state.postCount)
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
        this.state.blogPost.methods.createPost(title, content).send({from:this.props.account.toString()})
            .once('receipt', (receipt) => {
                this.fetchData()

                this.setState({postLoading: false})
                console.log(this.state.accountAddress)
            })
    }

    async commentPost(id, content) {
        console.log("uber drifer")
        console.log(id)
        console.log(content)
        this.setState({postLoading: true})
        this.state.blogPost.methods.commentPost(id, content).send({from: this.state.accountAddress})
            .once('receipt', (receipt) => {
                this.fetchData()
                this.setState({postLoading: false})
            })
    }
    async setUserAddress(input){
        console.log("Inside "+input)
        this.setState({accountAddress: input })
        console.log("Here"+ this.state.accountAddress)
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
            postLoading: true
        }

        this.createPost = this.createPost.bind(this)
        this.commentPost = this.commentPost.bind(this)
        this.setUserAddress = this.setUserAddress.bind(this)
    }

    render() {
        return (

            <Container fluid className={classes.container} className={"more-pens"}>
                <NavigationBar userAccount = {this.setUserAddress} account={this.props.account} setAccount={this.props.setAccount}/>
                <Row className={classes.main}>
                    <Col lg={4} className={classes.col4}> <Banner
                        createpost={this.createPost}
                        input={this.props.account}

                    /> </Col>
                    <Col lg={8} className={classes.col8}> <PostSection
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