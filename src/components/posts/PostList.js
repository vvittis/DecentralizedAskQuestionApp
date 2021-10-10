import classes from './PostList.module.css'
import PostItem from "./PostItem";
import React from 'react'

function PostList(props) {
    return (
        <div className={classes.list}>

            {props.children}

            {props.posts.map(post => (
                <PostItem
                    id={post.id}
                    content={post.content}
                    tipAmount={post.tipAmount}
                    author={post.author}
                    numberOfComments={post.numberOfComments}
                />))}


        </div>)
}

export default PostList;
