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
      result: [],
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
      const shorted = [];
      for (const key in result.data.result_v) {
        shorted.push([key, result.data.result_v[key]]);
      }
      shorted.sort((a, b) => b[1] - a[1]);
      this.setState({ result: shorted });
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
          <Result result={this.state.result} />
        </div>
      </div>
    );
  }
}

export default App;
