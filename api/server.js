require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path'); // Import path module

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the styles and scripts directories
app.use('/styles', express.static(path.join(__dirname, '../styles'))); // Serve CSS files
app.use('/scripts', express.static(path.join(__dirname, '../scripts'))); // Serve JS files

// Serve static files from the pages directory
app.use(express.static(path.join(__dirname, '../pages'))); // Serve HTML files

// MongoDB connection string
const uri = process.env.MONGODB_URI; // Use the environment variable
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error; // Rethrow the error to handle it in the route
  }
}

// Initialize the database connection
connectToDatabase().catch(console.dir);

// Endpoint to receive feedback
app.post('/feedback', async (req, res) => {
  const feedback = req.body;

  try {
    const db = client.db('feedbackDB'); // Replace with your database name
    const feedbackCollection = db.collection('feedback'); // Replace with your collection name

    // Insert feedback into MongoDB
    await feedbackCollection.insertOne(feedback);
    console.log('Feedback saved to MongoDB:', feedback);
    res.status(200).json({ message: 'Feedback received successfully!' });
  } catch (err) {
    console.error('Error saving feedback to MongoDB:', err);
    res.status(500).json({ message: 'Error saving feedback.' });
  }
});

// Serve index.html and other HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/index.html')); // Serve the index.html file
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/about.html')); // Serve the about.html file
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/contact.html')); // Serve the contact.html file
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for Vercel
module.exports = app; // Export the app 