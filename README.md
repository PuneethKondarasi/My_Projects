# My_Projects

Welcome to my project repository! This repository serves as a centralized hub for all my ongoing and completed projects.

## Projects

### 1. Band Generator Project

**Description**: Welcome to the Band Name Generator! This project generates a different band name every time you use it.

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

### 2. CRUD Operations with React, Express, and MySQL

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

### 3. Drum Kit

**Description**: This is a Drum Kit through which you can create your own beats.

**Technologies Used**:

- HTML
- CSS
- JavaScript

**Features**:

- Play different drum sounds using keyboard keys or by clicking on the buttons on screen.
- Visual feedback for each key press.

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

### 4. IMAP Email Operations with Python

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

- **List Folders**: Retrieve a list of all folders in the email account.
- **Access Emails**: Connect to the IMAP server and access the user's inbox.
- **Folder Summary**: Get a summary of emails in each folder, including unread, flagged, and total count.
- **Message Download**: Download email messages or their attachments.
- **Flagging Emails**: Mark messages for follow-up or other categories.
- **Search Emails**: Perform searches within email folders based on criteria like date, sender, subject, etc.

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

---

### 5. Netflix Clone

**Description**: This project is a clone of the Netflix website, built using **HTML and CSS**. It mimics the layout of Netflix.

**Screenshot**:
![Netflix Clone Screenshot](https://github.com/PuneethKondarasi/My_Projects/assets/117269882/2adf5403-40eb-4d9c-87aa-e89cc4bd5089)

---

### 6. QR Code Project

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

### 7. Rock-Paper-Scissors Game

**Description**: Welcome to the Rock-Paper-Scissors Game! This project is a simple yet fun implementation of the classic Rock-Paper-Scissors game. It allows a player to compete against the computer in a graphical, easy-to-use interface.

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
   - The player chooses one of the three options: Rock 🪨, Paper 📄, or Scissors ✂️.
   - The computer randomly selects one of the options.
   - The winner is determined based on the following rules:
     - Rock crushes Scissors
     - Scissors cuts Paper
     - Paper covers Rock
2. **Winning the Game**:-
   - If the player wins, a message "You Won!" will be displayed.
   - If the computer wins, a message "You Lost!" will be displayed.
   - If it's a tie, a message "It's a Draw!" will be displayed.
3. **Scores**:-
   - The game keeps track of the number of wins, losses, and ties.

**Live Demo**: [Rock Paper Scissor](https://rock-paper-scissor-throw.netlify.app)

---

### 8. SMS Alert for Emergency Response Planning

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

### 9. Syllabus Scout

**Description**:  
**Syllabus Scout** is a web application designed to help students find relevant study materials based on specific topics or syllabi. Whether you're looking for textbooks, articles, videos, or practice problems, Syllabus Scout aggregates various resources in one place to help students get a head start on their coursework. It simplifies the process of locating quality study materials, making it easier for students to prepare for their classes efficiently.

**Technologies Used**:

- **Frontend**:
  - HTML
  - CSS
  - JavaScript
- **Backend**:
  - Express.js (for API handling)
- **APIs**:
  - Google API (to fetch relevant book resources)
  - YouTube Data API (to fetch educational videos)

**Features**:

- **Search Functionality**:
  - Allows users to search for study materials based on a given topic, course name, or keyword.
  - Returns a list of relevant resources, including articles, videos, and other materials.
- **Responsive Design**:

  - The web app is fully responsive, ensuring a smooth user experience on both desktop and mobile devices.

- **User-Friendly Interface**:
  - A clean and intuitive UI built offering a seamless search experience.
- **API Integration**:
  - Integrates with multiple third-party APIs (Google API and YouTube API) to gather relevant resources.

**Screenshot**:  
![Syllabus Scout](https://github.com/user-attachments/assets/55880e47-84df-403b-95bb-7471dcfbb881)

**Live Demo**: [Syllabus Scout](https://syllabus-scout.netlify.app)

---

### 10. Tic Tac Toe Game

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

### 11. Weather Website

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

## Contribution

Contributions are welcome! Please submit a pull request for any improvements or bug fixes.

## Contact

If you have any questions or suggestions, you can reach me at [puneethkondarasi198@email.com].

Happy coding!
