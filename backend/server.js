require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stockRoutes = require('./routes/stockRoutes');
const dbInit = require('./db/init');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize in-memory database
const inMemoryDb = {};

// Initialize database with sample data
dbInit(inMemoryDb).catch(err => console.error('Database initialization error:', err));

// Make the db available in the request object
app.use((req, res, next) => {
  req.db = inMemoryDb;
  next();
});

// Routes
app.use('/api/stocks', stockRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
