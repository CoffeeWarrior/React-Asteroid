import React, { Component } from "react";

//ship
import ship from "../../svgs/ship.svg"
import adjustKeyMap from "../../helpers/ship-related/adjustKeyMap"
import updateShipAngle from "../../helpers/ship-related/updateShipAngle"
import drawShip from "../../helpers/ship-related/drawShip"

//asteroid
import asteroid from "../../svgs/asteroid.svg"
import asteroidGenerator from "../../helpers/asteroid-related/asteroidGenerator"
import drawAsteroid from "../../helpers/asteroid-related/drawAsteroid";

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
            shipAngle: 0,
            asteroidIMG: null,
            asteroidLoaded: false,
            asteroidArray: []
        
        }
    }

    
    
    
    //updates the state to reflect movement by wsad and redraws the ship.
    moveShip = () =>{
        let prevState = {...this.state};
        let currentPosition = {...prevState.shipPosition}
        

        if(this.state.keyMap.w){
            currentPosition.y -= 7;
        }

        if(this.state.keyMap.s){
            currentPosition.y += 7;
        }

        if(this.state.keyMap.a){
            currentPosition.x -= 7;
        }

        if(this.state.keyMap.d){
            currentPosition.x += 7;
        }
        this.setState({shipPosition: currentPosition})
        drawShip(this.refs.canvas.getContext('2d'), this.state);
    }

    //draws asteroid and updates its position for next redraw
    //checks if ship is within asteroid range
    updateAsteroid = () => {
        const ctx = this.refs.canvas.getContext('2d');
        //moves every asteroid in the asteroid array
        if(this.state.asteroidLoaded){
            const asteroidArray = [...this.state.asteroidArray]
            for(var i = 0; i < this.state.asteroidArray.length; i++){
                drawAsteroid(ctx, this.state.asteroidArray[i])
                asteroidArray[i].incrementPosition();
                if(asteroidArray[i].insideAsteroid(this.state.shipPosition.x, this.state.shipPosition.y)){
                    clearInterval(this.state.intervalRedraw)

                    //delete below later, was testing positions
                    console.log(`ship: (${this.state.shipPosition.x}, ${this.state.shipPosition.y})`)
                    console.log(`asteroid: (${asteroidArray[i].position.x}, ${asteroidArray[i].position.y})`)
                    //delete below later, was testing hitboxes
                    ctx.fillRect(asteroidArray[i].position.x, asteroidArray[i].position.y,5,5)
                } 
                
            }
            this.setState({asteroidArray: asteroidArray});
        }
    }

    
    //filters out anything that exceeds the width of the canvas
    //this portion does cleanup on the array, doesnt need to be as frequently checked
    decrementAsteroidArray = () => {
        const asteroidArray = [...this.state.asteroidArray]
        const updatedAsteroidArray = asteroidArray.filter(asteroid => {
            let remainInArray = asteroid.position.x < this.refs.canvas.width && asteroid.position.x > 0
            return remainInArray;  
        })
        this.setState({asteroidArray: updatedAsteroidArray});
    }
    

    //function called by setInterval, responsible for redraws of the canvas.
    drawCanvas = () => {
        const ctx = this.refs.canvas.getContext('2d');
        
        ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
        //delete below later, was testing hitboxes
        ctx.fillStyle = "Red"
        ctx.fillRect(this.state.shipPosition.x, this.state.shipPosition.y,5,5)
        
        this.moveShip();
        this.updateAsteroid();
    }
    
    //adds new asteroid objects to asteroidArray 
    incrementAsteroidArray = () => {
        if(this.state.asteroidLoaded){
            const asteroid = asteroidGenerator(this.state.shipPosition, this.refs.canvas.height, this.refs.canvas.width, this.state.asteroidIMG);
            const prevAsteroidArray = [...this.state.asteroidArray]
            prevAsteroidArray.push(asteroid);    
            this.setState({asteroidArray: prevAsteroidArray});
            
        }
    }

    loadAsteroid = () => {
        var img = new Image(50,50);
        img.onload = () => {
            this.setState({asteroidLoaded: true, asteroidIMG: img})
            
            setInterval(this.incrementAsteroidArray, 600);
        }
        img.src = asteroid;
    }

    loadShip = () => {
        var img = new Image(50,50);
        img.onload = () => {
            this.setState({shipIMG: img, shipLoaded: true})
        }
        img.src = ship;
    }


    componentDidMount(){
        const canvas = this.refs.canvas;
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        this.setState({shipPosition: {x: this.refs.canvas.width/2, y: this.refs.canvas.height/2}})
        
        setInterval(this.decrementAsteroidArray, 5000);
        const intervalRedraw = setInterval(this.drawCanvas, 25)
        this.setState({intervalRedraw});
        this.loadShip();
        this.loadAsteroid();    
        window.addEventListener("keydown", (e) => {
            this.setState({keyMap: adjustKeyMap(e, this.state.keyMap)}, () => {
                this.setState({shipAngle: updateShipAngle({...this.state.keyMap})})
            })
        })
        window.addEventListener("keyup", (e) => {
            this.setState({keyMap: adjustKeyMap(e, this.state.keyMap)}, () => {
                this.setState({shipAngle: updateShipAngle({...this.state.keyMap})})
            })
        })
    }

    render(){
        return(
            <div>
            <canvas ref="canvas" style={{boxSizing: "border-box", backgroundColor: "black", padding: "0px"}}></canvas>
            </div>
        )
    }
}


export default Canvas;