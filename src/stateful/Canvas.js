import React, { Component } from "react";
import ship from "../stateless/shipDrawing.svg"
class Canvas extends Component{
    constructor(props){
        super(props);


        this.state = {
            shipColor: "#66CD00",
            backgroundColor: "#000",
            shipPosition: {
                x: 750,
                y: 350
            },
            keyMap : {
                w: false,
                s: false,
                a: false,
                d: false
            }
        }
    }

    //draws the ship. Used as a utility function by other this.move()
    drawShip(color, lineWidth){
        //need to move image outside of function, so it doesnt reload every time!
        const ctx = this.refs.canvas.getContext('2d');
        
        var img = new Image(50,50);
        img.onload = () => {
            ctx.drawImage(img, this.state.shipPosition.x, this.state.shipPosition.y);
        }
        img.src = ship;
    }

    //updates the state to reflect movement by wsad and redraws the ship.
    move = () =>{
        let prevState = {...this.state};
        let currentPosition = {...prevState.shipPosition}


            if(this.state.keyMap.w){
                currentPosition.y -= 5;
                this.setState({shipPosition: currentPosition})
            }

            if(this.state.keyMap.s){
                currentPosition.y += 5;
                this.setState({shipPosition: currentPosition})
            }

            if(this.state.keyMap.a){
                currentPosition.x -= 5;
                this.setState({shipPosition: currentPosition})
            }

            if(this.state.keyMap.d){
                currentPosition.x += 5;
                this.setState({shipPosition: currentPosition})
            }
                
         
        this.drawShip(this.state.shipColor, 2);
    }

    //function called by setInterval, responsible for redraws of the canvas.
    drawCanvas = () => {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

        this.move();
        
    }

    //updates keymap in state, will set boolean values to true or false on keydown and keyup 
    adjustKeyMap(event){
        if(event.type === "keydown"){
            const keyMap = {...this.state.keyMap}
            switch(event.key){
                case "w":
                    keyMap.w = true;
                    break;
    
                case "s":
                    keyMap.s = true;
                    break;
        
                case "a":
                    keyMap.a = true;
                    break;
                
                case "d":
                    keyMap.d = true;
                    break;
                default:
            }
            this.setState({keyMap: keyMap})

        }else if(event.type === "keyup"){        
            const keyMap = {...this.state.keyMap}
            switch(event.key){
                case "w":
                    keyMap.w = false;
                    break;

                case "s":
                    keyMap.s = false;
                    break;
        
                case "a":
                    keyMap.a = false;
                    break;
                
                case "d":
                    keyMap.d = false;
                    break;
                default:
            }
            this.setState({keyMap: keyMap})
        
        }
    }

    componentDidMount(){
        setInterval(this.drawCanvas, 25)

        window.addEventListener("keydown", (e) => {this.adjustKeyMap(e)})
        window.addEventListener("keyup", (e) => {this.adjustKeyMap(e)})
    }

    render(){
        return(
            <div>
            <canvas ref="canvas" width = "1500px" height = "700px" style={{backgroundColor: `${this.state.backgroundColor}`}}></canvas>
            <img src={ship}></img>
            </div>
        )
    }
}


export default Canvas;