const express = require('express');
const router = express.Router();

// Get list of all companies
router.get('/companies', async (req, res) => {
  try {
    // Sort companies by name
    const companies = req.db.companies.sort((a, b) => a.name.localeCompare(b.name));
    res.json(companies);
  } catch (err) {
    console.error('Error fetching companies:', err);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// Get historical stock data for a specific company
router.get('/:symbol/history', async (req, res) => {
  const { symbol } = req.params;
  const { period = '1y' } = req.query; // Default to 1 year

  try {
    // Find company by symbol
    const company = req.db.companies.find(c => c.symbol === symbol);
    
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    const companyId = company.id;
    
    // Determine date range based on period
    const today = new Date();
    let startDate = new Date(today);
    
    switch(period) {
      case '1w':
        startDate.setDate(today.getDate() - 7);
        break;
      case '1m':
        startDate.setMonth(today.getMonth() - 1);
        break;
      case '3m':
        startDate.setMonth(today.getMonth() - 3);
        break;
      case '6m':
        startDate.setMonth(today.getMonth() - 6);
        break;
      case '1y':
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      case '5y':
        startDate.setFullYear(today.getFullYear() - 5);
        break;
      default:
        startDate.setFullYear(today.getFullYear() - 1);
    }
    
    // Filter stock data by company ID and date range
    const startDateStr = startDate.toISOString().split('T')[0];
    const stockData = req.db.stock_prices.filter(item => 
      item.company_id === companyId && item.date >= startDateStr
    ).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (stockData.length === 0) {
      return res.status(404).json({ error: 'No stock data found for this period' });
    }
    
    res.json(stockData);
  } catch (err) {
    console.error('Error fetching stock history:', err);
    res.status(500).json({ error: 'Failed to fetch stock history' });
  }
});

// Get company details with some basic stats
router.get('/:symbol', async (req, res) => {
  const { symbol } = req.params;

  try {
    // Find the company by symbol
    const company = req.db.companies.find(c => c.symbol === symbol);
    
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    // Company details are already enriched with stats during initialization
    res.json(company);
  } catch (err) {
    console.error('Error fetching company details:', err);
    res.status(500).json({ error: 'Failed to fetch company details' });
  }
});

module.exports = router;
