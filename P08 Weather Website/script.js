const apiKey = config.apiKey;
let unit = "metric";
let currentHouse = "gryffindor";

// House Configuration
const houseConfig = {
    gryffindor: { primary: '#740001', secondary: '#d3a625', accent: '#eeba30' },
    hufflepuff: { primary: '#ecb939', secondary: '#372e29', accent: '#726255' },
    ravenclaw: { primary: '#0e1a40', secondary: '#946b2d', accent: '#222f5b' },
    slytherin: { primary: '#1a472a', secondary: '#5d5d5d', accent: '#aaaaaa' }
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Load last searched city
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        document.getElementById('cityInput').value = lastCity;
    }
    
    // Initialize House
    const savedHouse = localStorage.getItem('house') || 'gryffindor';
    document.getElementById('houseSelector').value = savedHouse;
    changeHouse(savedHouse);

    // Initialize Unit
    const savedUnit = localStorage.getItem('unit');
    if (savedUnit) {
        unit = savedUnit;
        const unitButton = document.getElementById("unitButton");
        const unitText = unitButton.querySelector('.unit-text');
        if (unitText) {
            unitText.textContent = unit === "metric" ? "°C" : "°F";
        }
    }
});

// Change House Theme
function changeHouse(houseValue) {
    const house = houseValue || document.getElementById('houseSelector').value;
    currentHouse = house;
    const colors = houseConfig[house];
    
    const root = document.documentElement;
    root.style.setProperty('--house-primary', colors.primary);
    root.style.setProperty('--house-secondary', colors.secondary);
    root.style.setProperty('--house-accent', colors.accent);
    
    localStorage.setItem('house', house);
}

// Daily Challenge
function startChallenge() {
    const spells = ["Lumos", "Alohomora", "Wingardium Leviosa", "Expecto Patronum", "Expelliarmus"];
    const randomSpell = spells[Math.floor(Math.random() * spells.length)];
    const challengeText = document.getElementById('challengeText');
    
    challengeText.innerHTML = `You found the hidden spell: <strong>${randomSpell}</strong>! <br> The weather spirits are pleased.`;
    challengeText.style.color = 'var(--house-accent)';
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
}

// Get current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoords(latitude, longitude);
            },
            error => {
                hideLoading();
                showError('Unable to get your location. Please enter a city manually.');
                console.error('Geolocation error:', error);
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
}

// Get weather by coordinates
async function getWeatherByCoords(lat, lon) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
        const data = await fetchWeather(apiUrl);
        displayWeather(data);
        fetchForecastByCoords(lat, lon);
    } catch (error) {
        hideLoading();
        displayError(error);
    }
}

// Main weather function
async function getWeather() {
    const cityInput = document.getElementById("cityInput").value.trim();
    if (!cityInput) {
        showError('Please enter a city name');
        return;
    }
    
    showLoading();
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityInput)}&units=${unit}&appid=${apiKey}`;
        const data = await fetchWeather(apiUrl);
        displayWeather(data);
        fetchForecast(data.name);
        
        // Save to localStorage
        localStorage.setItem('lastCity', cityInput);
    } catch (error) {
        hideLoading();
        displayError(error);
    }
}

// Fetch weather data
async function fetchWeather(apiUrl) {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.cod === "404") {
        throw new Error("City not found. Please check the spelling and try again.");
    }
    
    if (data.cod !== 200 && data.cod !== "200") {
        throw new Error("Unable to fetch weather data. Please try again later.");
    }
    
    return data;
}

// Display weather information
function displayWeather(data) {
    hideLoading();
    
    const weatherResult = document.getElementById("weatherResult");
    const weatherDetails = document.getElementById("weatherDetails");
    
    // Wizarding Icon Mapping
    let wizardIcon = "fas fa-hat-wizard";
    let wizardDesc = "Magical Mist";
    
    const mainWeather = data.weather[0].main.toLowerCase();
    if (mainWeather.includes('clear')) {
        wizardIcon = "fas fa-dragon"; // Patronus/Dragon
        wizardDesc = "Patronus Protection (Clear)";
    } else if (mainWeather.includes('rain')) {
        wizardIcon = "fas fa-cloud-showers-heavy";
        wizardDesc = "Forbidden Forest Rain";
    } else if (mainWeather.includes('snow')) {
        wizardIcon = "fas fa-snowflake";
        wizardDesc = "Hogsmeade Blizzard";
    } else if (mainWeather.includes('thunder')) {
        wizardIcon = "fas fa-bolt";
        wizardDesc = "Dragon's Breath Storm";
    } else if (mainWeather.includes('cloud')) {
        wizardIcon = "fas fa-ghost";
        wizardDesc = "Cloak of Invisibility (Cloudy)";
    }

    weatherResult.innerHTML = `
        <div class="weather-display">
            <h2 class="weather-location">${data.name}, ${data.sys.country}</h2>
            <div class="weather-icon-container">
                <i class="${wizardIcon}" style="font-size: 4rem; color: var(--house-secondary);"></i>
            </div>
            <p class="weather-description" style="margin-top: 1rem;">${wizardDesc}</p>
            <div class="weather-temp">
                <span style="font-size: 1.2rem; display:block; margin-bottom:0.5rem; font-family: var(--font-heading);">Current Temperature in the Wizarding World</span>
                ${Math.round(data.main.temp)}°${unit === 'metric' ? 'C' : 'F'}
            </div>
            <div class="weather-details">
                <span>High: ${Math.round(data.main.temp_max)}°</span>
                <span>Low: ${Math.round(data.main.temp_min)}°</span>
            </div>
        </div>
    `;
    
    // Update detailed weather information
    updateWeatherDetails(data);
    weatherDetails.style.display = 'block';
}

// Update detailed weather information
function updateWeatherDetails(data) {
    const windUnit = unit === 'metric' ? 'm/s' : 'mph';
    const visibilityUnit = unit === 'metric' ? 'km' : 'miles';
    const pressureUnit = 'hPa';
    
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°${unit === 'metric' ? 'C' : 'F'}`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} ${windUnit}`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} ${visibilityUnit}`;
    document.getElementById('pressure').textContent = `${data.main.pressure} ${pressureUnit}`;
    document.getElementById('uvIndex').textContent = 'N/A'; // UV index requires additional API call
}

// Display error message
function displayError(error) {
    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${error.message}</p>
        </div>
    `;
    
    // Hide weather details section
    document.getElementById("weatherDetails").style.display = 'none';
}

// Show error message
function showError(message) {
    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
        </div>
    `;
}

// Fetch forecast data
async function fetchForecast(city) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=${unit}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.cod !== "200") {
            throw new Error("Unable to fetch forecast data");
        }
        
        displayForecast(data);
    } catch (error) {
        console.error('Forecast error:', error);
        showForecastError();
    }
}

// Fetch forecast by coordinates
async function fetchForecastByCoords(lat, lon) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.cod !== "200") {
            throw new Error("Unable to fetch forecast data");
        }
        
        displayForecast(data);
    } catch (error) {
        console.error('Forecast error:', error);
        showForecastError();
    }
}

// Display forecast
function displayForecast(data) {
    const forecastResult = document.getElementById("forecastResult");
    forecastResult.innerHTML = '';
    
    // Get one forecast per day (every 8th item as data is in 3-hour intervals)
    const dailyForecasts = [];
    for (let i = 0; i < data.list.length; i += 8) {
        if (dailyForecasts.length < 5) { // Limit to 5 days
            dailyForecasts.push(data.list[i]);
        }
    }
    
    dailyForecasts.forEach((forecast, index) => {
        const forecastDate = new Date(forecast.dt * 1000);
        const dayName = forecastDate.toLocaleDateString('en-us', { weekday: 'short' });
        const date = forecastDate.toLocaleDateString('en-us', { month: 'short', day: 'numeric' });
        
        // Wizarding Time of Day Titles
        let timeTitle = "Morning: Rise of the Sun";
        if (index % 3 === 1) timeTitle = "Afternoon: Glowing";
        if (index % 3 === 2) timeTitle = "Evening: Twilight Shadows";

        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");
        forecastItem.innerHTML = `
            <p style="font-size: 0.8rem; color: var(--house-accent); margin-bottom: 0.5rem;">${timeTitle}</p>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="forecast icon" />
            <p class="forecast-day">${dayName}</p>
            <p class="forecast-date">${date}</p>
            <p class="forecast-temp">${Math.round(forecast.main.temp)}°${unit === 'metric' ? 'C' : 'F'}</p>
            <p class="forecast-description">${forecast.weather[0].description}</p>
        `;
        forecastResult.appendChild(forecastItem);
    });
}

// Show forecast error
function showForecastError() {
    const forecastResult = document.getElementById("forecastResult");
    forecastResult.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Unable to load forecast data</p>
        </div>
    `;
}

// Toggle temperature unit
function toggleUnit() {
    unit = unit === "metric" ? "imperial" : "metric";
    const unitButton = document.getElementById("unitButton");
    const unitText = unitButton.querySelector('.unit-text');
    
    if (unit === "metric") {
        unitText.textContent = "°C";
    } else {
        unitText.textContent = "°F";
    }
    
    // Save preference
    localStorage.setItem('unit', unit);
    
    // Refresh weather data if a city is already loaded
    const cityInput = document.getElementById("cityInput").value;
    if (cityInput) {
        getWeather();
    }
}

// Loading functions
function showLoading() {
    const loadingOverlay = document.getElementById("loadingOverlay");
    loadingOverlay.classList.add("show");
}

function hideLoading() {
    const loadingOverlay = document.getElementById("loadingOverlay");
    loadingOverlay.classList.remove("show");
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Enhanced error handling with retry functionality
function retryWeatherFetch() {
    const cityInput = document.getElementById("cityInput").value;
    if (cityInput) {
        getWeather();
    }
}
