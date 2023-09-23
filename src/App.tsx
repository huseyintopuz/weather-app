import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import "./App.css";

type WeatherData = {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
  };
  weather: {
    main: string;
  };
};
const api = {
  key: process.env.REACT_APP_API_KEY,
  base: process.env.REACT_APP_BASE_API,
};

function App() {
  document.title = "weather-app";

  const [cityName, setCityName] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  async function getSearch() {
    try {
      const response = await fetch(
        `${api.base}weather?q=${cityName}&APPID=${api.key}`,
        { method: "GET" }
      );
      console.log(response);

      const data: WeatherData = await response.json();
      setWeather(data);
      setCityName("");
    } catch (error) {}
  }

  async function search(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      await getSearch();
    }
  }

  const dateBuilder = (d: Date) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <section
      className={
        typeof weather?.main != "undefined"
          ? weather?.main.temp - 273.15 > 16
            ? "appwarm"
            : "app"
          : "app"
      }
    >
      <div className="wrapper">
        <h1 className="tag">Hava Durumu</h1>
        <input
          type="text"
          placeholder="Search"
          value={cityName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCityName(e.target.value)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => search(e)}
          className="search"
        />
      </div>
      {weather?.main && (
        <>
          <div className="location-box">
            <p className="location">
              {weather?.name}, {weather?.sys.country}
            </p>
            <p className="date">{dateBuilder(new Date())}</p>
          </div>
          <p className="temperature">
            {Math.round(weather?.main.temp - 273.15)}°C
          </p>
          <p className="condition">{weather?.weather[0].main}</p>
        </>
      )}
    </section>
  );
}

export default App;
