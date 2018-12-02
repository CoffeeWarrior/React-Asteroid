import React from "react";

const LoseScreen = () => {
    return(
        <div>
            <div style={
                {backgroundColor: "white", color: "black", position: "absolute", 
                top:"50%", left:"50%", transform: "translate(-50%, -50%)", 
                width:"10vw", height:"10vh",  zIndex: "25", textAlign: "center",
                borderRadius: "5px" }}>
                <p position="absolute" top="50%">You lose! <br/> refresh the page to enter another quarter</p>    
            </div>    
            
            <div style={{width: "100vw", height: "100vh", backgroundColor: "black", opacity: ".5", position: "absolute", top:"0", left:"0"}}></div>
        </div>
    )
}

export default LoseScreen