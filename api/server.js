const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string
const uri = 'mongodb+srv://anushreejha0604:9zN9TgGR1KVG5WyG@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; // Replace with your connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect(err => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB');
    const db = client.db('feedbackDB'); // Replace with your database name
    const feedbackCollection = db.collection('feedback'); // Replace with your collection name

    // Endpoint to receive feedback
    app.post('/feedback', (req, res) => {
        const feedback = req.body;

        // Insert feedback into MongoDB
        feedbackCollection.insertOne(feedback)
            .then(() => {
                console.log('Feedback saved to MongoDB:', feedback);
                res.status(200).json({ message: 'Feedback received successfully!' });
            })
            .catch(err => {
                console.error('Error saving feedback to MongoDB:', err);
                res.status(500).json({ message: 'Error saving feedback.' });
            });
    });

    // Add a route for the root URL
    app.get('/', (req, res) => {
        res.send('Welcome to the Feedback Collector API!');
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});

// Export the app for Vercel
module.exports = app; // Export the app 