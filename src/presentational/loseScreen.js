import React from "react";

const LoseScreen = (props) => {
    return(
        <div onClick={props.onClick}>
            <div style={
                {backgroundColor: "white", color: "black", position: "absolute", 
                top:"50%", left:"50%", transform: "translate(-50%, -50%)", 
                width:"15rem", height:"6rem",  zIndex: "25", textAlign: "center",
                borderRadius: "5px", fontFamily: '"Press Start 2P", cursive'}}>
                <p>You lose.</p><p> Click anywhere to play another</p>    
            </div>    
            
            <div style={{width: "100vw", height: "100vh", backgroundColor: "black", opacity: ".5", position: "absolute", top:"0", left:"0"}}></div>
        </div>
    )
}

export default LoseScreen