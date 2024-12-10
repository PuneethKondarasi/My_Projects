const apiKey = 'your_api_key';
let weatherChart;

function getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const location = `${data.name}, ${data.sys.country}`;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const pressure = data.main.pressure;
            document.getElementById('location').textContent = `Location: ${location}`;
            document.getElementById('temp-current').textContent = `${temperature} °C`;
            document.getElementById('humidity-current').textContent = `${humidity} %`;
            document.getElementById('wind-current').textContent = `${windSpeed} m/s`;
            document.getElementById('pressure-current').textContent = `${pressure} hPa`;
            getDynamicThresholds(lat, lon);
            getHourlyForecast(lat, lon);
            checkForecastThresholds(lat, lon);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-container').textContent = 'Unable to fetch weather data.';
        });
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


function getHourlyForecast(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const hourlyForecastContainer = document.getElementById('hourly-forecast');
            hourlyForecastContainer.innerHTML = ''; 
            for (let i = 0; i < 6; i++) {
                const forecast = data.list[i];
                const time = new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const temp = forecast.main.temp;
                const desc = forecast.weather[0].description;
                const icon = forecast.weather[0].icon;
                const forecastDiv = document.createElement('div');
                forecastDiv.classList.add('hour');
                const iconImg = document.createElement('img');
                iconImg.src = `https://openweathermap.org/img/wn/${icon}.png`;
                iconImg.alt = desc;
                forecastDiv.appendChild(iconImg);
                forecastDiv.innerHTML += `<p>${time}</p><p>${temp}°C, ${desc}</p>`;
                hourlyForecastContainer.appendChild(forecastDiv);
            }
        })
        .catch(error => {
            console.error('Error fetching hourly forecast:', error);
            document.getElementById('hourly-forecast').textContent = 'Unable to fetch forecast data.';
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
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                const labels = data.list.slice(0, 7).map((item, index) => `Day ${index + 1}`);
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
    });
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
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                pointRadius: 3,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: true },
                y: { display: true }
            }
        }
    });
}

function closeModal() {
    document.getElementById('chartModal').style.display = 'none';
}

function checkForecastThresholds(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecasts = data.list.slice(0, 16); 
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
                if (temp < 10) {
                    message += `⚠️ Cold Weather Alert: Temperature at ${time} is ${temp}°C. Bundle up to stay warm.\n`;
                } else if (temp > 35) {
                    message += `⚠️ Heatwave Alert: Temperature at ${time} is ${temp}°C. Stay hydrated and avoid sunlight.\n`;
                } else if (temp > 28) {
                    message += `🌡️ Warm Weather Notice: Temperature at ${time} is ${temp}°C. Take precautions to stay cool.\n`;
                }

                if (pressure < 1000) {
                    message += `⚠️ Low Pressure Alert: Pressure at ${time} is ${pressure} hPa. Potential for storms.\n`;
                } else if (pressure > 1025) {
                    message += `🌞 High Pressure Notice: Pressure at ${time} is ${pressure} hPa. Expect clear weather.\n`;
                }

                if (humidity < 30) {
                    message += `⚠️ Low Humidity Alert: Humidity at ${time} is ${humidity}%. Stay hydrated.\n`;
                } else if (humidity > 80) {
                    message += `⚠️ High Humidity Alert: Humidity at ${time} is ${humidity}%. Possible rain.\n`;
                }

                if (windSpeed > 20) {
                    message += `⚠️ Dangerous Wind Alert: Wind speed at ${time} is ${windSpeed} m/s. Avoid outdoor activities.\n`;
                } else if (windSpeed > 10) {
                    message += `⚠️ High Wind Alert: Wind speed at ${time} is ${windSpeed} m/s. Be cautious outside.\n`;
                }

                if (message) {
                    sendSMS(message); 
                    return;
                }
            }
            console.log('No alerts for the next 48 hours.');
        })
        .catch(error => {
            console.error('Error fetching forecast thresholds:', error);
        });
}

function sendSMS(sending_message) {
    const phoneNumber = '+91{your_phone_number}';
    console.log(sending_message);
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
    .then(data => console.log('SMS sent successfully', data))
    .catch(error => console.error('Error sending SMS:', error.message));
}   

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            console.log(`Live Location Detected: Latitude: ${latitude}, Longitude: ${longitude}`); 
            getWeather(latitude, longitude);
        },
        error => {
            let errorMessage = 'Error fetching location: ';
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage += 'User denied the request for Geolocation.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage += 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage += 'The request to get user location timed out.';
                    break;
                case error.UNKNOWN_ERROR:
                    errorMessage += 'An unknown error occurred.';
                    break;
            }
            console.error(errorMessage, error);
            document.getElementById('location').textContent = errorMessage;
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
} else {
    document.getElementById('location').textContent = 'Geolocation is not supported by your browser.';
}



