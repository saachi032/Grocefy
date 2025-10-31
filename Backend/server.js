const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const cors = require('cors');

// ... (rest of your server.js file)

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Enable CORS for all routes
app.use(cors());

// This allows the server to accept JSON data in the request body
app.use(express.json());

// Define a simple route for the root URL
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use the user routes for any requests to /api/users
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});