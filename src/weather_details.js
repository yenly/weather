import React from 'react';

const WeatherDetails = ({temp, weather, sunrise, sunset}) => {

  return (
    <div>
      <p>{temp}</p>
      <p>{weather}</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
    </div>
  );
};

export default WeatherDetails;
