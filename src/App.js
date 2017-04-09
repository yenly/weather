import React, { Component } from 'react';
import './App.css';
import  { OwmApiKey } from './keys';
import WeatherDetails from './weather_details';
import sunrise from './oliver_svg/sunrise.svg';
import sunset from './oliver_svg/sunset-1.svg';

const OWM_API_KEY = OwmApiKey.apiKey;
const owmUrl = `http://api.openweathermap.org/data/2.5/weather?&appid=${OWM_API_KEY}`;
// lat=%s&lon=%s&

class App extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      tempMetric: null
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
    const url = `${owmUrl}&lat=${lat}&lon=${long}`
    try {
      let res = await fetch(url);
      let weatherData = await res.json();
      // console.log(weather_data);
      // fetch from api and only save relevant data to state
      this.setState({
        weatherData: {
          cityName: weatherData.name,
          tempInfo: weatherData.main.temp,
          weather: weatherData.weather[0],
          sunrise: weatherData.sys.sunrise,
          sunset: weatherData.sys.sunset
        }
      });
    }
    catch(ex) {
      console.error(url, ex);
    }
  }

  // take UTC timestamp and convert to Local time
  getLocalTime = (timestamp) => {
    let localTime = new Date(timestamp * 1000);
    return localTime.toLocaleTimeString();
  }

  // convert kelvin to fahrenheit
  convertToF = (kTemp) => {
    return Math.floor((( kTemp - 273.15) * 9/5) + 32);
  }

  // convert kelvin to celsius
  convertToC = (kTemp) => {
    return Math.floor(kTemp - 273.15);
  }

  render() {
    if(!this.state.weatherData) return <div>Loading...</div>

    return (
      <div className="App">
        <div className="weatherDial">
          <h2>{this.state.weatherData.cityName}</h2>
          <WeatherDetails
            weather={this.state.weatherData.weather.description}
            icon={this.state.weatherData.weather.icon}
          />
          <h2>{this.convertToF(this.state.weatherData.tempInfo)}&deg; F / C</h2>
          <p>Sunrise: {this.getLocalTime(this.state.weatherData.sunrise)}</p>
          <p>Sunset: {this.getLocalTime(this.state.weatherData.sunset)}</p>
        </div>
      </div>
    );
  }
}

export default App;
