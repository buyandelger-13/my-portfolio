import React, { useState, useEffect } from 'react';
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiStrongWind,
  WiFog,
} from 'react-icons/wi';
import './styles.css';

// const API_KEY = 'YOUR_API_KEY_HERE';
// const LOCATION = 'Fairfield,IA';
// const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&appid=${API_KEY}&units=imperial`;

const mockData: WeatherData = {
  temperature: 95,
  condition: 'Clouds',
  message: 'Today is a hot day. Stay cool.',
};

interface WeatherData {
  temperature: number;
  condition: string; // "Clear", "Clouds"
  // location: string;
  message?: string; 
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // const response = await fetch(API_URL);
        // if (!response.ok) {
        //   throw new Error('Weather data not found. Check your API key or location.');
        // }
        // const data = await response.json();

        // Set the state with the relevant data from the API response
        // setWeather({
        //   temperature: Math.round(data.main.temp),
        //   condition: data.weather[0].main, // e.g., "Clouds", "Clear"
        //   // location: data.name,
        // });
        setWeather(mockData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      }
    };

    fetchWeatherData();
  }, []); 

  const getWeatherIcon = (condition: string) => {
    let icon;
    let animationClass = '';

    switch (condition) {
      case 'Clear':
        icon = <WiDaySunny />;
        animationClass = 'sun-animation';
        break;
      case 'Clouds':
        icon = <WiCloudy />;
        animationClass = 'cloud-animation';
        break;
      case 'Rain':
      case 'Drizzle':
      case 'Mist':
        icon = <WiRain />;
        animationClass = 'rain-animation';
        break;
      case 'Snow':
        icon = <WiSnow />;
        animationClass = 'bob-animation';
        break;
      case 'Thunderstorm':
        icon = <WiThunderstorm />;
        animationClass = 'storm-animation';
        break;
      case 'Wind':
        icon = <WiStrongWind />;
        animationClass = 'wind-animation';
        break;
      case 'Fog':
      case 'Haze':
        icon = <WiFog />;
        animationClass = 'cloud-animation';
        break;
      default:
        icon = <WiDaySunny />;
        animationClass = 'sun-animation';
    }
    return { icon, animationClass };
  };

  if (error) {
    return <div className="weather-widget error">{error}</div>;
  }

  if (!weather) {
    return <div className="weather-widget loading">Fetching the weather... ☀️</div>;
  }

  const { icon, animationClass } = getWeatherIcon(weather.condition);

  return (
    <div className="weather-widget">
      <div className={`main-icon ${animationClass}`}>{icon}</div>
      <h1 className="temperature">{weather.temperature}°F</h1>
      <h2 className="condition">{weather.condition}</h2>
      {/* <p className="location">{weather.location}</p> */}
    </div>
  );
};

export default Weather;