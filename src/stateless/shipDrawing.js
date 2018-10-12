import React from "react";

Ship = (props) => {
    return (
        <svg height="500" width="500">
        <polygon points="250,0 500,500 250,375 0,500"
        style={{fill:`${props.fillColor}`, stroke:`${props.strokeColor}`, strokeWidth: `${props.strokeWidth}`, fillRule: "nonzero"}} />
    </svg>
    )
}