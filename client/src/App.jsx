import './App.css'
import React, { useState, useEffect } from 'react'
import { formatCurrentWeather, getFormattedWeatherData, getWeatherService } from '../services/weatherService'
import CityInput from './components/CityComparison'

function App() {
  const [temperatureData, setTemperatureData] = useState([]);

  const fetchWeather = async (city) => {
    const data = await getWeatherService('forecast', { q: city });
    return data;
  }

  const getCitiesData = async (city) => {
    const citiesData = await fetchWeather(city);
    return citiesData;
  }

  const cities = [
    {
      id: 1,
      title: 'Chattanooga'
    },

  ]

  useEffect(() => {
    async function fetchWeatherData() {
      let data = [];
      for (const city of cities) {
        const cityData = await getCitiesData(city.title);

        const dailyTemperatures = cityData.list.reduce((acc, entry) => {
          const date = new Date(entry.dt * 1000).toISOString().slice(0, 10);

          if (acc[date]) {
            acc[date].push(entry.main.temp);
          } else {
            acc[date] = [entry.main.temp];
          }

          return acc;
        }, {});

        const averageDailyTemperatures = Object.entries(dailyTemperatures).map(([date, temperatures]) => {
          const average = temperatures.reduce((sum, temperature) => sum + temperature, 0) / temperatures.length;
          return { date, temperature: average };
        });

        data.push({ city: city.title, temperatures: averageDailyTemperatures });
      }
      setTemperatureData(data);
    }

    fetchWeatherData();
  }, [])

  return (

    <div className='mx-auto max-w-screen-md mt-4 py-5 px-32'>
      <CityInput onCitySelected={async (city) => {
        const cityData = await getCitiesData(city);

        const dailyTemperatures = cityData.list.reduce((acc, entry) => {
          const date = new Date(entry.dt * 1000).toISOString().slice(0, 10);

          if (acc[date]) {
            acc[date].push(entry.main.temp);
          } else {
            acc[date] = [entry.main.temp];
          }

          return acc;
        }, {});

        const averageDailyTemperatures = Object.entries(dailyTemperatures).map(([date, temperatures]) => {
          const average = temperatures.reduce((sum, temperature) => sum + temperature, 0) / temperatures.length;
          return { date, temperature: average };
        });

        setTemperatureData((data) => [...data, { city, temperatures: averageDailyTemperatures }]);
      }} />

      <div>

        {temperatureData.map(({ city, temperatures }) => (
          <div key={city}>
            <h2>{city}</h2>
            <ul>
              {temperatures.map(({ date, temperature }) => (
                <li key={date}>{`${date}: ${temperature.toFixed(2)}°K`}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
