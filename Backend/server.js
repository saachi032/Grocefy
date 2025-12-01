const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const expenseRoutes = require('./routes/expenseRoutes.js');
const cors = require('cors');


// Load environment variables from .env file
dotenv.config();
console.log("MONGO_URI =", process.env.MONGO_URI);


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
app.use('/api/expenses', require('./routes/expenseRoutes.js'));

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});