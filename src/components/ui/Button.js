import classes from '../ui/Button.module.css'
import React from "react";
function Button(props){
    return (
            <div className={classes.button}>
                {props.children}
            </div>
    )
}

export default Button