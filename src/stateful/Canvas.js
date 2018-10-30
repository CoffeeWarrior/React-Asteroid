import React, { Component } from "react";
import ship from "../stateless/shipDrawing.svg"
class Canvas extends Component{
    constructor(props){
        super(props);


        this.state = {
            backgroundColor: "#000",
            shipPosition: {
                x: 0,
                y: 0
            },
            keyMap : {
                w: false,
                s: false,
                a: false,
                d: false
            },
            shipIMG : null,
            shipLoaded: false,
            planeAngle : 0
        }
    }

    
    

    //draws the ship. Used as a utility function by other this.move()
    drawShip(){
        const ctx = this.refs.canvas.getContext('2d');
        if(this.state.shipLoaded){

            // ctx.rotate(20 * Math.PI / 180);
            //commented will cause spinning, need to adjust the canvas angle outside of 
            ctx.drawImage(this.state.shipIMG, this.state.shipPosition.x, this.state.shipPosition.y)
        }

        
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
        
        this.drawShip();
    }

    //function called by setInterval, responsible for redraws of the canvas.
    drawCanvas = () => {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(-this.refs.canvas.width/2, this.refs.canvas.height/2, this.refs.canvas.width/2, this.refs.canvas.height/2);

        this.move();
        
    }

    //updates keymap in state, will set boolean values to true or false on keydown and keyup 
    adjustKeyMap(event){
        let directionChange = true;
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
                    directionChange = false;
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
                    directionChange = false;
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
        const ctx = this.refs.canvas.getContext('2d');
        ctx.translate(750, 325);
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