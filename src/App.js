import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '04344e63961e06fd8488c74833dce7c7';
  const city = 'Toronto';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [city, apiKey]);

  if (!weatherData) {
    return <div className="loading">Loading...</div>;
  }

  const getIconUrl = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}.png`;

  return (
    <div className="weather-container">
      <h1>{weatherData.name}</h1>
      <div className="weather-info">
        <p>{weatherData.weather[0].description}</p>
        <img src={getIconUrl(weatherData.weather[0].icon)} alt="Weather Icon" />
        <p>Temperature: {weatherData.main.temp} K</p>
        <p>Feels Like: {weatherData.main.feels_like} K</p>
        <p>Min Temperature: {weatherData.main.temp_min} K</p>
        <p>Max Temperature: {weatherData.main.temp_max} K</p>
        <p>Pressure: {weatherData.main.pressure} hPa</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Visibility: {weatherData.visibility} meters</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        <p>Wind Direction: {weatherData.wind.deg} degrees</p>
        <p>Cloudiness: {weatherData.clouds.all}%</p>
        <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default App;

