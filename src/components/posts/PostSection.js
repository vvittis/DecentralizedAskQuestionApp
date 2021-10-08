import classes from './PostSection.module.css'
import React from 'react'
import {FloatingLabel, FormControl} from 'react-bootstrap'
import Card from "../ui/Card";

function PostSection() {
    return (

        <div className={classes.background}>
            <div className={classes.cube}/>
            <div className={classes.cube}/>
            <div className={classes.cube}/>
            <div className={classes.cube}/>
            <div className={classes.cube}/>
            <div className={classes.cube}/>
            <Card>
                <div id={classes.form} class={"p-0 p-sm-5"}>
                    <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
                        <FormControl as="textarea" placeholder="Leave a comment here"/>
                    </FloatingLabel>
                </div>
            </Card>
            Hi
        </div>
    )
}

export default PostSection