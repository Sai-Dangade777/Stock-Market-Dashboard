require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const db = require('./db/init');

const app = express();
const PORT = 5001; // Hardcoded port for simplicity

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Initialize database
db.initializeDb()
  .then(() => console.log('Database initialized successfully'))
  .catch(err => console.error('Database initialization error:', err));

// Routes
app.use('/api', require('./routes/stockRoutes'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
