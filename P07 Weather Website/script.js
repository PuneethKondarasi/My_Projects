const apiKey = config.apiKey;
let unit = "metric";
let currentTheme = "dark";

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    
    // Load last searched city from localStorage
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        document.getElementById('cityInput').value = lastCity;
    }
});

// Theme switching functionality
function toggleTheme() {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    localStorage.setItem('theme', currentTheme);
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-toggle i');
    if (currentTheme === "dark") {
        themeIcon.className = "fas fa-sun";
    } else {
        themeIcon.className = "fas fa-moon";
    }
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
    
    weatherResult.innerHTML = `
        <div class="weather-display">
            <h2 class="weather-location">${data.name}, ${data.sys.country}</h2>
            <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" />
            <p class="weather-description">${data.weather[0].description}</p>
            <div class="weather-temp">${Math.round(data.main.temp)}°${unit === 'metric' ? 'C' : 'F'}</div>
            <div class="weather-details">
                <span>High: ${Math.round(data.main.temp_max)}°${unit === 'metric' ? 'C' : 'F'}</span>
                <span>Low: ${Math.round(data.main.temp_min)}°${unit === 'metric' ? 'C' : 'F'}</span>
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
    
    dailyForecasts.forEach(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        const dayName = forecastDate.toLocaleDateString('en-us', { weekday: 'short' });
        const date = forecastDate.toLocaleDateString('en-us', { month: 'short', day: 'numeric' });
        
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");
        forecastItem.innerHTML = `
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

// Load saved preferences on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedUnit = localStorage.getItem('unit');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedUnit) {
        unit = savedUnit;
        const unitButton = document.getElementById("unitButton");
        const unitText = unitButton.querySelector('.unit-text');
        unitText.textContent = unit === "metric" ? "°C" : "°F";
    }
    
    if (savedTheme) {
        currentTheme = savedTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon();
    }
});

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
