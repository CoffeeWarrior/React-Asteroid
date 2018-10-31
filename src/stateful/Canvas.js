import React, { Component } from "react";
import ship from "../stateless/shipDrawing.svg"
class Canvas extends Component{
    constructor(props){
        super(props);


        this.state = {
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
            },
            shipIMG : null,
            shipLoaded: false,
            shipAngle: 0
        }
    }

    
    

    //draws the ship. Used as a utility function by other this.move()
    drawShip(){
        const ctx = this.refs.canvas.getContext('2d');
        if(this.state.shipLoaded){
            ctx.save(); 
 
            // move the origin to 50, 35   
            ctx.translate(this.state.shipPosition.x, this.state.shipPosition.y); 
            
            // now move across and down half the 
            // width and height of the image (which is 128 x 128)
            ctx.translate(25,25); 
            
            // rotate around this point
            ctx.rotate(this.state.shipAngle * Math.PI/180); 
            
            // then draw the image back and up
            ctx.drawImage(this.state.shipIMG, -25, -25); 
            
            // and restore the co-ordinate system to its default
            // top left origin with no rotation
            ctx.restore();
            // ctx.rotate(20 * Math.PI / 180);
            //commented will cause spinning, need to adjust the canvas angle outside of 
            //ctx.drawImage(this.state.shipIMG, this.state.shipPosition.x, this.state.shipPosition.y)
        }

        
    }


    //updates the state to reflect movement by wsad and redraws the ship.
    move = () =>{
        let prevState = {...this.state};
        let currentPosition = {...prevState.shipPosition}
        

        if(this.state.keyMap.w){
            currentPosition.y -= 5;
        }

        if(this.state.keyMap.s){
            currentPosition.y += 5;
        }

        if(this.state.keyMap.a){
            currentPosition.x -= 5;
        }

        if(this.state.keyMap.d){
            currentPosition.x += 5;
        }
        this.setState({shipPosition: currentPosition})
        this.drawShip();
    }

    //function called by setInterval, responsible for redraws of the canvas.
    drawCanvas = () => {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

        this.move();
        
    }

    //updates keymap in state, will set values to true or false on keydown and keyup 
    //change setState to return values, find where to update state elsewhere and move to adjustKeyMap.js
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
                    break;
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


    setShip = () => {
        var img = new Image(50,50);
        img.onload = () => {
            this.setState({shipIMG: img, shipLoaded: true})
        }
        img.src = ship;
    }

    componentDidMount(){
        setInterval(this.drawCanvas, 25)
        this.setShip();
        window.addEventListener("keydown", (e) => {this.adjustKeyMap(e)})
        window.addEventListener("keyup", (e) => {this.adjustKeyMap(e)})
    }

    render(){
        return(
            <div>
            <canvas ref="canvas" height = "750" width = "1500"  style={{backgroundColor: `${this.state.backgroundColor}`}}></canvas>
            </div>
        )
    }
}


export default Canvas;