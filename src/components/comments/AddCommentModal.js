import React, {Component} from "react";
import {Modal, Button, Form} from "react-bootstrap";

class AddCommentModal extends Component {

    render() {

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Help Other by Answering their Questions
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h5>The Question is:</h5>
                    <h6>{this.props.post}</h6>
                    <Form
                        onSubmit={(event) => {
                            event.preventDefault()
                            const postId = this.props.postid
                            const content = this.answerContent.value
                            // console.log(postId.toNumber(),content.toString())
                            this.props.postItemCommentPost(postId, content)
                        }}>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            {this.props.postid}
                            <div className="postInputContainer">
                                <textarea
                                    id="postContent"
                                    rows="3"
                                    type="text"
                                    ref={(textarea) => {
                                        this.answerContent = textarea
                                    }}
                                    className="form-control"
                                    placeholder="What is your Answer?"
                                    required/>
                            </div>
                        </Form.Group>
                        <Modal.Footer>
                            <Button type="submit" onClick={this.props.onHide}>Answer</Button>
                        </Modal.Footer>
                    </Form>

                </Modal.Body>

            </Modal>
        );
    }
}

export default AddCommentModal;

