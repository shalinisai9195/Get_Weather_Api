const apiKeyEl = 'd3ad6ae243c667f5f6e5da859f8759fc';

const cityInputEl= document.getElementById('city');

const weatherDataEl = document.querySelector('#weather-data');

// console.log(weatherDataEl);

const fromEl = document.querySelector('form');

fromEl.addEventListener('submit',(event)=>{
      event.preventDefault();
       const cityValue = cityInputEl.value;

      // console.log(cityValue)
      getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
   try {

    const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKeyEl}&units=metric`);
   if(!resp.ok){
    throw new Error('Network response was not ok');
   }
   const data =await resp.json();
    //console.log(data);
    const temperatureEl = Math.round(data.main.temp);
    const descriptionEl = data.weather[0].description;
    const iconEl = data.weather[0].icon;

    const detailsArr = [
      `Feel like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${Math.round(data.wind.speed)} m/s`
        ] 

        weatherDataEl.querySelector('.icon').innerHTML=` <img src="http://openweathermap.org/img/wn/${iconEl}.png" 
        alt="weather">`
        weatherDataEl.querySelector('.temperature').textContent=temperatureEl;
        weatherDataEl.querySelector('.description').textContent = descriptionEl;

      weatherDataEl.querySelector('.details').innerHTML = detailsArr
      .map((detail)=> `<div>${detail}</div>`);
  
    
  } catch (error) {
    
    weatherDataEl.querySelector('.icon').innerHTML= "";
    weatherDataEl.querySelector('.temperature').textContent= "";
    weatherDataEl.querySelector('.description').textContent="An error occur, please try again later";
    weatherDataEl.querySelector('.temperature').textContent="";

  }
}