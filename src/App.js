import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  { OwmApiKey } from './keys';
import WeatherDetails from './weather_details';

const OWM_API_KEY = OwmApiKey.apiKey;
const owm_url = `http://api.openweathermap.org/data/2.5/weather?&appid=${OWM_API_KEY}`;
// lat=%s&lon=%s&

class App extends Component {
  constructor() {
    super();
    this.state = {
      weather_data: null
    }

    // Checks if geolocation exist, call api with lat & long.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this._getLocalWeatherData(position.coords.latitude, position.coords.longitude);
      });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
    // console.log(this.state)
  }

  componentDidMount() {

    // this._getLocalWeatherData();
  }

  async _getLocalWeatherData(lat, long) {
    const url = `${owm_url}&lat=${lat}&lon=${long}`
    try {
      let res = await fetch(url);
      let weather_data = await res.json();
      console.log(weather_data);
      // fetch from api and only save relevant data to state
      this.setState({
        weather_data: {
          city_name: weather_data.name,
          temp_info: weather_data.main.temp,
          weather: weather_data.weather[0],
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
    if(!this.state.weather_data) return <div>Loading...</div>

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.state.weather_data.city_name}</h2>
        </div>
        <div className="App-intro">
          <WeatherDetails
            temp={this.state.weather_data.temp_info}
            weather={this.state.weather_data.weather.description}
            sunrise={this.state.weather_data.sunrise}
            sunset={this.state.weather_data.sunset}
          />
        </div>
      </div>
    );
  }
}

export default App;
