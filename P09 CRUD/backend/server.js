const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 8081;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM Artgallery";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json("Error fetching data");
        return res.json(result); 
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO Artgallery (Title, Artist, Year_Created, Cost, Medium) VALUES (?)";
    const values = [
        req.body.title, 
        req.body.artist, 
        req.body.year, 
        req.body.cost, 
        req.body.medium
    ];
    
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inserting data", error: err.message });
        }
        return res.json(result);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "update Artgallery set Title = ?, Artist = ?, Year_Created = ?, Cost = ?, Medium = ? where ID = ?";
    const values = [
        req.body.title, 
        req.body.artist, 
        req.body.year, 
        req.body.cost, 
        req.body.medium
    ];

    const id = req.params.id;
    
    db.query(sql, [...values, id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inserting data", error: err.message });
        }
        return res.json(result);
    });
});

app.delete('/Artgallery/:id', (req, res) => {
    const sql = "DELETE FROM Artgallery WHERE ID = ?";
    const id = req.params.id;
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(result);
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});