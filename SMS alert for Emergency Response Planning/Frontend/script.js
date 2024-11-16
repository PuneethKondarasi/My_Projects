const apiKey = 'Your OpenWeatherMap API Key'; // Replace with your OpenWeatherMap API key
let weatherChart; // Variable to hold the Chart.js instance

function getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const location = `${data.name}, ${data.sys.country}`;
            const temperature = data.main.temp;
            const tempMin = data.main.temp_min;
            const tempMax = data.main.temp_max;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const pressure = data.main.pressure;
            document.getElementById('location').textContent = `Location: ${location}`;
            document.getElementById('temp-current').textContent = `${temperature} °C`;
            document.getElementById('temp-min').textContent = `${tempMin} °C`;
            document.getElementById('temp-max').textContent = `${tempMax} °C`;
            const pressureMin = pressure - 7;
            const pressureMax = pressure + 12;
            document.getElementById('pressure-min').textContent = `${pressureMin} hPa`;
            document.getElementById('pressure-max').textContent = `${pressureMax} hPa`;
            document.getElementById('humidity-current').textContent = `${humidity} %`;
            document.getElementById('wind-current').textContent = `${windSpeed} m/s`;
            document.getElementById('pressure-current').textContent = `${pressure} hPa`;
            getHourlyForecast(lat, lon);
            checkWeatherThresholds(temperature, pressure, humidity, windSpeed);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-container').textContent = 'Unable to fetch weather data.';
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

// Function to check if weather thresholds are crossed and send SMS
function checkWeatherThresholds(temperature, pressure, humidity, windSpeed) {
    const temperatureThreshold = 28; // Example threshold for temperature
    const pressureThreshold = 1020; // Example threshold for pressure
    const humidityThreshold = 100; // Example threshold for humidity
    const windSpeedThreshold = 3; // Example threshold for wind speed

    let message = '';

    if (temperature < temperatureThreshold) {
        message += `Weather Alerts \n`;
        message += `⚠️ Temperature Alert: The temperature has dropped below the safe threshold of ${temperatureThreshold}°C. Current temperature is ${temperature}°C. Please stay warm.\n`;
    }

    if (pressure < pressureThreshold) {
        message += `⚠️ Pressure Alert: Atmospheric pressure is lower than the threshold of ${pressureThreshold} hPa. Current pressure is ${pressure} hPa. Low pressure can indicate possible storms or bad weather.\n`;
    }

    if (humidity < humidityThreshold) {
        message += `⚠️ Humidity Alert: Humidity levels are below ${humidityThreshold}%. Current humidity is ${humidity}%. Low humidity may cause dry skin or respiratory discomfort.\n`;
    }

    if (windSpeed > windSpeedThreshold) {
        message += `⚠️ Wind Speed Alert: Wind speed has exceeded the safe level of ${windSpeedThreshold} m/s. Current wind speed is ${windSpeed} m/s. Secure any outdoor items and avoid open areas.\n`;
    }

    if (message) {
        sendSMS(message);
    }
}


// Function to send an SMS through the backend
function sendSMS(sending_message) {
    const phoneNumber = 'Your Phone Number'; // Replace with your phone number
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

// function sendSMS(sending_message) {
//     var numbersToMessage = ["Number1","Number2"];
    
//     numbersToMessage.forEach(phoneNumber => {
//         console.log(`Sending message to: ${phoneNumber}`);

//         fetch('http://localhost:3000/send-sms', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 phoneNumber: phoneNumber,
//                 message: sending_message,
//             }),
//         })
//         .then(response => {
//             if (!response.ok) {
//                 return response.json().then(errorData => {
//                     throw new Error(errorData.error || 'Unknown error');
//                 });
//             }
//             return response.json();
//         })
//         .then(data => console.log(`SMS sent successfully to ${phoneNumber}`, data))
//         .catch(error => console.error(`Error sending SMS to ${phoneNumber}:`, error.message));
//     });
// }


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



