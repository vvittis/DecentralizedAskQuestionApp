import classes from './PostSection.module.css'
import React, {Component, useEffect} from 'react'
import Web3 from 'web3';
import {Container, Col, FloatingLabel, FormControl, Row} from 'react-bootstrap'
import CardFormatter from "../ui/CardFormatter";
import Blog from '../../abis/Blog.json'
import PostList from "./PostList";
import NavigationBar from "../layout/Navbar";
import Banner from "../layout/Banner";
import Form from "../ui/Form";


class PostSection extends Component<{ account?: string }> {

    async componentWillMount() {
        await this.fetchData()
    }

    constructor(props) {
        super(props)
        this.state = {
            userConnected: false,
            blogPost: null,
            postCount: 0,
            posts: [],
            loading: true
        }

        // this.createPost = this.createPost.bind(this)
        // this.tipPost = this.tipPost.bind(this)
    }

    async fetchData() {

        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            // } else if (window.web3) {
            //     window.web3 = new Web3(window.web3.currentProvider)
            // }
            console.log('use effect')
            const web3 = window.web3
            const networkId = await web3.eth.net.getId()
            console.log(networkId.toString())
            const networkData = Blog.networks[networkId]
            console.log(networkData)
            if (networkData) {
                const blogPost = new web3.eth.Contract(Blog.abi, networkData.address)
                this.setState({blogPost})
                const postCount = await blogPost.methods.postCount().call()
                this.setState({postCount})
                console.log("Number of Posts: " + postCount)
                // Load Posts
                for (var i = 1; i <= postCount; i++) {
                    const post = await blogPost.methods.posts(i).call()
                    this.setState({
                        posts: [...this.state.posts, post]
                    })
                }
                // Sort posts. Show highest tipped posts first
                this.setState({
                    posts: this.state.posts.sort((a, b) => b.tipAmount - a.tipAmount)
                })
                this.setState({loading: false})
            }
        }
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
                                        <Form address={this.props.input}/>
                                    }
                                    <PostList  posts={this.state.posts}/>

                                </Col>
                                <Col lg={6}> </Col>
                            </Row>
                        </Container>

                    )

                }
            </div>
        )
    }
}

export default PostSection