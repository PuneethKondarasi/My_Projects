const apiKey = config.apiKey;
let weatherChart;
let currentLocation = null;
let alertHistory = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    updateConnectionStatus('Connecting...', 'connecting');
    setupEventListeners();
    getCurrentLocation();
}

function setupEventListeners() {
    // Forecast period controls
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const period = this.dataset.period;
            if (currentLocation) {
                getHourlyForecast(currentLocation.lat, currentLocation.lon, period);
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const chartModal = document.getElementById('chartModal');
        const alertModal = document.getElementById('alertModal');
        const manualLocationModal = document.getElementById('manualLocationModal');
        if (event.target === chartModal) {
            closeModal();
        }
        if (event.target === alertModal) {
            closeAlertModal();
        }
        if (event.target === manualLocationModal) {
            closeManualLocationModal();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
            closeAlertModal();
            closeManualLocationModal();
        }
    });

    // Manual location modal keyboard support
    document.getElementById('cityName').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchCityLocation();
        }
    });

    document.getElementById('latitude').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            setManualLocation();
        }
    });

    document.getElementById('longitude').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            setManualLocation();
        }
    });
}

function updateConnectionStatus(message, status) {
    const statusElement = document.getElementById('connection-status');
    const statusText = statusElement.querySelector('.status-text');
    const statusDot = statusElement.querySelector('.status-dot');
    
    statusText.textContent = message;
    statusDot.className = 'status-dot ' + status;
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        // First try to get high accuracy location
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude, accuracy } = position.coords;
                currentLocation = { lat: latitude, lon: longitude };
                console.log(`High accuracy location detected: ${latitude}, ${longitude}`);
                console.log(`Accuracy: ${accuracy} meters`);
                updateConnectionStatus('Connected (High Accuracy)', 'connected');
                updateLocationAccuracy(accuracy);
                getWeather(latitude, longitude);
            },
            error => {
                console.error('High accuracy geolocation failed:', error);
                // Fallback to lower accuracy
                navigator.geolocation.getCurrentPosition(
                    fallbackPosition => {
                        const { latitude, longitude, accuracy } = fallbackPosition.coords;
                        currentLocation = { lat: latitude, lon: longitude };
                        console.log(`Fallback location detected: ${latitude}, ${longitude}`);
                        console.log(`Accuracy: ${accuracy} meters`);
                        updateConnectionStatus('Connected (Standard)', 'connected');
                        updateLocationAccuracy(accuracy);
                        getWeather(latitude, longitude);
                    },
                    fallbackError => {
                        console.error('All geolocation attempts failed:', fallbackError);
                        updateConnectionStatus('Location Error', 'error');
                        updateLocationAccuracy(null);
                        handleLocationError(fallbackError);
                    },
                    { 
                        enableHighAccuracy: false, 
                        timeout: 15000, 
                        maximumAge: 300000 // 5 minutes
                    }
                );
            },
            { 
                enableHighAccuracy: true, 
                timeout: 10000, 
                maximumAge: 60000 // 1 minute for high accuracy
            }
        );
    } else {
        updateConnectionStatus('Geolocation not supported', 'error');
        updateLocationAccuracy(null);
        document.getElementById('location').textContent = 'Geolocation is not supported by your browser.';
    }
}

function handleLocationError(error) {
    let errorMessage = 'Error fetching location: ';
    let userMessage = '';
    
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage += 'User denied the request for Geolocation.';
            userMessage = 'Location access denied. Please enable location permissions in your browser settings and refresh the page.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            userMessage = 'Unable to determine your location. Please check your internet connection and try again.';
            break;
        case error.TIMEOUT:
            errorMessage += 'The request to get user location timed out.';
            userMessage = 'Location request timed out. Please try refreshing the page.';
            break;
        case error.UNKNOWN_ERROR:
            errorMessage += 'An unknown error occurred.';
            userMessage = 'An unexpected error occurred while getting your location. Please try again.';
            break;
    }
    
    console.error(errorMessage, error);
    document.getElementById('location').textContent = userMessage;
    
    // Show a helpful message to the user
    showNotification('Location access required for weather data. Please enable location permissions.', 'warning');
}

function refreshWeather() {
    if (currentLocation) {
        const refreshBtn = document.getElementById('refresh-btn');
        refreshBtn.disabled = true;
        refreshBtn.innerHTML = '<span class="refresh-icon spinning">🔄</span> Refreshing...';
        
        getWeather(currentLocation.lat, currentLocation.lon);
        
        setTimeout(() => {
            refreshBtn.disabled = false;
            refreshBtn.innerHTML = '<span class="refresh-icon">🔄</span> Refresh';
        }, 2000);
    }
}

function getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            updateWeatherDisplay(data);
            updateLastUpdated();
            getDynamicThresholds(lat, lon);
            getHourlyForecast(lat, lon, 6);
            checkForecastThresholds(lat, lon);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            updateConnectionStatus('Connection Error', 'error');
            document.getElementById('weather-container').innerHTML = 
                '<div class="error-message">Unable to fetch weather data. Please check your connection.</div>';
        });
}

function updateWeatherDisplay(data) {
    const location = `${data.name}, ${data.sys.country}`;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;
    const windDeg = data.wind.deg || 0;
    
    // Update location
    document.getElementById('location').textContent = location;
    
    // Update temperature
    document.getElementById('temp-current').textContent = `${temperature.toFixed(1)} °C`;
    
    // Update humidity with bar
    document.getElementById('humidity-current').textContent = `${humidity} %`;
    const humidityBar = document.getElementById('humidity-bar-fill');
    if (humidityBar) {
        humidityBar.style.width = `${humidity}%`;
    }
    
    // Update wind speed and direction
    document.getElementById('wind-current').textContent = `${windSpeed} m/s`;
    updateWindDirection(windDeg);
    
    // Update pressure
    document.getElementById('pressure-current').textContent = `${pressure} hPa`;
}

function updateWindDirection(degrees) {
    const directionElement = document.getElementById('wind-direction');
    const directionText = directionElement.querySelector('.direction-text');
    const directionIcon = directionElement.querySelector('.direction-icon');
    
    const directions = ['↑', '↗️', '→', '↘️', '↓', '↙️', '←', '↖️'];
    const directionNames = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    
    const index = Math.round(degrees / 45) % 8;
    directionIcon.textContent = directions[index];
    directionText.textContent = directionNames[index];
}

function updateLastUpdated() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('last-updated').textContent = `Last updated: ${timeString}`;
}

function getDynamicThresholds(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            let tempMin = Infinity;
            let tempMax = -Infinity;
            let pressureMin = Infinity;
            let pressureMax = -Infinity;
            
            data.list.forEach(forecast => {
                const temp = forecast.main.temp;
                const pressure = forecast.main.pressure;
                if (temp < tempMin) tempMin = temp;
                if (temp > tempMax) tempMax = temp;
                if (pressure < pressureMin) pressureMin = pressure;
                if (pressure > pressureMax) pressureMax = pressure;
            });
            
            document.getElementById('temp-min').textContent = `${tempMin.toFixed(1)} °C`;
            document.getElementById('temp-max').textContent = `${tempMax.toFixed(1)} °C`;
            document.getElementById('pressure-min').textContent = `${pressureMin} hPa`;
            document.getElementById('pressure-max').textContent = `${pressureMax} hPa`;
        })
        .catch(error => {
            console.error('Error fetching dynamic thresholds:', error);
        });
}

function getHourlyForecast(lat, lon, hours = 6) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const hourlyForecastContainer = document.getElementById('hourly-forecast');
            hourlyForecastContainer.innerHTML = '';
            
            const forecastCount = Math.min(hours / 3, data.list.length);
            
            for (let i = 0; i < forecastCount; i++) {
                const forecast = data.list[i];
                const time = new Date(forecast.dt * 1000).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                const temp = forecast.main.temp;
                const desc = forecast.weather[0].description;
                const icon = forecast.weather[0].icon;
                
                const forecastDiv = document.createElement('div');
                forecastDiv.classList.add('hour');
                
                const iconImg = document.createElement('img');
                iconImg.src = `https://openweathermap.org/img/wn/${icon}.png`;
                iconImg.alt = desc;
                
                forecastDiv.appendChild(iconImg);
                forecastDiv.innerHTML += `
                    <p class="forecast-time">${time}</p>
                    <p class="forecast-temp">${temp.toFixed(1)}°C</p>
                    <p class="forecast-desc">${desc}</p>
                `;
                
                hourlyForecastContainer.appendChild(forecastDiv);
            }
        })
        .catch(error => {
            console.error('Error fetching hourly forecast:', error);
            document.getElementById('hourly-forecast').innerHTML = 
                '<div class="error-message">Unable to fetch forecast data.</div>';
        });
}

function showChart(type) {
    const titles = {
        temperature: "Temperature Forecast (°C)",
        humidity: "Humidity Forecast (%)",
        wind: "Wind Speed Forecast (m/s)",
        pressure: "Pressure Forecast (hPa)"
    };
    
    document.getElementById('chartTitle').textContent = titles[type];
    
    if (!currentLocation) {
        alert('Location not available. Please refresh the page.');
        return;
    }
    
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${currentLocation.lat}&lon=${currentLocation.lon}&units=metric&appid=${apiKey}`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const labels = data.list.slice(0, 7).map((item, index) => {
                const date = new Date(item.dt * 1000);
                return date.toLocaleDateString('en-US', { 
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                });
            });
            
            const values = data.list.slice(0, 7).map(item => {
                switch (type) {
                    case 'temperature': return item.main.temp;
                    case 'humidity': return item.main.humidity;
                    case 'wind': return item.wind.speed;
                    case 'pressure': return item.main.pressure;
                    default: return 0;
                }
            });

            createChart(labels, values, titles[type]);
            document.getElementById('chartModal').style.display = 'block';
        })
        .catch(error => console.error('Error fetching forecast data:', error));
}

function createChart(labels, data, label) {
    const ctx = document.getElementById('weatherChart').getContext('2d');
    
    if (weatherChart) weatherChart.destroy();
    
    weatherChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: 'rgba(37, 99, 235, 1)',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                pointRadius: 6,
                pointBackgroundColor: 'rgba(37, 99, 235, 1)',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        maxRotation: 45,
                        minRotation: 0
                    },
                    border: {
                        display: true,
                        color: '#e2e8f0'
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: 'rgba(100, 116, 139, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        padding: 8
                    },
                    border: {
                        display: true,
                        color: '#e2e8f0'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            layout: {
                padding: {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20
                }
            },
            elements: {
                point: {
                    hoverRadius: 8,
                    hoverBorderWidth: 3
                }
            }
        }
    });
}

function closeModal() {
    document.getElementById('chartModal').style.display = 'none';
}

function closeAlertModal() {
    document.getElementById('alertModal').style.display = 'none';
}

function checkForecastThresholds(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecasts = data.list.slice(0, 16);
            let alertFound = false;
            
            for (const forecast of forecasts) {
                const time = new Date(forecast.dt * 1000).toLocaleString([], {
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                });

                const temp = forecast.main.temp;
                const pressure = forecast.main.pressure;
                const humidity = forecast.main.humidity;
                const windSpeed = forecast.wind.speed;

                let message = '';
                let alertLevel = 'info';
                
                if (temp < 10) {
                    message += `❄️ Cold Weather Alert: Temperature at ${time} is ${temp}°C. Bundle up to stay warm.\n`;
                    alertLevel = 'warning';
                } else if (temp > 35) {
                    message += `🔥 Heatwave Alert: Temperature at ${time} is ${temp}°C. Stay hydrated and avoid sunlight.\n`;
                    alertLevel = 'danger';
                } else if (temp > 28) {
                    message += `🌡️ Warm Weather Notice: Temperature at ${time} is ${temp}°C. Take precautions to stay cool.\n`;
                    alertLevel = 'warning';
                }

                if (pressure < 1000) {
                    message += `⛈️ Low Pressure Alert: Pressure at ${time} is ${pressure} hPa. Potential for storms.\n`;
                    alertLevel = 'warning';
                } else if (pressure > 1025) {
                    message += `🌞 High Pressure Notice: Pressure at ${time} is ${pressure} hPa. Expect clear weather.\n`;
                }

                if (humidity < 30) {
                    message += `💧 Low Humidity Alert: Humidity at ${time} is ${humidity}%. Stay hydrated.\n`;
                    alertLevel = 'warning';
                } else if (humidity > 80) {
                    message += `🌧️ High Humidity Alert: Humidity at ${time} is ${humidity}%. Possible rain.\n`;
                    alertLevel = 'warning';
                }

                if (windSpeed > 20) {
                    message += `💨 Dangerous Wind Alert: Wind speed at ${time} is ${windSpeed} m/s. Avoid outdoor activities.\n`;
                    alertLevel = 'danger';
                } else if (windSpeed > 10) {
                    message += `🌪️ High Wind Alert: Wind speed at ${time} is ${windSpeed} m/s. Be cautious outside.\n`;
                    alertLevel = 'warning';
                }

                if (message) {
                    addAlertToHistory(message, alertLevel, time);
                    showAlertModal(message, alertLevel);
                    alertFound = true;
                    break;
                }
            }
            
            if (!alertFound) {
                console.log('No alerts for the next 48 hours.');
                updateAlertsContainer();
            }
        })
        .catch(error => {
            console.error('Error fetching forecast thresholds:', error);
        });
}

function addAlertToHistory(message, level, time) {
    const alert = {
        message: message,
        level: level,
        time: time,
        timestamp: new Date()
    };
    
    alertHistory.unshift(alert);
    
    // Keep only last 10 alerts
    if (alertHistory.length > 10) {
        alertHistory = alertHistory.slice(0, 10);
    }
    
    updateAlertsContainer();
}

function updateAlertsContainer() {
    const alertsContainer = document.getElementById('alerts-container');
    
    if (alertHistory.length === 0) {
        alertsContainer.innerHTML = `
            <div class="no-alerts">
                <span class="alert-icon">✅</span>
                <p>No active weather alerts</p>
            </div>
        `;
        return;
    }
    
    alertsContainer.innerHTML = alertHistory.map(alert => `
        <div class="alert-item alert-${alert.level}">
            <div class="alert-header">
                <span class="alert-time">${alert.time}</span>
                <span class="alert-level">${alert.level.toUpperCase()}</span>
            </div>
            <div class="alert-message">${alert.message}</div>
        </div>
    `).join('');
}

function showAlertModal(message, level) {
    const alertModal = document.getElementById('alertModal');
    const alertMessage = document.getElementById('alertMessage');
    
    alertMessage.innerHTML = message.replace(/\n/g, '<br>');
    alertMessage.className = `alert-message alert-${level}`;
    
    alertModal.style.display = 'block';
}

function sendSMSAlert() {
    const alertMessage = document.getElementById('alertMessage');
    const message = alertMessage.textContent;
    
    sendSMS(message);
    closeAlertModal();
}

function sendSMS(sending_message) {
    const phoneNumber = '+91{your_phone_number}'; // Update with actual phone number
    console.log('Sending SMS:', sending_message);
    
    fetch('http://localhost:3000/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phoneNumber: phoneNumber,
            message: sending_message,
        }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.error || 'Unknown error');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('SMS sent successfully', data);
        showNotification('SMS alert sent successfully!', 'success');
    })
    .catch(error => {
        console.error('Error sending SMS:', error.message);
        showNotification('Failed to send SMS alert. Please try again.', 'error');
    });
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : '❌'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 16px;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left: 4px solid #10b981;
}

.notification-error {
    border-left: 4px solid #ef4444;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 8px;
}

.notification-icon {
    font-size: 16px;
}

.notification-message {
    font-size: 14px;
    color: #374151;
}

.spinning {
    animation: spin 1s linear infinite;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);

function updateLocationAccuracy(accuracy) {
    const accuracyElement = document.getElementById('location-accuracy');
    const accuracyValue = document.getElementById('accuracy-value');
    
    if (accuracy && accuracy > 0) {
        accuracyValue.textContent = Math.round(accuracy);
        accuracyElement.style.display = 'flex';
    } else {
        accuracyElement.style.display = 'none';
    }
}

function showManualLocationModal() {
    document.getElementById('manualLocationModal').style.display = 'block';
    
    // Add scroll event listener to hide scroll indicator
    const modalBody = document.querySelector('#manualLocationModal .modal-body');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (modalBody && scrollIndicator) {
        const handleScroll = () => {
            if (modalBody.scrollTop > 10) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        };
        
        modalBody.addEventListener('scroll', handleScroll);
        
        // Store the event listener for cleanup
        modalBody._scrollHandler = handleScroll;
    }
}

function closeManualLocationModal() {
    document.getElementById('manualLocationModal').style.display = 'none';
    
    // Remove scroll event listener
    const modalBody = document.querySelector('#manualLocationModal .modal-body');
    if (modalBody && modalBody._scrollHandler) {
        modalBody.removeEventListener('scroll', modalBody._scrollHandler);
        delete modalBody._scrollHandler;
    }
    
    // Reset scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.opacity = '1';
    }
    
    // Clear inputs
    document.getElementById('latitude').value = '';
    document.getElementById('longitude').value = '';
    document.getElementById('cityName').value = '';
}

function setManualLocation() {
    const lat = parseFloat(document.getElementById('latitude').value);
    const lon = parseFloat(document.getElementById('longitude').value);
    
    if (isNaN(lat) || isNaN(lon)) {
        showNotification('Please enter valid coordinates', 'error');
        return;
    }
    
    if (lat < -90 || lat > 90) {
        showNotification('Latitude must be between -90 and 90', 'error');
        return;
    }
    
    if (lon < -180 || lon > 180) {
        showNotification('Longitude must be between -180 and 180', 'error');
        return;
    }
    
    currentLocation = { lat, lon };
    closeManualLocationModal();
    updateConnectionStatus('Manual Location Set', 'connected');
    getWeather(lat, lon);
    showNotification('Manual location set successfully', 'success');
}

async function searchCityLocation() {
    const cityName = document.getElementById('cityName').value.trim();
    
    if (!cityName) {
        showNotification('Please enter a city name', 'error');
        return;
    }
    
    try {
        // Use OpenWeatherMap Geocoding API to get coordinates
        const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`;
        const response = await fetch(geocodeUrl);
        const data = await response.json();
        
        if (data && data.length > 0) {
            const { lat, lon, name, country } = data[0];
            currentLocation = { lat, lon };
            closeManualLocationModal();
            updateConnectionStatus('City Location Set', 'connected');
            getWeather(lat, lon);
            showNotification(`Location set to ${name}, ${country}`, 'success');
        } else {
            showNotification('City not found. Please check the spelling.', 'error');
        }
    } catch (error) {
        console.error('Error searching city:', error);
        showNotification('Error searching for city. Please try again.', 'error');
    }
}



