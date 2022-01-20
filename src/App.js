import React, { useEffect, useState } from 'react'
import './App.css';

const api = {
  key: "2c1caf1d53c259000ca0882692a9dceb",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [cityName, setCityName] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${cityName}&lang=tr&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setCityName('');
          console.log(result)
        })
    }
  }

  // async function getSearch(evt) {
  //   if (evt.key === "Enter")
  //   console.log(evt.key)
  //   {
  //     const query = await fetch(
  //       `${api.base}weather?q={cityName}&units=metric&APPID=${api.key}`,
  //       { method: 'GET' }
  //     )
  //     const json = await query.json();
  //     const data = json;
  //     setWeather(data)
  //     console.log("hello", weather)
  //   }
  // }
  // useEffect(() => {
  //   getSearch()
  // })

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
      "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp-273.15 > 16) ? 'appwarm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            className="search"
            type="text"
            placeholder="Search"
            onChange={e => setCityName(e.target.value)}
            value={cityName}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="temperature">{Math.round(weather.main.temp-273.15)}°C</div>
            <div className="condition">{weather.weather[0].main}</div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
