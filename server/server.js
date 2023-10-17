/*/ 
 * Cameron McCarty
 * 10/11/2023
 * The Middleman
 * This is a middleware server that handles the requests between the frontend and backend code.
/*/

// Imports and constants
const express = require('express');
const fs = require('fs');
const request = require('request');
const app = express();
const cors = require('cors');

const { spawn } = require('child_process');


// const PORT = process.env.PORT || 5000;
const PORT = 5000;
// Permits the frontend to interact with the backend
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res, next) => {
    res.send("<h1>The Middleman</h1>");
});

// API to check submitted credentials for returning users
app.post("/checkCredentialsAPI", (req, res, next) => {
    const { email, password } = req.body;
    const python = spawn('python', ['./printTrue.py', email, password]);
    let dataToSend;

    python.stdout.on('data', (data) => {
        console.log("Pipe data from Python Script...");
        dataToSend = data.toString().trim() === 'True';
        console.log("Backend Data: " + dataToSend);
    });
    python.on('close', (code) => {
        console.log(`Child process close all stdio with code ${code}`);
        res.json({ validCredentials: dataToSend });
    });
});

app.get("/getUserDataAPI", (req, res, next) => {
    request.get({
        url: "https://raw.githubusercontent.com/C-McCarty/test/main/backendUserData.json",
        headers: {
            'User-Agent': 'request'
        },
        json: true
    }, (err, response, data) => {
        if (err) {
            res.status(500).send("An error occurred while attempting to read the file.");
        } else {
            res.json(data);
        };
    });
});

// API to pull chat data and metadata from backend server
app.get("/pullAPI", (req, res, next) => {
    request.get({
        url: "https://raw.githubusercontent.com/C-McCarty/test/main/backendData.json",
        headers: {
            'User-Agent': 'request'
        },
        json: true
    }, (err, response, data) => {
        if (err) {
            res.status(500).send("An error occurred while attempting to read the file.");
        } else {
            res.json(data);
        };
    });
});

// Sets up the server on either the port specified by Render.com or 5000.
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});