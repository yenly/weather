import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: 90.0,
      long: 0.0
    }

    // Checks if geolocation exist, then get lat and long to store in state.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
      });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Lat: {this.state.lat}, Long: {this.state.long}
        </p>
      </div>
    );
  }
}

export default App;
