const apiKey = config.apiKey;
let unit = "metric";

async function getWeather() {
    const cityInput = document.getElementById("cityInput").value;
    if (!cityInput) {
        alert('Please enter a city');
        return;
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${unit}&appid=${apiKey}`;
    fetchWeather(apiUrl)
        .then(data => {
            displayWeather(data);
        })
        .catch(error => displayError(error));
}

async function fetchWeather(apiUrl) {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.cod === "404") {
        throw new Error("City not found");
    }
    return data;
}

function displayWeather(data) {
    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="weather icon" /></p>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°${unit === 'metric' ? 'C' : 'F'}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
    fetchForecast(data.name);
}

function displayError(error) {
    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = `<p style="color: red;">${error.message}</p>`;
}

async function fetchForecast(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.cod !== "200") return;
    const forecastResult = document.getElementById("forecastResult");
    forecastResult.innerHTML = '';
    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const forecastDate = new Date(forecast.dt * 1000);
        const dayName = forecastDate.toLocaleString('en-us', { weekday: 'long' });
        const date = forecastDate.toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' });
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");
        forecastItem.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="forecast icon" />
            <p><strong>${dayName}</strong></p>
            <p>${date}</p>
            <p>${forecast.main.temp}°${unit === 'metric' ? 'C' : 'F'}</p>
        `;
        forecastResult.appendChild(forecastItem);
    }
}

function toggleUnit() {
    unit = unit === "metric" ? "imperial" : "metric";
    const unitButton = document.getElementById("unitButton");
    if (unit === "metric") {
        unitButton.textContent = "Switch to Fahrenheit";
    } 
    else {
        unitButton.textContent = "Switch to Celsius";
    }
    const cityInput = document.getElementById("cityInput").value;
    if (cityInput) getWeather();
}
