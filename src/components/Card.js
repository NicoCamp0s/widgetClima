import React from 'react';
import Spinner from './Spinner';

const Card = ({ loadingData, showData, weather, forecast }) => {
  // Obtener la fecha actual en formato dd/mm/yyyy
  const today = new Date();
  const date = today.toLocaleDateString(); // Simplifica la fecha

  // Base de URL para los iconos del clima
  const baseIconUrl = "http://openweathermap.org/img/w/";

  // Función para formatear la fecha del pronóstico
  const formatForecastDate = (dt_txt) => {
    const [datePart, timePart] = dt_txt.split(' ');
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year} ${timePart.substring(0, 2)}`;
  };

  // Verificar si se están mostrando los datos
  if (loadingData) {
    return <Spinner />;
  }

  if (showData) {
    // Extraer datos
    const { name, main, weather: weatherData, wind, sys } = weather;
    const { list } = forecast;

    // Iconos de clima
    const getIconUrl = (icon) => `${baseIconUrl}${icon}.png`;
    const iconUrl = getIconUrl(weatherData[0].icon);
    const iconUrls = list.slice(1, 4).map(item => getIconUrl(item.weather[0].icon));
    const forecastDates = list.slice(1, 4).map(item => formatForecastDate(item.dt_txt));

    return (
      <div className="mt-5">
        <div className="container">
          <div className="card mb-3 mx-auto bg-dark text-light">
            <div className="row g-0">
              <div className="col-md-4">
                <h3 className="card-title">{name}, {sys.country}</h3> {/* Mostrar el nombre de la ciudad y el país */}
                <p className="card-date">{date}</p>
                <h1 className="card-temp">{(main.temp - 273.15).toFixed(1)}ºC</h1>
                <p className="card-desc">
                  <img src={iconUrl} alt={weatherData[0].description} />
                  {weatherData[0].description}
                </p>
                <img 
                  src="https://images.pexels.com/photos/10817264/pexels-photo-10817264.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                  className="img-fluid rounded-start" 
                  alt="weather background" 
                />
              </div>
              <div className="col-md-8">
                <div className="card-body text-start mt-2">
                  <h5 className="card-text">Temperatura máxima: {(main.temp_max - 273.15).toFixed(1)}ºC</h5>
                  <h5 className="card-text">Temperatura mínima: {(main.temp_min - 273.15).toFixed(1)}ºC</h5>
                  <h5 className="card-text">Sensación térmica: {(main.feels_like - 273.15).toFixed(1)}ºC</h5>
                  <h5 className="card-text">Humedad: {main.humidity}%</h5>
                  <h5 className="card-text">Velocidad del viento: {wind.speed} m/s</h5>
                </div>
                <hr />
                <div className="row mt-4">
                  {forecastDates.map((date, index) => (
                    <div className="col" key={index}>
                      <p>{date} h</p>
                      <p className="description">
                        <img src={iconUrls[index]} alt={forecast.list[index].weather[0].description} />
                        {forecast.list[index].weather[0].description}
                      </p>
                      <p className="temp">{(forecast.list[index].main.temp - 273.15).toFixed(1)}ºC</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <h2 className="text-light">Sin datos</h2>;
}

export default Card;
