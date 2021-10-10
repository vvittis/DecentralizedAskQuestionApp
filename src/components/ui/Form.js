import ImageProfile from "./ImageProfile";
// import classes from "./Form.css";
import React, {Component} from "react";
import './Form.css';

function Form(props) {


    function onClickHandler() {
        var btn = document.querySelector('.button'),
            loader = document.querySelector('.loader'),
            check = document.querySelector('.check');
        loader.classList.add("active");
        // btn.addEventListener("click", function () {
        //     loader.classList.add("active");
        // });

        loader.addEventListener("animationend", function () {
            check.classList.add("active");
        });
    }


    return (

        <div class="writePostContainer">

            <div class="useProfile">
                <ImageProfile class="image" width={'50'} height={'50'} account={props.address.toString()}/>
                <div
                    class={"name"}>{(props.address).toString()}
                </div>
            </div>

            <div class="postInputContainer">
                <textarea rows="3" placeholder={"What's on your mind?"}/>
            </div>
            <button class="button" onClick={onClickHandler}>Post</button>
            <div class="loader">
                <div class="check">
                    <span class="check-one"/>
                    <span class="check-two"/>
                </div>
            </div>
        </div>

    )

}

export default Form