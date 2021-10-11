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


class PostSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentShow: false
        };
        this.onClickHandler = this.onClickHandler.bind(this)
    }

    async onClickHandler() {
        this.setState({commentShow: !this.state.commentShow})
        console.log(this.state.commentShow)
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

                {this.props.loading ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
                    :
                    (<Container fluid className={classes.containerFluid}>

                        <Row className={classes.rowFinder}>

                            <Col className={classes.containerPost}>


                                {this.props.postLoading ?
                                    <div id="loader" className="text-center mt-5"><p>Loading Posts...</p></div> :
                                    <div className={classes.containerPost}>
                                        <div className={classes.title}>Posts</div>
                                        <PostList commentClicked={this.onClickHandler}
                                                  account={this.props.account}
                                                  commentPost={this.props.commentPost}
                                                  posts={this.props.postSectionPosts}/>
                                        <div className={classes.scrollSection}>
                                                                <span className={classes.scrollIcon}>
                                                                       <span className={classes.scrollIconDot}/>
                                                                </span>
                                        </div>
                                    </div>
                                }
                            </Col>
                            <Col>
                                {!this.state.commentShow ? <h1> No comments</h1> : <h1> Comments</h1>}

                            </Col>
                        </Row>
                    </Container>)}
            </div>

        )
    }
}

export default PostSection