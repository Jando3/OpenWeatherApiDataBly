const apiKey = 'fc46edd3bd1a12241dd7c6cc9d01b18b';
const baseUrl = 'https://api.openweathermap.org/data/2.5';

export const getWeatherService = (infoType, searchParams) => {
  const url = new URL(baseUrl +'/'+ infoType);

  url.search = new URLSearchParams({ ...searchParams, appid:apiKey });

  return fetch(url)
  .then((res) => res.json())
  .then((data)=> data);
 
};

export const fiveForecast = (data) => {
  const { 
    list:[]
  }
  = data;

  return{
    list
  }
console.log(list)
}

export const formatCurrentWeather = (data) => {
  // const {
  //   main: { temp, feels_like },
  //   weather: [{ description, icon }],
  //   dt,
  //   name,
  //   sys: { country },
  // } = data;

  // const data = { 'city': cityData['city'], 'entry': cityData[entry] }

  
  const temp = data.entry.main.temp
  const dt = data.entry.dt
  const location = data.city.name + ',' + data.city.country

  return {
      location: location,
      temperature: `${temp.toFixed(1)}°C`,
      date: new Date(dt * 1000).toLocaleDateString(),
      time: new Date(dt * 1000).toLocaleTimeString(),
    };

  // return {
  //   location: `${name}, ${country}`,
  //   temperature: `${temp.toFixed(1)}°C`,
  //   feelsLike: `${feels_like.toFixed(1)}°C`,
  //   description,
  //   iconUrl: `http://openweathermap.org/img/w/${icon}.png`,
  //   date: new Date(dt * 1000).toLocaleDateString(),
  //   time: new Date(dt * 1000).toLocaleTimeString(),
  // };
};

export const getFormattedWeatherData = async(searchParams) => {
    const formattedCurrentWeather = await getWeatherService
    ('weather', searchParams).then(formatCurrentWeather)
    return formattedCurrentWeather
}
export default getFormattedWeatherData
