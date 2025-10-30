# WeatherVue - Modern Weather Application

A sleek, modern weather application with a beautiful dark theme and professional UI design.

## ✨ Features

### 🌟 Modern UI/UX
- **Dark/Light Theme**: Toggle between dark and light themes with smooth transitions
- **Responsive Design**: Fully responsive layout that works on all devices
- **Smooth Animations**: Beautiful hover effects and transitions
- **Professional Design**: Modern glassmorphism design with backdrop blur effects

### 🔍 Weather Information
- **Current Weather**: Real-time weather data with detailed information
- **5-Day Forecast**: Extended weather forecast with daily predictions
- **Detailed Metrics**: 
  - Temperature (current, high, low, feels like)
  - Humidity percentage
  - Wind speed and direction
  - Visibility
  - Atmospheric pressure
  - UV index

### 📍 Location Features
- **City Search**: Search for any city worldwide
- **Current Location**: Get weather for your current location using GPS
- **Location Memory**: Remembers your last searched city

### ⚙️ User Preferences
- **Temperature Units**: Toggle between Celsius (°C) and Fahrenheit (°F)
- **Theme Persistence**: Your theme preference is saved locally
- **Unit Persistence**: Your temperature unit preference is saved

### 🎨 Design Highlights
- **Glassmorphism**: Modern glass-like card designs with backdrop blur
- **Gradient Accents**: Beautiful gradient colors for highlights
- **Typography**: Clean Inter font for excellent readability
- **Icons**: Font Awesome icons throughout the interface
- **Smooth Scrolling**: Enhanced user experience with smooth animations

## 🚀 Getting Started

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Enter a city name or use the location button to get started

### API Configuration
The application uses the OpenWeatherMap API. The API key is configured in `config.js`:

```javascript
const config = {
    apiKey: "your-api-key-here"
};
```

## 🛠️ Technical Details

### Technologies Used
- **HTML**: Semantic markup structure
- **CSS**: Modern styling with CSS variables and flexbox/grid
- **JavaScript**: Modern JavaScript with async/await

### Key Features Implementation
- **Theme Switching**: CSS custom properties for dynamic theming
- **Local Storage**: Persistent user preferences
- **Geolocation API**: Current location detection
- **Weather API**: OpenWeatherMap integration
- **Error Handling**: Comprehensive error handling with user-friendly messages

### File Structure
```
weather-website/
├── index.html          # Main HTML structure
├── style.css           # Modern CSS styling
├── script.js           # JavaScript functionality
├── config.js           # API configuration
└── README.md           # Documentation
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

---

**WeatherVue** - Bringing modern design to weather information! 🌤️ 