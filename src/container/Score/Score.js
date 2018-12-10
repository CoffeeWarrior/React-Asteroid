import React, {Component} from "react";

class Score extends Component {
    constructor(props){
        super(props)
        this.state = {
            elapsed: 0,
            start: null,
            timerID: null
        }
    }

    start = () => {
        const timerID = setInterval(this.tick, 100)
        this.setState({start: new Date, timerID: timerID})
    }

    componentDidMount = () => {
        this.start();
    }

    componentWillUnmount = () => {
        clearInterval(this.state.timerID)
    }

    componentDidUpdate(){
        if( !this.state.timerID && !this.props.lost){
            this.start();
        }
    }
    

    tick = () => {
        const elapsed = new Date() - this.state.start;
        if(this.props.lost){
            clearInterval(this.state.timerID)
            this.setState({timerID: null})
        }
        this.setState({elapsed: elapsed})
    }

    render(){
    
        return(
            <h1 style={{zIndex: "2", position: "absolute", top: "1rem", fontFamily: '"Press Start 2P", cursive', left: "1.5rem", color: "white"}}>SCORE: {(Math.floor(this.state.elapsed/100) * 100).toFixed(0)}</h1>
        )
    }
}


export default Score;