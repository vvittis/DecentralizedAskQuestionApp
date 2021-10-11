import {Component} from "react";
import React from "react";
import classes from "./CommentSection.module.css"
import classes1 from "../posts/PostSection.module.css"
import CommentList from "./CommentList";


class CommentSection extends Component{

    render(){
    return(
        <div className={classes.containerPost}>
            <div className={classes.title}>Answers</div>

                <CommentList
                comments ={this.props.comments}
                />
            <div className={classes1.scrollSection}>
                <span className={classes1.scrollIcon}>
                       <span className={classes1.scrollIconDot}/>
                </span>
            </div>
        </div>
    )
    }

}

export default CommentSection