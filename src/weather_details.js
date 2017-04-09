import React from 'react';
import sunny from './oliver_svg/sunny.svg';
import moon from './oliver_svg/moon-9.svg';
import fewCloud from './oliver_svg/clouds-1.svg';
import nightCloud from './oliver_svg/cloudy-night.svg';
import clouds from './oliver_svg/clouds.svg';
import raining from './oliver_svg/raindrops.svg';
import nightRaining from './oliver_svg/night-rain.svg';
import lightDayRain from './oliver_svg/summer-rain.svg';
import lightNightRain from './oliver_svg/weather.svg';
import dayStorm from './oliver_svg/storm.svg';
import nightStorm from './oliver_svg/storm-2.svg';
import daySnow from './oliver_svg/snowing-1.svg';
import nightSnow from './oliver_svg/night-snow.svg';
import hazeMist from './oliver_svg/tide-1.svg';
import sunrise from './oliver_svg/sunrise.svg';
import sunset from './oliver_svg/sunset-1.svg';

const icon_svg = {
  '01d': sunny,
  '01n': moon,
  '02d': fewCloud,
  '02n': nightCloud,
  '03d': clouds,
  '03n': clouds,
  '04d': clouds,
  '04n': clouds,
  '09d': raining,
  '09n': nightRaining,
  '10d': lightDayRain,
  '10n': lightNightRain,
  '11d': dayStorm,
  '11n': nightStorm,
  '13d': daySnow,
  '13n': nightSnow,
  '50d': hazeMist,
  '50n': hazeMist
}

const WeatherDetails = ({temp, weather, icon, sunrise, sunset}) => {

  return (
    <div>
      <p> <img alt={weather} className='weatherIcon' src={icon_svg[icon]} /><br/>{weather}</p>
      <p>{temp}&deg;</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
    </div>
  );
};

export default WeatherDetails;
