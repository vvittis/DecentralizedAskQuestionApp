import classes from './PostSection.module.css'
import React, {Component} from 'react'
import {Container, Col, Row} from 'react-bootstrap'
import PostList from "./PostList";
// import CommentSection from '../comments/CommentSection'
import CommentList from "../comments/CommentList";

// import classes1 from "./PostSection.module.css";


class PostSection extends Component {

    async componentWillMount() {
        if (this.props.commentLoading) {
            console.log(this.props.commentLoading)
        }
    }


    async onClickHandler(postId) {
        // this.state.postid = postId

        this.setState({commentShow: true})

        this.setState({postid: postId}, async function () {
            const post = await this.props.blogPost.methods.posts(this.state.postid).call()

            this.setState({commentsLength: post.numberOfComments}, async function () {

                this.setState({comments: []})
                for (var i = 1; i <= this.state.commentsLength; i++) {
                    const comment = await this.props.blogPost.methods.getComment(post.id, i).call();
                    this.setState({
                        comments: [...this.state.comments, comment]
                    })
                }
                console.log(this.state.comments)
            })

        })

    }

    constructor(props) {
        super(props);
        this.state = {
            commentShow: false,
            commentsLength: 0,
            postid: 0,
            comments: []
        }

        this.onClickHandler = this.onClickHandler.bind(this)
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

                {this.props.loading ? <div id="loader" className="text-center mt-5"><p>Loading Posts...</p></div>
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
                            <Col className={classes.containerPost}>
                                {this.props.commentLoading ? <div> Loading Comments...</div> :
                                    <>
                                        {!this.state.commentShow ? <div/> :
                                            <div className={classes.containerPost}>
                                                <div className={classes.title}>Answers</div>

                                                <CommentList
                                                    comments={this.state.comments}
                                                />
                                                <div className={classes.scrollSection}>
                                    <span className={classes.scrollIcon}>
                                    <span className={classes.scrollIconDot}/>
                                    </span>
                                                </div>
                                            </div>

                                        }
                                    </>
                                }


                            </Col>
                        </Row>
                    </Container>)}
            </div>

        )
    }
}

export default PostSection