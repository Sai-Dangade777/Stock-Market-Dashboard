const express = require('express');
const router = express.Router();
const { getCompanies, getStockHistory, getCompanyDetails, refreshStockData } = require('../db/init');

router.get('/companies', async (req, res) => {
  try {
    const companies = getCompanies();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

router.get('/history/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { period = '1y' } = req.query;
    const history = getStockHistory(symbol, period);
    res.json(history);
  } catch (error) {
    console.error('Error fetching history for %s:', req.params.symbol, error);
    res.status(500).json({ error: `Failed to fetch history for ${req.params.symbol}` });
  }
});

router.get('/company/:symbol', async (req, res) => {
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

router.post('/refresh/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const result = await refreshStockData(symbol);
    res.json(result);
  } catch (error) {
    console.error(`Error refreshing data for ${req.params.symbol}:`, error);
    res.status(500).json({ error: `Failed to refresh data for ${req.params.symbol}` });
  }
});

module.exports = router;
