import React, { Component } from 'react';
import DrawableCanvas from 'react-drawable-canvas';
import './App.css';
import Result from './components/Result/Result';

const axios = require('axios');

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
      resultJSON: {},
    };
  }

  handleOnClickClear() {
    this.setState({
      clear: true,
    });
  }

  handleOnSubmit() {
    const canvasObj = document.getElementsByTagName('canvas')[0];
    const img = canvasObj.toDataURL('image/png');
    axios({
      method: 'post',
      url: '/predict/',
      data: img,
    }).then((result) => {
      this.setState({ resultJSON: result.data.result_v });
    });
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
          <Result resultJSON={this.state.resultJSON} />
        </div>
      </div>
    );
  }
}

export default App;
