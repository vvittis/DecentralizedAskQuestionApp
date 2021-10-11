import ImageProfile from "./ImageProfile";
import React, {Component} from "react";
import './FormStyle.css';
class FormSection extends Component {


    async onClickHandler() {
        var loader = document.querySelector('.loader'),
            check = document.querySelector('.check');
        loader.classList.add("active");
        loader.addEventListener("animationend", function () {
            check.classList.add("active");
        });


    }

    render() {
        return (
            <div className="outterForm">
                <form className="writePostContainer"
                      onSubmit={(event) => {
                          event.preventDefault()
                          const title = this.titleContent.value
                          const content = this.postContent.value
                          this.titleContent.value = ""
                          this.postContent.value = ""
                          this.props.createPost(title, content)
                      }}
                >
                    <div className="useProfile">
                        <ImageProfile className="image" width={'50'} height={'50'} account={this.props.address.toString()}/>
                        <div
                            className={"name"}>{(this.props.address).toString()}
                        </div>
                    </div>
                    <hr
                        style={{
                            color: 'grey',
                            // backgroundColor: color,
                            height: 5
                        }}
                    />
                    <div className="postInputContainer">
                        <input
                            id="postContent"
                            type="text"
                            ref={(input) => { this.titleContent = input }}
                            className="form-control"
                            placeholder="What is your Question?"
                            required />
                        <p>&nbsp;</p>

                    <textarea rows="3"
                              id="postContent"
                              type="text"
                              ref={(textarea) => {
                                  this.postContent = textarea
                              }}
                              className="form-control"
                              placeholder="Explain what you are looking for..."
                              required/>
                    </div>
                    <button type="submit" className="button" onClick={this.onClickHandler}>Ask</button>
                    <div className="loader">
                        <div className="check">
                            <span className="check-one"/>
                            <span className="check-two"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

export default FormSection