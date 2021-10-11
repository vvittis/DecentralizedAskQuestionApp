import React, {Component} from 'react'
import {Card} from 'react-bootstrap'
import CardFormatter from "../ui/CardFormatter";
import ImageProfile from "../ui/ImageProfile";
import '../posts/PostItem.css'

class CommentItem extends Component {


    render() {


        return (
            <CardFormatter>
                {this.props.commentid}
                <Card key={this.props.commentid}>
                    <Card.Header>
                        <ImageProfile className="image" width={'50'} height={'50'}
                                                account={this.props.author.toString()}/>{this.props.author}
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {/*{this.props.commentid}*/}
                            {this.props.content}
                        </Card.Text>
                    </Card.Body>

                </Card>

            </CardFormatter>


        )
    }
}

export default CommentItem