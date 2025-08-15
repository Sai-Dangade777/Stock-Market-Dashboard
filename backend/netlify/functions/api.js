const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const morgan = require('morgan');
const { getCompanies, getStockHistory, getCompanyDetails, refreshStockData } = require('../../db/init');

// Create a new Express app for serverless
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes - Without the /api prefix since Netlify adds /.netlify/functions/api
app.get('/companies', async (req, res) => {
  try {
    const companies = getCompanies();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

app.get('/history/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { period = '1y' } = req.query;
    const history = getStockHistory(symbol, period);
    res.json(history);
  } catch (error) {
    console.error(`Error fetching history for ${req.params.symbol}:`, error);
    res.status(500).json({ error: `Failed to fetch history for ${req.params.symbol}` });
  }
});

app.get('/company/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const company = getCompanyDetails(symbol);
    
    if (!company) {
      return res.status(404).json({ error: `Company with symbol ${symbol} not found` });
    }
    
    res.json(company);
  } catch (error) {
    console.error(`Error fetching company ${req.params.symbol}:`, error);
    res.status(500).json({ error: `Failed to fetch company ${req.params.symbol}` });
  }
});

app.post('/refresh/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const result = await refreshStockData(symbol);
    res.json(result);
  } catch (error) {
    console.error(`Error refreshing data for ${req.params.symbol}:`, error);
    res.status(500).json({ error: `Failed to refresh data for ${req.params.symbol}` });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Stock Market Dashboard API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Export the serverless handler
module.exports.handler = serverless(app);