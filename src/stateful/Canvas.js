import React, { Component } from "react";

class Canvas extends Component{
    constructor(props){
        super(props);


        this.state = {
            shipColor: "#66CD00",
            backgroundColor: "#000",
            shipPosition: {
                x: 750,
                y: 350
            }
        }
    }


    drawShip(color, lineWidth){
        
        const ctx = this.refs.canvas.getContext('2d');
        
        let currentX = this.state.shipPosition.x;
        
        let currentY = this.state.shipPosition.y;

        //first line of ship
        
        ctx.beginPath();
        
        ctx.lineWidth = lineWidth;
        
        ctx.strokeStyle = color;
        ctx.moveTo(currentX, currentY);
        currentX -= 32;
        currentY += 16
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        //second line of ship
        ctx.beginPath()
        ctx.lineWidth = lineWidth;
        ctx.moveTo(currentX, currentY)
        currentX += 8;
        currentY -= 16;
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        //third line of ship
        ctx.beginPath()
        ctx.lineWidth = lineWidth;
        ctx.moveTo(currentX, currentY)
        currentX -= 8;
        currentY -= 16;
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        //fourth line of ship
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(this.state.shipPosition.x, this.state.shipPosition.y);
        ctx.stroke();        
    }


    move = (event) =>{
        let prevState = {...this.state};
        let currentPosition = {...prevState.shipPosition}
        const key = event.key

            if(key === "w"){
                currentPosition.y -= 5;
                this.setState({shipPosition: currentPosition})
            }

            if(key === "s"){
                currentPosition.y += 5;
                this.setState({shipPosition: currentPosition})
            }

            if(key === "a"){
                currentPosition.x -= 5;
                this.setState({shipPosition: currentPosition})
            }

            if(key === "d"){
                currentPosition.x += 5;
                this.setState({shipPosition: currentPosition})
            }
                
         
        this.drawShip(this.state.shipColor, 3);
    }

    componentDidMount(){
        
        this.drawShip(this.state.shipColor, 3);

        window.addEventListener("keypress", (e) => {this.move(e)})
        
    }

    render(){
        return(
            <div>
            <canvas ref="canvas" width = "1500px" height = "700px" style={{backgroundColor: `${this.state.backgroundColor}`}}></canvas>
            </div>
        )
    }
}


export default Canvas;