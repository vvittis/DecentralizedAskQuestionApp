import classes from './CommentList.module.css'
import React, {Component} from 'react'
import CommentItem from "./CommentItem";

class CommentList extends Component {
    render() {
        return (
            <div className={classes.list}>
                {this.props.children}
                {this.props.comments.map(comment => (
                    <CommentItem
                        commentid={comment.commentid}
                        author={comment.author}
                        content={comment.content}
                    />))
                }
            </div>
        )
    }
}

export default CommentList;
