import classes from './Banner.module.css'
import React from 'react'
import Typical from 'react-typical';

class Banner extends React.Component {

    render() {
        return (

            <div id={classes.box} className={' p-0 p-sm-5'}>

                <div id={classes.heading} className={' p-0 pt-sm-5'}>

                    A Chat App <br/> where you can
                </div>
                    <div id={classes.type}>
                        <Typical
                            loop={1} // Infinity
                            wrapper={"b"}
                            steps={[' Post', 1000, ' Comment', 1000, ' Interact', 1000]}
                        />
                    </div>
            </div>
        )
    }
}

export default Banner;