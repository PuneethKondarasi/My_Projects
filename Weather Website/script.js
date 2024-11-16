async function getWeather() {
    const cityInput = document.getElementById("cityInput").value;
<<<<<<< HEAD
    const apiKey = "YOUR_API_KEY";
=======
    const apiKey = "YOUR_API";
>>>>>>> bb12145820d65e2e547fa45e54a75fbf87f6bf92
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;

    if (!cityInput) {
        alert('Please enter a city');
        return;
    }
    fetchWeather(apiUrl)
        .then(data => displayWeather(data))
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
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>`;
}

function displayError(error) {
    console.error("Error fetching weather data:", error.message);
    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = `<p>${error.message}</p>`;
}
