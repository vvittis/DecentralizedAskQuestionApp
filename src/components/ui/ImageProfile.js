import Identicon from "identicon.js";
import React from "react";

function ImageProfile (props){
    return(

        <img
            className='ml-2'
            width={props.width || '20'}
            height={props.height || '20'}
            src={`data:image/png;base64,${new Identicon(props.account, 15).toString()}`}
            alt={""}/>

    )
}
export default ImageProfile;