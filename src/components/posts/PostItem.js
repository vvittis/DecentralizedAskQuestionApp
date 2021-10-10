// import classes from './PostItem.css'
import React from 'react'
import {Card, Button} from 'react-bootstrap'
import CardFormatter from "../ui/CardFormatter";
import ImageProfile from "../ui/ImageProfile";
import './PostItem.css'


function PostItem(props) {

    function onClickHandler() {

    }

    // function clickListener() {
    //     /* when a user clicks, toggle the 'is-animating' class */
    //     var heart = document.querySelector('.heart');
    //     heart.classList.toggle("is_animating");
    //
    // }


    return (
        <CardFormatter>
            <Card onClick={onClickHandler}>
                <Card.Header> <ImageProfile class="image" width={'50'} height={'50'}
                                            account={props.author.toString()}/> {props.author}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {props.content}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {/*<div class="heart" onClick={clickListener} class={props.author}/>*/}
                    <button class="buttonComment"> Comment</button>
                </Card.Footer>
            </Card>

        </CardFormatter>


    )
}

export default PostItem