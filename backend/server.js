require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const db = require('./db/init');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://stock-market-dashboard-frontend.vercel.app', 
       'https://sai-dangade777.github.io', 
       'https://stock-market-dashboard-frontend-sai-dangades-projects.vercel.app',
       /\.vercel\.app$/,  // Allow all vercel.app subdomains
       'http://localhost:3000'] 
    : '*',
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
};

app.use(cors(corsOptions));
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

// Vercel-specific health check at the root
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Stock Market Dashboard API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// For local development, listen on PORT
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
