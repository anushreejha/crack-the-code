require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Content Security Policy
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' https://fonts.googleapis.com; style-src 'self' https://fonts.googleapis.com;");
  next();
});

// Serve static files for CSS and JS
app.use('/styles', express.static(path.join(__dirname, '../styles')));
app.use('/scripts', express.static(path.join(__dirname, '../scripts')));

// Routes for HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/index.html'));
});

app.get('/learn.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/learn.html'));
});

app.get('/code.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/code.html'));
});

app.get('/discuss.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/discuss.html'));
});

// MongoDB connection string
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

// Feedback endpoint
app.post('/feedback', async (req, res) => {
  const feedback = req.body;
  try {
    const db = client.db('feedbackDB');
    const collection = db.collection('feedback');
    await collection.insertOne(feedback);
    res.status(200).json({ message: 'Feedback received successfully!' });
  } catch (err) {
    console.error('Error saving feedback to MongoDB:', err);
    res.status(500).json({ message: 'Error saving feedback.' });
  }
});

// Export server as a serverless function for Vercel
module.exports = app;
