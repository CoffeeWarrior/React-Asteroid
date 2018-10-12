import React, { Component } from 'react';
import Canvas from "./stateful/Canvas";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas color="red"></Canvas>
      </div>
    );
  }
}

export default App;
