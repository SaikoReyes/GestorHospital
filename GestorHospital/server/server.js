const express = require('express');
const cors = require("cors");
const sql = require('mssql');


const app = express();
app.use(cors());
app.use(express.json());

// SQL Server configuration
const config = {
    user: 'sa',
    password: 'password123',
    server: 'localhost', // If you're connecting to the host machine where SQL Server is running, use 'localhost'
    database: 'HospitalDB',
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        trustServerCertificate: true // Change to false for production, if you have valid SSL certificates
    }
};

// Connect to your database
sql.connect(config, function (err) {
    if (err) console.log(err);
});

// Simple route to check if the server is running
app.get('/', (req, res) => {
    res.send('Node.js backend is running');
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Ideally, you should hash the password here before sending it to the database
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('input_username', sql.VarChar, username)
            .input('input_password', sql.VarChar, password)
            .query('SELECT * FROM Usuario WHERE USERNAME = @input_username AND PASSWORD = @input_password');
        let resultRole = await pool.request()
            .input('input_username', sql.VarChar, username)
        if (result.recordset.length > 0) {
            res.json({ message: 'Login successful', user: result.recordset[0] });
        } else {
            res.status(401).json({ message: 'Login failed' });
        }
        
        pool.close();
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Server Error1');
    }
});

app.post('/get-user-role/:username', async (req, res) => {
    try {
        const username = req.params.username;
        console.log(username);
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT ROL FROM Usuario WHERE USERNAME = @username');

        if (result.recordset.length > 0) {
            const role = result.recordset[0].ROL;
            res.json({ username, role });
        } else {
            res.status(404).send('User not found');
        }
        console.log('Si jala hasta aca')
        pool.close();
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Server Error2');
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
