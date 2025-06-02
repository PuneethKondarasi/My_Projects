# My_Projects

Welcome to my project repository! This repository serves as a centralized hub for all my ongoing and completed projects.

## Projects

### P01. Credit Card Fraud Detection Using Machine Learning and R Programming

**Description**: This project uses machine learning techniques in **R** to detect fraudulent credit card transactions. It leverages classification models, threshold optimization, and a **Shiny dashboard** for real-time analysis.

**Technologies Used**:

- R
- Shiny
- Machine Learning Libraries (caret, xgboost, ranger)

**Features**:

- **Modeling**: Logistic Regression, Decision Tree, Random Forest, XGBoost
- **Class Imbalance Handling**: ROSE for oversampling
- **Model Evaluation**: ROC, AUC, Precision, Recall
- **Shiny App**: Interactive dashboard for model training, threshold setting, and visualization

**Screenshot**:  
![Image](https://github.com/user-attachments/assets/290fd61b-0693-464c-8f72-349d5fce4cb2)

**Instructions**:

1. **Run the R Scripts**:

   - Install required R packages (`caret`, `xgboost`, `ROSE`, etc.).
   - Run each script for model training and evaluation.

2. **Start the Shiny App**:

   - Run the Shiny app to interact with the model and visualize results.

**Website**:  
- Access the interactive Shiny app after running the scripts locally.
  
---

### P02. Smart Farming Dashboard with React, Flask, and Machine Learning

**Description**:  
This project builds a **Smart Farming Dashboard** that collects real-time sensor data (temperature, humidity, soil moisture, and rainfall), predicts the best crop to plant based on conditions using a machine learning model, and displays insights on a React frontend. The backend uses Flask to manage data processing, model inference, and API endpoints.

**Technologies Used**:

- **React** (Frontend Framework)
- **Flask** (Backend Server)
- **Python Machine Learning Model** (Crop Recommendation)
- **Arduino + Sensors** (Real-time data collection)
- **Axios** (for API calls)
- **Chart.js** (for graphical data representation)

**Dependencies**:

- Flask
- Flask-CORS
- scikit-learn
- numpy
- pandas
- axios (in React)
- react-chartjs-2

**Features**:

- **Real-Time Sensor Data Display**: Visualize live environmental readings on the dashboard.
- **Crop Prediction**: Get instant crop recommendations based on sensor data using a trained machine learning model.
- **Data Visualization**: Monitor environmental trends with dynamic graphs for temperature, humidity, soil moisture, and rainfall.
- **Manual Data Refresh**: Option to manually update displayed sensor readings.
- **Notification System**: Get real-time alerts when environmental thresholds are breached.
- **API Integration**: Communicate smoothly between React frontend and Flask backend with CORS enabled.

**Screenshot**:![Image](https://github.com/user-attachments/assets/9894f3d1-5b3e-418d-bada-df36605482c9)

**Instructions**:

1. **Start the Backend (Flask + Machine Learning)**:

   - Connect the sensors to **COM4** port
   - Navigate to the backend project folder.
   - Start the Flask server using `python app.py`.
   - The server will run at `http://localhost:5000`.

2. **Start the Frontend (React Dashboard)**:

   - Navigate to the React frontend folder.
   - Run `npm install` to install all React dependencies.
   - Start the React app using `npm run dev`
   - The dashboard will be live at `http://localhost:3000`.

3. **Testing the Crop Prediction API with Postman**:

   - Send a **POST** request to `http://localhost:5000/predict`.
   - Use **raw JSON** body format like:

     ```json
     {
       "temperature": 28,
       "humidity": 60,
       "moisture": 400,
       "rainfall": 5
     }
     ```

   - Get the recommended crop and model confidence score in the response.

**Website**:

- Visit `http://localhost:3000` to access the Smart Farming Dashboard after starting both servers.

---

### P03. Syllabus Scout

**Description**:  
**Syllabus Scout** is a full-stack educational resource discovery platform that helps students find high-quality books and videos based on topics or syllabus content. It simplifies learning by matching users with curated study materials from trusted sources, promoting accessible education for all.

**Technologies Used**:

- **Frontend**:
   - React + Vite  
   - Tailwind CSS  
   - Framer Motion  
   - React Icons 
- **Backend**:
   - Node.js + Express  
   - MongoDB (Mongoose)  
   - Open Library API  
   - YouTube Data API  

**Features**:
- 🔍 **Search Topics**: Find relevant study materials by entering any topic or subject name.  
- 📚 **Curated Resources**: Access quality textbooks and video tutorials from global sources.  
- 📄 **Upload Syllabus** (Coming Soon): Upload your syllabus PDF to get personalized recommendations.  
- 👥 **Community** (Coming Soon): Forums and collaborative learning spaces to support peer learning.

**Screenshot**:  
![Syllabus Scout](https://github.com/user-attachments/assets/55880e47-84df-403b-95bb-7471dcfbb881)

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/PuneethKondarasi/Syllabus-Scout
cd syllabus-scout
```

**Frontend**

```bash
cd client
npm install
```

**Backend**

```bash
cd ../server
npm install
```

### 2. Create `.env` file

In `/server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
YOUTUBE_API_KEY=your_youtube_api_key
```

### 3. Run the app

**Start backend**

```bash
cd server
npm run dev
```

**Start frontend**

```bash
cd ../client
npm run dev
```

**Live Demo**: [Syllabus Scout](https://syllabus-scout.netlify.app)

---

### P04. SMS Alert for Emergency Response Planning

**Description**:  
The **SMS Alert for Emergency Response Planning** provides real-time weather data and sends **SMS alerts** when weather parameters exceed or fall below thresholds. This system not only checks live weather data but also forecasts the weather, sending proactive alerts to users phone numbers. This feature helps ensure timely responses for emergency planning and preparation based on weather changes.

**Technologies Used**:

- **Frontend**:
  - HTML
  - CSS
  - JavaScript
- **Backend**:
  - Node.js
  - Express.js
- **APIs**:
  - OpenWeather API (for real-time weather data)
  - Twilio API (for sending SMS alerts)

**Features**:

- **Live Location Tracking**:
  - Automatically fetches the user's live location using geolocation.
- **Real-Time Weather Data**:

  - Provides detailed information such as temperature, pressure, humidity, wind speed, and other weather parameters.

- **Forecast Monitoring**:

  - Checks weather forecast and compares them against thresholds.
  - Sends proactive alerts via SMS if the weather parameters are expected to exceed or fall below thresholds.

- **Threshold Alerts**:

  - Automatically generates alerts when weather parameters breach thresholds, ensuring users are alerted in advance for necessary emergency responses.

- **SMS Notifications**:

  - Sends SMS alerts to predefined phone numbers using the **Twilio API** when weather conditions exceed or fall below the defined thresholds.

- **Error Handling**:
  - Handles location access issues and displays error messages if location data is unavailable or access is denied.

**Screenshot**:  
![Screenshot 2024-11-14 130309](https://github.com/user-attachments/assets/9681ebf0-fcea-4f4a-baa2-1b87e2ebc4ff)

**Instructions**:

1. **Setup the Application**:

   - Clone the repository from GitHub.
   - Navigate to the project directory in your terminal.
   - Install the required dependencies using:
     ```bash
     npm install
     ```
   - Replace the placeholders in the code with your **OpenWeather** and **Twilio** API keys.

2. **Running the Application**:

   - Start the backend server using:
     ```bash
     node server.js
     ```
   - Open your browser and navigate to:
     ```bash
     http://localhost:3000
     ```

3. **Using the Application**:

   - Allow location access when prompted to view live weather data.
   - If location access is denied, an error message will be displayed.
   - Weather alerts will be sent via SMS to predefined phone numbers when the thresholds are breached in the next two-day forecast.

**Live Demo**: [SMS Weather Alert](https://sms-weather-alert.netlify.app)

---

### P05. NASA Explorer

**Description**:  
The **NASA Multimedia Explorer** is a modern web application that showcases NASA's incredible collection of space imagery and videos using multiple public APIs. This app allows users to explore daily astronomy pictures, Mars rover photos, real-time Earth satellite images, and NASA's vast multimedia library — all in one place.

**Features**

- **Astronomy Picture of the Day (APOD)**  
  View NASA's daily space photo/video with explanations.

- **Mars Rover Photos**  
  Fetch photos from NASA rovers: Curiosity, Perseverance, Opportunity, and Spirit.

- **EPIC Earth Images**  
  View Earth images from the DSCOVR satellite (NASA EPIC camera).

- **NASA Media Library**  
  Search and browse NASA’s massive image and video archives.

**Technologies Used**:

- **Frontend**:
  - HTML
  - CSS
  - JavaScript
- **APIs**:
  - [NASA APOD API](https://api.nasa.gov/)
  - [NASA Mars Rover Photos API](https://api.nasa.gov/)
  - [NASA EPIC API](https://epic.gsfc.nasa.gov/)
  - [NASA Image & Video Library API](https://images.nasa.gov/)

**Screenshot**:  
![NASA Explorer Screenshot](https://github.com/user-attachments/assets/13f9c7a1-729b-4c7c-a647-40826dc1c32d)


**Instructions**:

### Option 1: Open Directly in Browser

1. Download or clone the repository:

   ```bash
   git clone https://github.com/yourusername/nasa-explorer.git
   cd nasa-explorer
   ```

2. **Add your API key** to a new `config.js` file in the project root folder:

   Create a file named `config.js` and add the following:

   ```javascript
   // config.js
   const config = {
     apiKey: "YOUR_API_KEY",
   };
   ```

3. Open the `index.html` file in your preferred browser.

**Live Demo**: [NASA Explorer](https://nasa-media-explorer.netlify.app/)

---

### P06. Weather Website

**Description**:  
The **Weather Website** is a web application that provides users with up-to-date weather information based on their specified location. The app fetches real-time weather data from a weather API and presents it in a clean, user-friendly interface. Key details include the current temperature, humidity, and weather conditions. Additionally, users can toggle between Celsius and Fahrenheit to view temperature readings in their preferred unit.

**Technologies Used**:

- **Frontend**:
  - HTML
  - CSS
  - JavaScript
- **API**:
  - OpenWeather API (to fetch real-time weather data)

**Features**:

- **Current Weather Information**:
  - Displays real-time weather data including temperature, humidity, wind speed, and weather conditions (e.g., clear, cloudy, rainy).
- **Location Input**:
  - Users can specify a city by entering its name in a search bar, allowing the app to fetch weather information for that location.
- **Celsius to Fahrenheit Toggle**:
  - Users can easily switch between Celsius and Fahrenheit for temperature readings with a single click, offering flexibility and convenience.
- **Responsive Design**:
  - Fully responsive layout ensuring an optimal experience on both desktop and mobile devices.

**Screenshot**:  
![Weather website Screenshot](https://github.com/user-attachments/assets/d867c634-bf0b-4779-b4fb-f83e0eaff5ab)

**Instructions**:

1. **Enter a City**:
   - Type the name of the city in the search bar at the top of the page.
2. **Submit the Search**:
   - Click the **"Submit"** button to fetch the weather data for the specified location.
3. **View the Weather**:
   - The weather information for the specified city will be displayed, including the current temperature, humidity, and weather conditions.
4. **Toggle Between Celsius and Fahrenheit**:
   - Click on the **"Switch to Fahrenheit"** or **"Switch to Celsius"** button to toggle the temperature unit.

**Live Demo**: [Weather Scout](https://weather-scout.netlify.app)

---

### P07. Simon Game Challenge

**Description**: Experience the classic Simon game here, created using **HTML, CSS, and JavaScript**. Challenge your memory with increasingly complex sequences of colors.

**Features**:

- Progressive difficulty levels
- Score tracking
- Sound effects for correct and incorrect moves

**Screenshot**:
![Simon Game Screenshot](https://github.com/PuneethKondarasi/My_Projects/assets/117269882/238f55b8-203b-496c-892e-9a05c4e827f8)

**Instructions**:

1. **Start the Game**:
   - press any key to start the game
2. **Gameplay**:
   - The game will show a sequence of colors and sounds.
   - Repeat the sequence by clicking on the colored buttons.
   - The sequence length increases with each successful round.
3. **Scoring**:
   - The game ends when you make a mistake or complete all rounds.

**Live Demo**: [Simon Game](https://simongame-challenge.netlify.app)

---

### P08. IMAP Email Operations with Python

**Description**: This project involves a series of Python scripts that perform different IMAP operations to interact with email servers. These scripts help manage and manipulate email folders, retrieve messages, download attachments, flag emails, and perform searches on the inbox.

**Technologies Used**:

- Python
- IMAP (Internet Message Access Protocol)

**Scripts**:

- `p1_list_all_folders.py`: Lists all folders available in the email account using IMAP.
- `p2_to_access_mails.py`: Accesses and logs into the email account via IMAP.
- `p3_folder_summary.py`: Provides a summary of the contents of email folders.
- `p4_message_download.py`: Downloads email messages or attachments from the inbox.
- `p5_flagging.py`: Flags or marks messages for follow-up or other purposes.
- `p6_searching.py`: Searches for specific emails or messages based on various criteria.

**Features**:

- **List Folders**  
  Retrieve a list of all folders in the email account.
- **Access Emails**  
  Connect to the IMAP server and access email messages from the inbox.
- **Folder Summary**  
  Get a summary of emails in each folder, including unread, flagged, and total counts.
- **Message Download**  
  Download email messages and attachments for offline access.
- **Flagging Emails**  
  Flag messages for follow-up or categorize them for future reference.
- **Search Emails**  
  Perform searches within email folders based on criteria like date, sender, and subject.

**Instructions**:

1. **Install Dependencies**:

   - Ensure you have Python installed on your system.
   - Install the necessary Python libraries using `pip`:
     ```bash
     pip install imaplib email
     ```

2. **Run the Scripts**:

   - Navigate to the directory containing the scripts.
   - Execute each script using the following command:
     ```bash
     python <script_name>.py
     ```
   - Each script performs a different IMAP operation, so you can run them independently or in sequence.

3. **Configuration**:

   - Ensure you have access to an IMAP-enabled email account (like Gmail, Yahoo, etc.).
   - Modify the script configuration where necessary to set your email server, username, password, and other required details.

   Example usage in `p2_to_access_mails.py`:

   ```python

   imap = imaplib.IMAP4_SSL("imap.gmail.com")
   username = "your_email@gmail.com"  # Replace with your Gmail account
   password = "your_password"         # Replace with your password
   imap.login(username, password)
   ```

---

### P09. CRUD Operations with React, Express, and MySQL

**Description**: This project implements a simple CRUD (Create, Read, Update, Delete) application. The frontend is built with React, while the backend uses Express.js and connects to a MySQL database. This application allows users to manage records in a MySQL database through a user-friendly React interface.

**Technologies Used**:

- React (Frontend)
- Express (Backend)
- MySQL (Database)
- CORS Middleware for handling cross-origin requests

**Dependencies**:

- cors
- express
- mysql

**Features**:

- **Create**: Add new records to the MySQL database through the React interface.
- **Read**: Display all records stored in the MySQL database.
- **Update**: Edit and update existing records in the database.
- **Delete**: Remove records from the MySQL database.
- **Cross-Origin Resource Sharing (CORS)**: Ensures smooth communication between React frontend and Express backend.

**Screenshot**:
![CRUD Operations Project](https://github.com/user-attachments/assets/63166fd3-2527-4c4a-b71f-79f2087073c8)

**Instructions**:

1. **Start the Backend (Express + MySQL)**:

   - Navigate to the backend folder in your terminal.
   - Run `npm install` to install all the required dependencies.
   - Ensure that your MySQL database is set up with the appropriate tables and data.
   - Run the Express server using `node server.js` or `npm start` (depending on your setup).
   - The server will run on `http://localhost:5000` (or another port if configured differently).

2. **Start the Frontend (React)**:

   - Navigate to the frontend folder in your terminal.
   - Run `npm install` to install all the required dependencies.
   - Start the React application with `npm start`.
   - The frontend will run on `http://localhost:3000`.

3. **Interacting with the Application**:
   - Use the React interface to create, read, update, or delete records.
   - The backend (Express) will handle requests and interact with the MySQL database.

**Website**:

- You can interact with the application on the frontend by visiting `http://localhost:3000` after running both servers.

---

### P10. Netflix Clone

**Description**: This project is a clone of the Netflix website, built using **HTML and CSS**. It mimics the layout of Netflix.

**Screenshot**:
![Netflix Clone Screenshot](https://github.com/PuneethKondarasi/My_Projects/assets/117269882/2adf5403-40eb-4d9c-87aa-e89cc4bd5089)

---

### P11. Drum Kit

**Description**: This is a Drum Kit through which you can create your own beats.

**Technologies Used**:

- HTML
- CSS
- JavaScript

**Features**:

- Play different drum sounds using keyboard keys or by clicking on the buttons on screen.
- Visual feedback for each key press.
- Combine different drum sounds to create your own rhythms and patterns.

**Screenshot**:
![Drum Kit](https://github.com/PuneethKondarasi/My_Projects/assets/117269882/44f20c4b-8c66-4b18-bad8-bb642c6e1934)

**Instructions**:

1. **Start the Application**:
   - Open the `index.html` file in your web browser.
2. **Play the Drums**:
   - Press the corresponding keys (W, A, S, D, J, K, L) on your keyboard or the buttons on screen to play different drum sounds.
   - Visual feedback will appear for each key press.
3. **Create Beats**:
   - Combine the drum sounds to create your own beats and rhythms.

**Live Demo**: [Drum Kit beats](https://drum-kit-beats.netlify.app)

---

### P12. Rock-Paper-Scissors Game

**Description**: This project is a fun, interactive implementation of the classic Rock-Paper-Scissors game. Players compete against the computer in a simple, graphical interface.

**Technologies Used**:

- HTML
- CSS
- JavaScript

**Features**:

- Randomized Computer Moves: Ensures unpredictable and fair gameplay.
- Score Tracking: Keeps count of Player Wins, Computer Wins, and Ties.
- Easy Setup: Simply open index.html to start playing.
- Instant Feedback: Real-time display of game results.
- Cross-Browser Compatibility: Works on Chrome, Firefox, Safari, and Edge.

**Screenshot**:
![Rock-Paper-Scissor Screenshot](https://github.com/PuneethKondarasi/My_Projects/assets/117269882/2d265fd7-bfaf-433b-a095-69a1882c8f09)

**Instructions**:

1. **Start the Game**:
   - Open `index.html` in any modern web browser.
   - The player chooses one of the three options: Rock 🪨, Paper 📄, or Scissors ✂️.
   - The computer randomly selects one of the options.
   - The winner is determined based on the following rules:
     - Rock crushes Scissors
     - Scissors cuts Paper
     - Paper covers Rock
3. **Winning the Game**:-
   - If the player wins, a message "You Won!" will be displayed.
   - If the computer wins, a message "You Lost!" will be displayed.
   - If it's a tie, a message "It's a Draw!" will be displayed.
4. **Scores**:-
   - The game keeps track of the number of wins, losses, and ties.

**Live Demo**: [Rock Paper Scissor](https://rock-paper-scissor-throw.netlify.app)

---

### P13. Tic Tac Toe Game

**Description**: This project is a basic implementation of the classic Tic Tac Toe game. Players can take turns to place their marks (X or O) on the 3x3 grid. The game announces the winner once a player successfully places three of their marks in a horizontal, vertical, or diagonal row.

**Technologies Used**:

- HTML
- CSS
- JavaScript

**Features**:

- Two-player gameplay
- Real-time win detection
- Game reset functionality
- Play again option

**Screenshot**:
![Tic Tac Toe Screenshot](https://github.com/PuneethKondarasi/My_Projects/assets/117269882/bb999af8-35a0-4b56-9d43-57f9fe009a77)

**Instructions**:

1. **Start the Game**:
   - The game begins with an empty 3x3 grid.
   - Player X starts first. Players take turns to click on an empty cell to place their mark (X or O).
2. **Winning the Game**:
   - The game will automatically check for a winner after each move.
   - A player wins by placing three of their marks in a horizontal, vertical, or diagonal row.
   - Once a player wins, a message will be displayed announcing the winner.
3. **Play Again**:
   - Click the "Play Again" button to start a new game with the same players.
4. **Reset Game**:
   - Click the "Reset Game" button to clear the board and reset the game.

**Live Demo**: [Tic Tac Toe](https://your-tic-tac-toe.netlify.app)

---

### P14. QR Code Project

**Description**: Welcome to the QR Code Generator! This project allows you to generate QR codes for any input text or URL.

**Technologies Used**:

- JavaScript
  - Node

**Features**:

- QR Code Generation: Generates a unique QR code for any text or URL input.
- Works through the terminal

**Instructions**:

1. **Start the Application**:

   - Navigate to the Directory in which it is available.
   - Open this folder in the terminal.
   - install all the required dependencies by using `npm install`.
   - Run `node index.js` in terminal for the application to run.

2. **Terminal**:
   - You will be able to give the URL of the Website that you want to convert into QR Code in the terminal and click enter.
   - After this the QR gets saved as a png file.

---

### P15. Band Generator Project

**Description**: The Band Name Generator is a fun web application that generates a new, unique band name every time you use it. Built with Node.js and EJS, it features a clean interface and server-side rendering.

**Technologies Used**:

- JavaScript
  - Node
  - EJS

**Features**:

- Random Band Name Generation: Generates a unique band name every time you click the "Generate" button.
- User-Friendly Interface: Clean and simple design using EJS templates for an intuitive user experience.
- Server-Side Rendering: Utilizes Node.js and EJS for dynamic content rendering on the server side.
- Customizable Name Lists: Easily modify the list of words used for generating band names to suit different themes or preferences.

**Screenshot**:
![Band Name generator Project](https://github.com/PuneethKondarasi/My_Projects/assets/117269882/a783127b-2ce8-40c8-b633-daa1176a0d38)

**Instructions**:

1. **Start the Application**:

   - Navigate to the Directory in which it is available.
   - Open this folder in the terminal.
   - Install all the required dependencies by using `npm install`.
   - Run `node index.js` in terminal for the application to run.
   - Go to `localhost:3000` to view this website.

2. **Website**:
   - Click on Generate Name to generate new band name every single time you click on it.

---

## Contribution

Contributions are welcome! Please submit a pull request for any improvements or bug fixes.

## Contact

If you have any questions or suggestions, you can reach me at [puneethkondarasi198@email.com].

Happy coding!
