import ImageProfile from "./ImageProfile";
// import classes from "./FormStyle.css";
import React, {Form, Component} from "react";
import './FormStyle.css';
import $ from 'jquery';
class FormSection extends Component {


    async onClickHandler() {
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

    render() {
        return (
            <div class="outterForm">
                <form class="writePostContainer"
                      onSubmit={(event) => {
                          event.preventDefault()
                          const title = this.titleContent.value
                          const content = this.postContent.value
                          this.titleContent.value = ""
                          this.postContent.value = ""

                          this.props.createPost(title, content)
                      }}
                >

                    <div class="useProfile">
                        <ImageProfile class="image" width={'50'} height={'50'} account={this.props.address.toString()}/>
                        <div
                            class={"name"}>{(this.props.address).toString()}
                        </div>
                    </div>

                    <div class="postInputContainer">
                        <input
                            id="postContent"
                            type="text"
                            ref={(input) => { this.titleContent = input }}
                            className="form-control"
                            placeholder="Add your Title"
                            required />
                        <p>&nbsp;</p>

                    <textarea rows="3"
                              id="postContent"

                              type="text"
                              ref={(textarea) => {
                                  this.postContent = textarea
                              }}
                              className="form-control"
                              placeholder="What's on your mind?"
                              required/>
                    </div>
                    <button type="submit" class="button" onClick={this.onClickHandler}>Post</button>
                    <div class="loader">
                        <div class="check">
                            <span class="check-one"/>
                            <span class="check-two"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

export default FormSection