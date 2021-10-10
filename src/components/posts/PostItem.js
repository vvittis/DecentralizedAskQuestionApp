// import classes from './PostItem.css'
import React, {Component} from 'react'
import {Card, Button} from 'react-bootstrap'
import CardFormatter from "../ui/CardFormatter";
import ImageProfile from "../ui/ImageProfile";
import './PostItem.css'
import $ from 'jquery';

class PostItem extends Component {


    async onClickHandler() {

    }

    async clickListener(input) {

        $('#'.concat(input)).toggleClass('is_animating');


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
                <Card onClick={this.onClickHandler} key={this.props.id}>
                    <Card.Header> <ImageProfile class="image" width={'50'} height={'50'}
                                                account={this.props.author.toString()}/> {this.props.author}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title><strong>{this.props.title} </strong></Card.Title>
                        <Card.Text>
                            {this.props.content}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <span style={mystyle}  onClick={() => this.clickListener("heart".concat(this.props.id))} id={"heart".concat(this.props.id)}>
                            <span className="tooltiptext">TIP 0.1 ETH</span></span>
                        <i className="far fa-comment"/>
                        <div className="numberOfComments"> {this.props.numberOfComments}</div>
                        <button class="buttonComment"> Comment</button>
                    </Card.Footer>
                </Card>

            </CardFormatter>


        )
    }
}

export default PostItem