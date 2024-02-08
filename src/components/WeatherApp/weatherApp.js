import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import WeatherForm from "../WeatherForm/weatherForm";
import WeatherMainInfo from "../weatherMainInfo/weatherMainInfo";

import styles from "./weatherApp.module.css";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const Url = process.env.REACT_APP_URL;
  const ApiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    loadInfo();
  }, []);

  useEffect(() => {
    document.title = "Weather | " + weather?.location?.name ?? "";
  }, [weather]);

  async function loadInfo(city = "argentina") {
    console.log(
      `${Url}&key=${ApiKey}&q=${city}`
    );
    try {
      const request = await fetch(
        `${Url}&key=${ApiKey}&q=${city}`
      );
      const json = await request.json();
      console.log(json);

      setTimeout(() => {
        setWeather({ ...json });
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  }

  function handleOnChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleOnChangeCity} />
      {weather ? <WeatherMainInfo weather={weather} /> : <Loader />}
    </div>
  );
}