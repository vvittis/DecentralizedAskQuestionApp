import classes from './Banner.module.css'
import React, {Component} from 'react'
import Typical from 'react-typical';
import FormSection from "../ui/FormSection";

class Banner extends Component {

    render() {
        return (

            <div id={classes.box} className={' p-0 p-sm-5'}>

                <div id={classes.heading} className={' p-0 pt-sm-5'}>

                    An Ask Question App <br/> where you can
                </div>
                    <div id={classes.type}>
                        <Typical
                            loop={Infinity} // Infinity
                            wrapper={"b"}
                            steps={['Ask', 1000, 'Answer', 1000, 'Like', 1000]}
                        />
                    </div>
                {!this.props.input ? <div/>
                    :
                    <FormSection createPost={this.props.createpost} address={this.props.input}/>
                }
            </div>
        )
    }
}

export default Banner;