import React, { Component } from 'react';
import DrawableCanvas from 'react-drawable-canvas';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      brushColor: '#800909',
      lineWidth: 2,
      canvasStyle: {
        backgroundColor: '#00FFDC',
      },
      clear: false,
    };
  }

  handleOnClickClear() {
    this.setState({
      clear: true,
    });
  }

  handleOnSubmit() {
    const a = document.getElementsByTagName('canvas')[0];
    console.log(a);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Handwriting Recognition</h1>
        </header>
        <div style={{ width: 256, height: 256 }}>
          <DrawableCanvas {...this.state} />
          <input type="button" value="Predict" onClick={() => this.handleOnSubmit()} />
          <input type="button" value="Clear" onClick={() => this.handleOnClickClear()} />
        </div>
      </div>
    );
  }
}

export default App;
