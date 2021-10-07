import classes from './Banner.module.css'
import React from 'react'
import Typewriter from "typewriter-effect";

class  Banner extends React.Component {

    render() {
        return (

            <div className={classes.box}>

                <div id={classes.heading} className={'p-0 p-sm-5'}>

                    Chat App where you can <br></br>
                    <Typewriter
                    onInit={(typewriter => {
                        typewriter.typeString("Post")
                            .pause(2000)
                            .deleteAll()
                            .typeString("Comment")
                            .pause(2000)
                            .deleteAll()
                            .typeString("Like")
                            .start()
                    })}
                    />

                </div>
            </div>
        )
    }
}
export default Banner;