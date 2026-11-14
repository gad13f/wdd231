// scripts/weather.js

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const humiditySpan = document.querySelector('#humidity');

const lat = 25.8695;
const lon = -97.5027;
const _apiKey = "6b3f9c1e5dff899cf235173ce48921d9";

const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${_apiKey}&lang=es`;
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${_apiKey}&lang=es`;

async function apiFetch() {
    try {
        const responseCurrent = await fetch(urlCurrent);
        if (responseCurrent.ok) {
            const dataCurrent = await responseCurrent.json();
            displayCurrentWeather(dataCurrent);
        } else {
            throw Error(await responseCurrent.text());
        }

        const responseForecast = await fetch(urlForecast);
        if (responseForecast.ok) {
            const dataForecast = await responseForecast.json();
            displayForecast(dataForecast);
        } else {
            throw Error(await responseForecast.text());
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}`;
    humiditySpan.innerHTML = data.main.humidity;
    
    const desc = data.weather[0].description;
    weatherDesc.innerHTML = desc.charAt(0).toUpperCase() + desc.slice(1);
    
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
}

function displayForecast(data) {
    const forecastList = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
    const forecastContainer = document.querySelector('#forecast-container') || createForecastContainer();
    forecastContainer.innerHTML = '';

    forecastList.forEach(day => {
        // CORREGIDO: Se agregó el operador * y se unió en una sola línea
        const d = new Date(day.dt * 1000);
        const options = { weekday: 'short' };
        const dayName = d.toLocaleDateString('es-ES', options);
        
        const listItem = document.createElement('li');
        listItem.innerHTML = `${dayName}: <strong>${Math.round(day.main.temp)}&deg;C</strong> - ${day.weather[0].description}`;
        forecastContainer.appendChild(listItem);
    });
}

function createForecastContainer() {
    const card = document.querySelector('.weather-card');
    const ul = document.createElement('ul');
    ul.id = 'forecast-container';
    card.appendChild(ul);
    return ul;
}

apiFetch();