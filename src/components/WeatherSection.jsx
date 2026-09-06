import { useEffect, useState } from "react";
import { getStockholmWeather } from "../services/weatherApi.js";
import {
  getClothingAdvice,
  getWeatherIcon,
} from "../utils/weatherUtils.js";

function WeatherSection() {
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState("");

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const currentWeather = await getStockholmWeather();
        setWeather(currentWeather);
      } catch (error) {
        setWeatherError(error.message);
      }
    };

    loadWeather();
  }, []);

  if (weatherError) {
    return (
      <section className="weather-section">
        <div className="weather-box">
          <p>{weatherError}</p>
        </div>
      </section>
    );
  }

  if (!weather) {
    return (
      <section className="weather-section">
        <div className="weather-box">
          <p>Hämtar vädret…</p>
        </div>
      </section>
    );
  }

  const icon = getWeatherIcon(weather.weatherCode);
  const advice = getClothingAdvice(
    weather.temperature,
    weather.weatherCode,
  );

  return (
    <section className="weather-section" aria-label="Väder i Stockholm">
      <div className="weather-box weather-information">
        <span className="weather-icon" aria-hidden="true">
          {icon}
        </span>

        <div>
          <h2>Stockholm</h2>
          <p>{Math.round(weather.temperature)}°C</p>
        </div>
      </div>

      <div className="weather-box clothing-advice">
        <h2>Klädtips</h2>
        <p>{advice}</p>
      </div>
    </section>
  );
}

export default WeatherSection;
