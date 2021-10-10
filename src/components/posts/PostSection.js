import classes from './PostSection.module.css'
import React, {Component, useEffect} from 'react'
import Web3 from 'web3';
import {Container, Col, FloatingLabel, FormControl, Row} from 'react-bootstrap'
import CardFormatter from "../ui/CardFormatter";
import Blog from '../../abis/Blog.json'
import PostList from "./PostList";
import NavigationBar from "../layout/Navbar";
import Banner from "../layout/Banner";
import FormSection from "../ui/FormSection";


class PostSection extends Component<> {

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
            try {
                this.setState({accountAddress: this.props.input.toString})
            } catch (e) {
                console.log("no account yet")
            }


            console.log('use effect')
            const web3 = window.web3
            this.setState({accountAddress: this.props.input})
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
        this.state.blogPost.methods.createPost(title, content).send({from: this.props.input.toString()})
            .once('receipt', (receipt) => {
                this.fetchData()
                this.setState({postLoading: false})
            })

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
        // this.tipPost = this.tipPost.bind(this)
    }

    render() {

        return (

            <div className={classes.background}>
                <div className={classes.cube}/>
                <div className={classes.cube}/>
                <div className={classes.cube}/>
                <div className={classes.cube}/>
                <div className={classes.cube}/>
                <div className={classes.cube}/>

                {this.state.loading ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
                    :
                    (<Container fluid className={classes.containerFluid}>

                        <Row className={classes.rowFinder}>
                            <Col lg={6} className={classes.containerPost}>

                                {!this.props.input ? <div/>
                                    :
                                    <FormSection createPost={this.createPost} address={this.props.input}/>
                                }
                                {this.state.postLoading ?
                                    <div id="loader" className="text-center mt-5"><p>Loading Posts...</p></div> :
                                    <div className={classes.containerPost}>
                                        <div className={classes.title}>Posts</div>
                                        <PostList posts={this.state.posts}/>
                                        <div className={classes.scrollSection}>
                                                                <span className={classes.scrollIcon}>
                                                                       <span className={classes.scrollIconDot}/>
                                                                </span>
                                        </div>
                                    </div>
                                }
                            </Col>
                            <Col lg={6}> </Col>
                        </Row>
                    </Container>)}
            </div>

        )
    }
}

export default PostSection