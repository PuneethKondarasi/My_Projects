# SMS Alert for Emergency Response Planning

A comprehensive weather monitoring and emergency alert system that provides real-time weather data visualization and automated SMS alerts for dangerous weather conditions.

## 🌟 Features

### Weather Monitoring

- **Real-time Weather Data**: Live temperature, humidity, wind speed, and pressure readings
- **Dynamic Thresholds**: Automatic calculation of min/max values for temperature and pressure
- **Interactive Charts**: Visual representation of weather trends using Chart.js
- **Geolocation**: Automatic location detection for accurate weather data

### Emergency Alert System

- **Automated SMS Alerts**: Sends SMS notifications for dangerous weather conditions
- **Smart Threshold Monitoring**: Monitors multiple weather parameters simultaneously

### User Interface

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Weather Icons**: Visual representation of weather conditions
- **Real-time Updates**: Live data refresh with current weather information

## Project Structure

```
P05 SMS alert for Emergency response planning/
├── Backend/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js             # Express server with Twilio SMS integration
├── Frontend/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   ├── config.js             # API configuration
│   └── icons/
│       ├── Temperature.png
│       ├── Humidity.png
│       ├── Pressure.png
│       └── windspeed.png
└── README.md
```

## 🚀 Technology Stack

### Frontend

- **HTML**: Semantic markup structure
- **CSS**: Modern styling with animations and responsive design
- **JavaScript**: Dynamic weather data handling and API integration
- **Chart.js**: Interactive weather trend visualization
- **OpenWeatherMap API**: Real-time weather data

### Backend

- **Node.js**: Server runtime environment
- **Express.js**: Web server framework
- **Twilio**: SMS messaging service
- **CORS**: Cross-origin resource sharing
- **Body-parser**: Request body parsing

## 📋 Prerequisites

Before running this project, ensure you have:

1. **Node.js** (v14 or higher) installed
2. **OpenWeatherMap API Key** (free tier available)
3. **Twilio Account** with:
   - Account SID
   - Auth Token
   - Twilio phone number

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository>
cd "P05 SMS alert for Emergency response planning"
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the Backend directory:

```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+your_twilio_number
```

### 4. Update Configuration Files

**Backend/server.js** (lines 22-24):

```javascript
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
```

**Frontend/script.js** (line 209):

```javascript
const phoneNumber = "+your_actual_phone_number";
```

**Frontend/config.js**:

```javascript
const config = {
  apiKey: "your_openweathermap_api_key",
};
```

### 5. Start the Backend Server

```bash
cd Backend
node server.js
```

Server will run on `http://localhost:3000`

### 6. Open the Frontend

Open `Frontend/index.html` in your web browser or serve it using a local server.

### SMS Alert Messages

The system sends contextual alerts with:

- ⚠️ Emergency warnings for dangerous conditions
- 🌡️ Temperature advisories
- 🌞 Weather condition notices
- Detailed time and measurement information

## 📱 Usage

1. **Access the Application**: Open the frontend in your browser
2. **Location Permission**: Allow location access for accurate weather data
3. **View Weather Data**: Monitor real-time weather conditions
4. **Check Forecasts**: View hourly and daily weather predictions
5. **Analyze Trends**: Click "Full Graph" buttons for detailed charts
6. **Receive Alerts**: SMS notifications are sent automatically for dangerous conditions

## 🛠️ API Endpoints

### Backend Server (`http://localhost:3000`)

- `GET /`: Health check endpoint
- `POST /send-sms`: Send SMS alerts
  - Body: `{ "phoneNumber": "+1234567890", "message": "Alert text" }`

### External APIs

- **OpenWeatherMap API**: Weather data and forecasts
- **Twilio SMS API**: Message delivery service

## 📈 Future Enhancements

- [ ] Multi-language support
- [ ] Email alert integration
- [ ] Push notification support
- [ ] Historical weather data analysis
- [ ] Custom alert scheduling
- [ ] Weather radar integration
- [ ] Emergency contact management
- [ ] Weather-based route planning

---

**Puneeth Kondarasi**

- [GitHub](https://github.com/puneethkondarasi)
- [LinkedIn](https://www.linkedin.com/in/puneethkondarasi/)

---

## Made with ❤️ by Puneeth Kondarasi.
