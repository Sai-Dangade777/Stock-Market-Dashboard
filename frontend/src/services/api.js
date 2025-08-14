import axios from 'axios';

// Base URL for API requests
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-deployment-url.com/api' 
  : '/api';

// API for getting all companies
export const getCompanies = async () => {
  try {
    const response = await axios.get(`${API_URL}/companies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    
    // For GitHub Pages deployment, use mock data as fallback
    if (process.env.NODE_ENV === 'production') {
      return getMockCompanies();
    }
    
    throw error;
  }
};

// API for getting stock history
export const getStockHistory = async (symbol, period = '1y') => {
  try {
    const response = await axios.get(`${API_URL}/history/${symbol}?period=${period}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching history for ${symbol}:`, error);
    
    // For GitHub Pages deployment, use mock data as fallback
    if (process.env.NODE_ENV === 'production') {
      return getMockStockHistory(symbol, period);
    }
    
    throw error;
  }
};

// API for getting company details
export const getCompanyDetails = async (symbol) => {
  try {
    const response = await axios.get(`${API_URL}/company/${symbol}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching company details for ${symbol}:`, error);
    
    // For GitHub Pages deployment, use mock data as fallback
    if (process.env.NODE_ENV === 'production') {
      return getMockCompanyDetails(symbol);
    }
    
    throw error;
  }
};

// Mock data functions for GitHub Pages deployment
const getMockCompanies = () => {
  return [
    { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', currentPrice: 175.32, change: 2.45, changePercent: 1.42 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology', currentPrice: 329.81, change: 1.23, changePercent: 0.37 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', currentPrice: 137.14, change: -0.86, changePercent: -0.62 },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', sector: 'Consumer Cyclical', currentPrice: 138.01, change: 0.91, changePercent: 0.66 },
    { symbol: 'META', name: 'Meta Platforms, Inc.', sector: 'Technology', currentPrice: 311.85, change: 4.32, changePercent: 1.41 },
    { symbol: 'TSLA', name: 'Tesla, Inc.', sector: 'Automotive', currentPrice: 248.42, change: -3.78, changePercent: -1.50 },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Technology', currentPrice: 457.98, change: 8.92, changePercent: 1.99 },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financial Services', currentPrice: 147.05, change: -0.24, changePercent: -0.16 },
    { symbol: 'V', name: 'Visa Inc.', sector: 'Financial Services', currentPrice: 241.68, change: 0.53, changePercent: 0.22 },
    { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', currentPrice: 166.09, change: -1.12, changePercent: -0.67 }
  ];
};

const getMockStockHistory = (symbol, period) => {
  // Generate random stock data based on symbol and period
  const endDate = new Date();
  const startDate = new Date();
  let days;
  
  switch (period) {
    case '5y': days = 365 * 5; break;
    case '1y': days = 365; break;
    case '6m': days = 180; break;
    case '3m': days = 90; break;
    case '1m': days = 30; break;
    case '1w': days = 7; break;
    default: days = 365;
  }
  
  startDate.setDate(startDate.getDate() - days);
  
  // Generate base price based on symbol
  const basePrice = symbol.length * 50 + 100;
  let lastPrice = basePrice;
  
  const history = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    // Skip weekends
    const day = d.getDay();
    if (day === 0 || day === 6) continue;
    
    // Random price movement
    const change = (Math.random() - 0.48) * 5;
    const newPrice = lastPrice + change;
    lastPrice = Math.max(newPrice, basePrice * 0.7); // Ensure price doesn't go too low
    
    const date = d.toISOString().split('T')[0];
    history.push({
      date,
      open: lastPrice - (Math.random() * 2),
      high: lastPrice + (Math.random() * 3),
      low: lastPrice - (Math.random() * 3),
      close: lastPrice,
      volume: Math.floor(Math.random() * 10000000) + 5000000
    });
  }
  
  return history;
};

const getMockCompanyDetails = (symbol) => {
  const companies = {
    'AAPL': { 
      symbol: 'AAPL',
      name: 'Apple Inc.',
      sector: 'Technology',
      description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
      currentPrice: 175.32,
      change: 2.45,
      changePercent: 1.42,
      marketCap: 2750000000000,
      volume: 58900000,
      high52Week: 182.94,
      low52Week: 124.17,
      avgVolume: 61200000
    },
    'MSFT': {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      sector: 'Technology',
      description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.',
      currentPrice: 329.81,
      change: 1.23,
      changePercent: 0.37,
      marketCap: 2450000000000,
      volume: 21300000,
      high52Week: 366.78,
      low52Week: 213.43,
      avgVolume: 27400000
    }
  };
  
  // Return specific company or generate one if not found
  if (companies[symbol]) {
    return companies[symbol];
  }
  
  // Generate details for other companies
  return {
    symbol,
    name: `${symbol} Corporation`,
    sector: 'Various',
    description: `${symbol} is a leading company in its sector, providing innovative solutions to customers worldwide.`,
    currentPrice: symbol.length * 50 + 100,
    change: (Math.random() * 5) - 2.5,
    changePercent: (Math.random() * 3) - 1.5,
    marketCap: (symbol.length * 200000000000),
    volume: Math.floor(Math.random() * 50000000) + 10000000,
    high52Week: (symbol.length * 50 + 100) * 1.2,
    low52Week: (symbol.length * 50 + 100) * 0.8,
    avgVolume: Math.floor(Math.random() * 40000000) + 15000000
  };
};

export default {
  getCompanies,
  getStockHistory,
  getCompanyDetails
};