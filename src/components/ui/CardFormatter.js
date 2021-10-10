import classes from "./Card.module.css"
import React from 'react'

function CardFormatter(props) {
    return (
        <div className={classes.card}>
            {props.children}
        </div>
    )


}

export default CardFormatter