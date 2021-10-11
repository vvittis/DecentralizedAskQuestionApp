import classes from './PostList.module.css'
import PostItem from "./PostItem";
import React, {Component} from 'react'

class PostList extends Component {
    render() {
        return (
            <div className={classes.list}>
                {this.props.children}
                {this.props.posts.map(post => (
                    <PostItem
                        commentClicked={this.props.commentClicked}
                        account={this.props.account}
                        postListCommentPost={this.props.commentPost}
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        tipAmount={post.tipAmount}
                        author={post.author}
                        numberOfComments={post.numberOfComments}
                    />))
                }
            </div>
        )
    }
}

export default PostList;
