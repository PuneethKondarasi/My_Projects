# 🚀 My Projects

Welcome to my project repository! This repository serves as a centralized hub for all my ongoing and completed projects, showcasing a diverse range of technologies and skills.

## 📋 Quick Navigation

| Project | Name | Category | Live Demo |
|---------|------|----------|-----------|
| [P01](#p01-credit-card-fraud-detection) | Credit Card Fraud Detection | AI/ML | - |
| [P02](#p02-medical-ai-assistant) | Medical AI Assistant | AI/ML | - |
| [P03](#p03-smart-farming-dashboard) | Smart Farming Dashboard | IoT/ML | - |
| [P04](#p04-syllabus-scout) | Syllabus Scout | Web Dev | [Demo](https://syllabus-scout.netlify.app) |
| [P05](#p05-sms-alert-for-emergency-response-planning) | SMS Alert System | IoT/API | [Demo](https://sms-weather-alert.netlify.app) |
| [P06](#p06-nasa-multimedia-explorer) | NASA Explorer | API/Web | [Demo](https://nasa-media-explorer.netlify.app) |
| [P07](#p07-weather-website) | Weather Website | API/Web | [Demo](https://weathervue-web.netlify.app) |
| [P08](#p08-simon-game-challenge) | Simon Game | Game | [Demo](https://simongame-challenge.netlify.app) |
| [P09](#p09-imap-email-operations) | IMAP Email Operations | Tools | - |
| [P10](#p10-crud-operations-with-react-express-and-mysql) | CRUD Operations | Full-Stack | - |
| [P11](#p11-netflix-clone) | Netflix Clone | Web Dev | - |
| [P12](#p12-drum-kit) | Drum Kit | Interactive | [Demo](https://drum-kit-beats.netlify.app) |
| [P13](#p13-rock-paper-scissors-game) | Rock Paper Scissors | Game | [Demo](https://rock-paper-scissor-throw.netlify.app) |
| [P14](#p14-tic-tac-toe-game) | Tic Tac Toe | Game | [Demo](https://your-tic-tac-toe.netlify.app) |
| [P15](#p15-qr-code-generator) | QR Code Generator | Tools | - |
| [P16](#p16-band-generator-project) | Band Generator | Web Dev | - |

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript, React, Streamlit
- **Backend**: Node.js, Express.js, Flask, Python
- **Databases**: MySQL, Vector Databases (FAISS)
- **AI/ML**: R, Python (scikit-learn, TensorFlow), Google Gemini AI
- **APIs**: OpenWeather, NASA, Google, YouTube, Twilio
- **IoT**: Arduino, Sensors, Real-time data collection
- **Tools**: Git, VS Code, Jupyter Notebooks

---

## 📁 Projects

### P01: Credit Card Fraud Detection

**Description**: Machine learning project using R to detect fraudulent credit card transactions with classification models, threshold optimization, and a Shiny dashboard for real-time analysis.

**Technologies Used**:
- R, Shiny, Machine Learning Libraries (caret, xgboost, ranger)

**Features**:
- **Modeling**: Logistic Regression, Decision Tree, Random Forest, XGBoost
- **Class Imbalance Handling**: ROSE for oversampling
- **Model Evaluation**: ROC, AUC, Precision, Recall
- **Shiny App**: Interactive dashboard for model training and visualization

**Screenshot**:  
![Credit Card Fraud Detection](https://github.com/user-attachments/assets/290fd61b-0693-464c-8f72-349d5fce4cb2)

**Instructions**:
1. Install required R packages (`caret`, `xgboost`, `ROSE`, etc.)
2. Run each script for model training and evaluation
3. Start the Shiny app to interact with the model and visualize results

---

### P02: Medical AI Assistant

**Description**: A sophisticated medical chatbot powered by Google Gemini AI and LangChain, designed to provide accurate medical information using a vector database of medical knowledge from The Gale Encyclopedia of Medicine.

**Technologies Used**:
- Python, Streamlit, LangChain
- Google Gemini 1.5 Flash AI
- FAISS Vector Database
- HuggingFace Transformers

**Key Features**:
- **Medical Knowledge Base**: Powered by The Gale Encyclopedia of Medicine
- **AI-Powered Responses**: Uses Google Gemini 1.5 Flash for intelligent responses
- **Vector Search**: FAISS-based similarity search for relevant medical information
- **Modern UI**: Beautiful Streamlit interface with chat-like experience
- **Context-Aware**: Only responds to medically relevant questions

**Instructions**:
1. Install dependencies: `pip install -r requirements.txt`
2. Set up Google API key in `.env` file
3. Initialize vector database: `python create_memory_for_llm.py`
4. Run application: `streamlit run medibot.py`

**Screenshot**
![Medical Chatbot](https://github.com/user-attachments/assets/72209720-b072-48fa-8bce-9e84e34b933c)

**⚠️ Important**: This is for educational purposes only, not medical advice.

---

### P03: Smart Farming Dashboard

**Description**: A comprehensive smart farming system that collects real-time sensor data, predicts optimal crops using machine learning, and displays insights on a React dashboard.

**Technologies Used**:
- React (Frontend), Flask (Backend)
- Python Machine Learning (scikit-learn)
- Arduino + Sensors (Real-time data collection)
- Chart.js (Data visualization)

**Features**:
- **Real-Time Sensor Data**: Temperature, humidity, soil moisture, rainfall monitoring
- **Crop Prediction**: ML model recommends best crops based on conditions
- **Data Visualization**: Dynamic graphs for environmental trends
- **Notification System**: Real-time alerts for threshold breaches
- **API Integration**: Smooth React-Flask communication with CORS

**Instructions**:
1. **Backend Setup**
```bash
cd backend
python train_model.py
python sensor_server.py
# Open a new terminal
python app.py
```
2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
3. **Access**: Visit `http://localhost:3000` for the dashboard

**Screenshot**
![Smart Farming Dashboard](https://github.com/user-attachments/assets/2878852f-9f24-4ce5-beeb-494937c7796f)

---

### P04: Syllabus Scout

**Description**: A full-stack educational resource discovery platform that helps students find high-quality books and videos based on topics or syllabus content. It simplifies learning by matching users with curated study materials from trusted sources.

**Technologies Used**:
- React + Vite, Tailwind CSS, Framer Motion
- Node.js + Express, MongoDB (Mongoose)
- Open Library API, YouTube Data API

**Features**:
- **Search Topics**: Find relevant study materials by entering any topic or subject name
- **Curated Resources**: Access quality textbooks and video tutorials from global sources
- **Upload Syllabus** (Coming Soon): Upload your syllabus PDF to get personalized recommendations
- **Community** (Coming Soon): Forums and collaborative learning spaces

**Screenshot**:  
![Syllabus Scout](https://github.com/user-attachments/assets/d2cf02a2-b759-4d8b-bbf7-384e65bc3dd4)

**Live Demo**: [Syllabus Scout](https://syllabus-scout.netlify.app)

---

### P05: SMS Alert for Emergency Response Planning

**Description**: Real-time weather monitoring system with SMS alerts when weather parameters exceed thresholds, including forecast monitoring for proactive emergency planning.

**Technologies Used**:
- HTML, CSS, JavaScript (Frontend)
- Node.js, Express.js (Backend)
- OpenWeather API, Twilio API

**Features**:
- **Live Location Tracking**: Automatic geolocation detection
- **Real-Time Weather Data**: Temperature, pressure, humidity, wind speed
- **Forecast Monitoring**: Proactive alerts based on weather predictions
- **SMS Notifications**: Twilio-powered alerts to predefined numbers
- **Threshold Alerts**: Automatic alerts when parameters breach limits

**Screenshot**:  
![SMS Weather Alert](https://github.com/user-attachments/assets/46fc6693-9f09-4357-a2cd-5ddc377de408)

**Live Demo**: [SMS Weather Alert](https://sms-weather-alert.netlify.app)

---

### P06: NASA Multimedia Explorer

**Description**: A modern web application showcasing NASA's incredible collection of space imagery and videos through multiple public APIs. Explore daily astronomy pictures, Mars rover photos, Earth satellite images, and NASA's vast multimedia library.

**Technologies Used**:
- HTML, CSS, JavaScript
- NASA APIs (APOD, Mars Rover, EPIC, Media Library)

**Features**:
- **Astronomy Picture of the Day (APOD)**: Daily space media with descriptions
- **Mars Rover Photos**: Images from Curiosity, Perseverance, Opportunity & Spirit
- **EPIC Earth Images**: Real-time photos from the DSCOVR satellite
- **NASA Media Library**: Search and browse NASA's image/video archives

**Instructions**:
1. Add NASA API key to `config.js`
2. Open `index.html` in browser
3. Explore NASA's multimedia content

**Screenshot**:  
![Nasa Multimedia Screenshot](https://github.com/user-attachments/assets/def10a2c-d0ad-4daa-ac77-597a5ac7a51e)

**Live Demo**: [NASA Media Explorer](https://nasa-media-explorer.netlify.app)

---

### P07: Weather Website

**Description**: A comprehensive weather application providing real-time weather information with location-based search and temperature unit conversion.

**Technologies Used**:
- HTML, CSS, JavaScript
- OpenWeather API

**Features**:
- **Current Weather Information**: Temperature, humidity, wind speed, conditions
- **Location Input**: Search by city name for weather data
- **Temperature Toggle**: Switch between Celsius and Fahrenheit
- **Responsive Design**: Optimal experience on all devices

**Screenshot**:  
![Weather website Screenshot](https://github.com/user-attachments/assets/a5cca623-7414-4df4-9ec4-439bfee06533)

**Live Demo**: [Weather Vue](https://weathervue-web.netlify.app)

---

### P08: Simon Game Challenge

**Description**: Classic Simon memory game with progressive difficulty levels, score tracking, and sound effects.

**Technologies Used**:
- HTML, CSS, JavaScript

**Features**:
- **Progressive Difficulty**: Sequence length increases with each successful round
- **Score Tracking**: Monitor your performance
- **Sound Effects**: Audio feedback for correct and incorrect moves
- **Memory Challenge**: Test and improve your memory skills

**Screenshot**:
![Simon Game Screenshot](https://github.com/PuneethKondarasi/My_Projects/assets/117269882/238f55b8-203b-496c-892e-9a05c4e827f8)

**Live Demo**: [Simon Game](https://simongame-challenge.netlify.app)

---

### P09: IMAP Email Operations

**Description**: A collection of Python scripts for comprehensive email management using IMAP protocol, including folder operations, message handling, and search capabilities.

**Technologies Used**:
- Python, IMAP (Internet Message Access Protocol)

**Scripts**:
- `p1_list_all_folders.py`: Lists all email folders
- `p2_to_access_mails.py`: Email account access and login
- `p3_folder_summary.py`: Folder content summaries
- `p4_message_download.py`: Download messages and attachments
- `p5_flagging.py`: Email flagging and categorization
- `p6_searching.py`: Advanced email search functionality

**Features**:
- **Email Management**: Complete IMAP email operations
- **Folder Operations**: List, access, and manage email folders
- **Message Handling**: Download, flag, and search emails
- **Search Capabilities**: Advanced search with various criteria

**Instructions**:
1. Install dependencies: `pip install imaplib email`
2. Configure email credentials in scripts
3. Run individual scripts for specific operations

---

### P10: CRUD Operations with React, Express, and MySQL

**Description**: Full-stack CRUD application with React frontend, Express.js backend, and MySQL database for managing records through a user-friendly interface.

**Technologies Used**:
- React (Frontend), Express (Backend), MySQL (Database)
- CORS Middleware for cross-origin requests

**Features**:
- **Create**: Add new records to MySQL database
- **Read**: Display all stored records
- **Update**: Edit and update existing records
- **Delete**: Remove records from database
- **Cross-Origin Resource Sharing (CORS)**: Smooth frontend-backend communication

**Screenshot**:
![CRUD Operations Project](https://github.com/user-attachments/assets/63166fd3-2527-4c4a-b71f-79f2087073c8)

**Instructions**:
1. **Backend**: Navigate to backend folder → `npm install` → `node server.js`
2. **Frontend**: Navigate to frontend folder → `npm install` → `npm start`
3. **Access**: Visit `http://localhost:3000` after starting both servers

---

### P11: Netflix Clone

**Description**: A responsive Netflix website clone built with HTML and CSS, featuring the iconic Netflix design and layout.

**Technologies Used**:
- HTML, CSS

**Features**:
- **Responsive Design**: Adapts to different screen sizes
- **Netflix-like Interface**: Mimics the original Netflix design
- **Modern Layout**: Clean and professional appearance

**Screenshot**:
![Netflix Clone Screenshot](https://github.com/PuneethKondarasi/My_Projects/assets/117269882/2adf5403-40eb-4d9c-87aa-e89cc4bd5089)

---

### P12: Drum Kit

**Description**: An interactive drum kit application that allows users to create beats using keyboard controls or mouse clicks with visual feedback.

**Technologies Used**:
- HTML, CSS, JavaScript

**Features**:
- **Keyboard Controls**: Use keys (W, A, S, D, J, K, L) to play different drum sounds
- **Visual Feedback**: Animated effects for each key press
- **Mouse Interaction**: Click buttons on screen to play sounds
- **Beat Creation**: Combine different drum sounds to create rhythms

**Screenshot**:
![Drum Kit](https://github.com/PuneethKondarasi/My_Projects/assets/117269882/44f20c4b-8c66-4b18-bad8-bb642c6e1934)

**Live Demo**: [Drum Kit beats](https://drum-kit-beats.netlify.app)

---

### P13: Rock-Paper-Scissors Game

**Description**: Interactive implementation of the classic Rock-Paper-Scissors game with randomized computer moves and score tracking.

**Technologies Used**:
- HTML, CSS, JavaScript

**Features**:
- **Randomized Computer Moves**: Ensures unpredictable and fair gameplay
- **Score Tracking**: Keeps count of Player Wins, Computer Wins, and Ties
- **Instant Feedback**: Real-time display of game results
- **Cross-Browser Compatibility**: Works on all modern browsers

**Screenshot**:
![Rock-Paper-Scissor Screenshot](https://github.com/PuneethKondarasi/My_Projects/assets/117269882/2d265fd7-bfaf-433b-a095-69a1882c8f09)

**Live Demo**: [Rock Paper Scissor](https://rock-paper-scissor-throw.netlify.app)

---

### P14: Tic Tac Toe Game

**Description**: Classic Tic Tac Toe game with two-player gameplay, real-time win detection, and game reset functionality.

**Technologies Used**:
- HTML, CSS, JavaScript

**Features**:
- **Two-Player Gameplay**: Take turns placing X or O marks
- **Real-Time Win Detection**: Automatically checks for winning combinations
- **Game Reset**: Start new games with the same players
- **Play Again Option**: Quick restart functionality

**Screenshot**:
![Tic Tac Toe Screenshot](https://github.com/PuneethKondarasi/My_Projects/assets/117269882/bb999af8-35a0-4b56-9d43-57f9fe009a77)

**Live Demo**: [Tic Tac Toe](https://your-tic-tac-toe.netlify.app)

---

### P15: QR Code Generator

**Description**: A terminal-based QR code generator that creates unique QR codes for any text or URL input, saving them as PNG files.

**Technologies Used**:
- JavaScript, Node.js

**Features**:
- **QR Code Generation**: Creates QR codes for any text or URL
- **Terminal Interface**: Simple command-line operation
- **PNG Output**: Saves generated QR codes as image files
- **Easy Setup**: Minimal configuration required

**Instructions**:
1. Navigate to project directory
2. `npm install` → `node index.js`
3. Enter URL/text in terminal to generate QR code

---

### P16: Band Generator Project

**Description**: A fun web application that generates unique band names using Node.js and EJS, featuring server-side rendering and customizable name lists.

**Technologies Used**:
- JavaScript, Node.js, EJS

**Features**:
- **Random Band Name Generation**: Unique names on each click
- **User-Friendly Interface**: Clean EJS template design
- **Server-Side Rendering**: Dynamic content rendering
- **Customizable Lists**: Easy modification of word lists

**Screenshot**:
![Band Name generator Project](https://github.com/PuneethKondarasi/My_Projects/assets/117269882/a783127b-2ce8-40c8-b633-daa1176a0d38)

**Instructions**:
1. Navigate to project directory
2. `npm install` → `node index.js`
3. Visit `localhost:3000`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests for any improvements, bug fixes, or new features. When contributing:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request with detailed description

## 📞 Contact

- **Email**: [puneethkondarasi198@email.com]
- **LinkedIn**: [Puneeth Kondarasi](https://www.linkedin.com/in/puneeth-kondarasi/)
- **Portfolio**: [puneethkondarasi.netlify.app](https://puneethkondarasi.netlify.app/)

---

<div align="center">

**Happy coding! 🚀**

*Built with ❤️ by Puneeth Kondarasi*

</div>
