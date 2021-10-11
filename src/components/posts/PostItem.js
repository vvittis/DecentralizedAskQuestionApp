import React, {Component} from 'react'
import {Card} from 'react-bootstrap'
import CardFormatter from "../ui/CardFormatter";
import ImageProfile from "../ui/ImageProfile";
import './PostItem.css'
import $ from 'jquery';
import AddCommentModal from "../comments/AddCommentModal";

class PostItem extends Component {

    async clickListener(input) { $('#'.concat(input)).toggleClass('is_animating');   }

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            postid: this.props.id
        };
        this.clickHandler = this.clickHandler.bind(this)

    }
    async clickHandler(){
        this.props.commentClicked(this.props.id)
    }
    render() {
        const mystyle = {
            float: 'left',
            display: 'inline-block',
            cursor: 'pointer',
            height: '40px',
            width: '40px',
            backgroundImage: `url("https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '2900%',
            scale: '2'
        };

        return (
            <CardFormatter>

                <Card key={this.props.id}>
                    <Card.Header> <ImageProfile className="image" width={'50'} height={'50'}
                                                account={this.props.author.toString()}/> {this.props.author}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title><strong>{this.props.title} </strong></Card.Title>
                        <Card.Text>
                            {this.props.content}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {!this.props.account ? <div/> :
                            <span style={mystyle} onClick={() => {
                                this.clickListener("heart".concat(this.props.id))
                                this.props.likePost(this.props.id,this.props.author)

                            }}
                                  id={"heart".concat(this.props.id)}>
                           </span>
                        }
                        <div className="numberOfComments" onClick={this.clickHandler}> <i className="far fa-comment"/> {this.props.numberOfComments}</div>

                        <>
                            {!this.props.account? <div/>:
                            <button onClick={() => this.setState({modalShow: true})} className="buttonComment"> Answer
                            </button>
                                }
                            <AddCommentModal
                                asnwerbutton={this.clickHandler}
                                postitemcommentpost={this.props.postListCommentPost}
                                postid = {this.props.id}
                                show={this.state.modalShow}
                                post={this.props.content}
                                onHide={() => {
                                    this.setState({modalShow: false})
                                }}
                            />
                        </>
                    </Card.Footer>
                </Card>

            </CardFormatter>


        )
    }
}

export default PostItem