# Art Gallery CRUD Application

This is a full-stack CRUD (Create, Read, Update, Delete) application for managing an art gallery. It consists of a React frontend and an Express/MySQL backend.

## Features

- View all art pieces in the gallery
- Add new art pieces
- Update existing art pieces
- Delete art pieces

## Project Structure

```
P10 CRUD/
  backend/    # Express + MySQL backend
  frontend/   # React frontend
```

---

## Backend (Express + MySQL)

- **Location:** `backend/`
- **Main file:** `server.js`
- **Port:** 8081
- **Database:** MySQL (table: `Artgallery`)

### Endpoints
- `GET    /`                - Get all art pieces
- `POST   /create`          - Add a new art piece
- `PUT    /update/:id`      - Update an art piece by ID
- `DELETE /Artgallery/:id`  - Delete an art piece by ID

> **Note:** The frontend expects the backend to run on `http://localhost:8081`.

### Setup
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create a MySQL database named `crud` and a table `Artgallery`:
   ```sql
   CREATE DATABASE crud;
   USE crud;
   CREATE TABLE Artgallery (
     ID INT AUTO_INCREMENT PRIMARY KEY,
     Title VARCHAR(255),
     Artist VARCHAR(255),
     Year_Created INT,
     Cost VARCHAR(255),
     Medium VARCHAR(255)
   );
   ```
3. Update the MySQL credentials in `backend/server.js` if needed.
4. Start the backend server:
   ```bash
   node server.js
   ```

---

## Frontend (React)

- **Location:** `frontend/`
- **Main file:** `src/App.js`
- **Port:** 3000 (default)

### Pages
- **Home:** View all art pieces, update or delete them
- **Add Art:** Form to add a new art piece
- **Update Art:** Form to update an existing art piece

### Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the frontend:
   ```bash
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage
- Make sure both backend and frontend are running.
- Use the web interface to manage art pieces.

---

## Dependencies

### Backend
- express
- cors
- mysql

### Frontend
- react
- react-router-dom
- axios
- bootstrap

---