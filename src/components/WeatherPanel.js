import React, {useState} from 'react';
import Form from './Form';

const WeatherPanel = () => {
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");

  // URL base para la API de clima
  const baseWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
  const baseForecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
  const apiKey = "0b31641f40706d2a4f2b58a732f083df";
  const language = "es";

  //funcion que realiza la llamada a la api
  const getLocation = async(location) => {
    setLoading(true);
    setLocation(location);
    
    const weatherUrl = `${baseWeatherUrl}?q=${location}&appid=${apiKey}&lang=${language}`;
    const forecastUrl = `${baseForecastUrl}?q=${location}&appid=${apiKey}&lang=${language}`;

    try {
      // Obtener datos del clima
      const weatherResponse = await fetch(weatherUrl);
      if(!weatherResponse.ok) throw new Error(`Error fetching weather data: ${weatherResponse.statusText}`);
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
      console.log(weatherData);

      // Obtener datos de la previsión
      const forecastResponse  = await fetch(forecastUrl);
      if (!forecastResponse.ok) throw new Error(`Error fetching forecast data: ${forecastResponse.statusText}`);
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
      console.log(forecastData);
      
       // Mostrar tarjeta con datos
      setShow(true);
    } catch (error) {
      console.error(error);
      setShow(false);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <React.Fragment>
      <Form newLocation = {getLocation}/>
    </React.Fragment>
  )
}

export default WeatherPanel