const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// CSV Writer setup
const csvWriter = createObjectCsvWriter({
    path: path.join(__dirname, 'feedback.csv'),
    header: [
        { id: 'message', title: 'Message' },
        { id: 'name', title: 'Name' },
        { id: 'email', title: 'Email' },
        { id: 'feedbackType', title: 'Feedback Type' },
    ],
    append: true // Append to the file if it exists
});

// Endpoint to receive feedback
app.post('/feedback', (req, res) => {
    const feedback = req.body;

    // Write to CSV
    csvWriter.writeRecords([feedback])
        .then(() => {
            console.log('Feedback saved to CSV:', feedback);
            res.status(200).json({ message: 'Feedback received successfully!' });
        })
        .catch(err => {
            console.error('Error writing to CSV:', err);
            res.status(500).json({ message: 'Error saving feedback.' });
        });
});

// Add a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Feedback Collector API!'); // Customize this message
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});