import React, { Component } from 'react';
import './App.css';
import  { OwmApiKey } from './keys';
import WeatherDetails from './weather_details';
import sunrise from './oliver_svg/sunrise.svg';
import sunset from './oliver_svg/sunset-1.svg';
import fah from './oliver_svg/farenheit.svg';
import cel from './oliver_svg/celsius.svg';
import styled from 'styled-components';
import leImage from './images/landsend.jpg';
import { media } from './style-utils';

const OWM_API_KEY = OwmApiKey.apiKey;
const owmUrl = `https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?&appid=${OWM_API_KEY}`;
// lat=%s&lon=%s&

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  vertical-align: baseline;
  height: 100vh;
  background-image: linear-gradient(69deg, rgba(235, 129, 106, 0.8) 50%, rgba(239, 168, 124, 0.5)), url(${leImage});
  background-size: cover, cover;
  background-repeat: no-repeat, no-repeat;
  background-position: enter center, top left;
`;

const Card = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.45098) 0rem 1.13rem 4.125rem 0rem;
  width: 50%;
  height: auto;
  border-radius: 0.625rem;
  background: #000;
  opacity: .75;
  text-align: center;
  background-image: linear-gradient(180deg, #78909C 0%, #37474F);
  color: #fff;
  ${ media.handheld`
    width: 100%;
  `}
`;

const Temperature = styled.article`
  font-size: 4rem;
`;

const Sol = styled.article`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: .8rem;
`;

const Sunrise = styled.span`
  display: inline-block;
  background-image: url(${sunrise});
  background-repeat: no-repeat;
  background-position: left middle;
  padding: 5px 0 0 28px;
  margin-right: 20px;
`;

const Sunset = styled.span`
  display: inline-block;
  background-image: url(${sunset});
  background-repeat: no-repeat;
  background-position: left middle;
  padding: 5px 0 0 28px;
`;

const Button = styled.button`
  font-size: 2rem;
  cursor: pointer;
  height: 50px;
  width: 50px;
  background-image: ${props => props.primary ? `url(${cel})` : `url(${fah})`} ;
  background-color: transparent;
  border: none;
`;



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
        },
        // todo: need to read country code and set tempMetric accordingly
        tempMetric: 'F'
      });
    }
    catch(ex) {
      console.error(url, ex);
    }
  }

  // todo: Change to use moments.js
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

  handleClick = (e) => {
    e.preventDefault();
    if(this.state.tempMetric === 'F') {
      this.setState({tempMetric: 'C'})
    } else {
      this.setState({tempMetric: 'F'})
    }
  }

  displayTemp = () => {
    if(this.state.tempMetric === 'F') {
      return <div>{this.convertToF(this.state.weatherData.tempInfo)}<sup>&deg;F</sup> <Button primary onClick={this.handleClick} /></div>
    } else {
      return <div>{this.convertToC(this.state.weatherData.tempInfo)}<sup>&deg;C</sup> <Button onClick={this.handleClick} /></div>
    }
  }

  render() {
    if(!this.state.weatherData) return <div>Loading...</div>

    return (
      <Wrapper>
        <Card>
          <h2>{this.state.weatherData.cityName}</h2>
          <WeatherDetails
            weather={this.state.weatherData.weather.description}
            icon={this.state.weatherData.weather.icon}
          />
          <Temperature>
            {this.displayTemp()}
          </Temperature>
          <Sol>
            <Sunrise>{this.getLocalTime(this.state.weatherData.sunrise)}</Sunrise>
            <Sunset>{this.getLocalTime(this.state.weatherData.sunset)}</Sunset>
          </Sol>
        </Card>
      </Wrapper>
    );
  }
}

export default App;
