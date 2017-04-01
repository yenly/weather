import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  { OwmApiKey } from './keys';

const OWM_API_KEY = OwmApiKey.apiKey;
const owm_url = `http://api.openweathermap.org/data/2.5/weather?&appid=${OWM_API_KEY}`;
// lat=%s&lon=%s&

class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: 90.0,
      long: 0.0,
      weather_data: {}
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
    if(this.state.lat !== 90.0 || this.state.long !== 0.0) {
      this._getLocalWeatherData();
    } else {
      console.log('Loading...');
    }
  }

  async _getLocalWeatherData() {
    const url = `${owm_url}&lat=${this.state.lat}&lon=${this.state.long}`
    try {
      let res = await fetch(url);
      let weather_data = await res.json();
      console.log(weather_data);
      // fetch from api and only save relevant data to state
      this.setState({
        weather_data: {
          city_name: weather_data.name,
          weather: weather_data.weather,
          sunrise: weather_data.sys.sunrise,
          sunset: weather_data.sys.sunset
        }
      });
      console.log(this.state.weather_data);
    }
    catch(ex) {
      console.error(url, ex);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Lat: {this.state.lat}, Long: {this.state.long}<br />
          {OWM_API_KEY}

        </p>
      </div>
    );
  }
}

export default App;
