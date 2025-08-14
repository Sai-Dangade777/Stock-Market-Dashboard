import axios from 'axios';
import { mockCompanies, generateMockStockData, generateMockCompanyDetails } from '../mockData/mockStockData';

// Use environment variable for API URL or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Check if we're on GitHub Pages or if API is not available
const isGitHubPages = window.location.hostname.includes('github.io');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const getCompanies = async () => {
  try {
    // Use mock data if on GitHub Pages
    if (isGitHubPages) {
      console.log('Using mock company data for GitHub Pages');
      return mockCompanies;
    }
    
    const response = await api.get('/companies');
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    
    // Fallback to mock data if API call fails
    console.log('Falling back to mock company data');
    return mockCompanies;
  }
};

export const getStockHistory = async (symbol, period = '1y') => {
  try {
    // Use mock data if on GitHub Pages
    if (isGitHubPages) {
      console.log(`Using mock stock history data for ${symbol} (${period})`);
      return generateMockStockData(symbol, period);
    }
    
    const response = await api.get(`/history/${symbol}`, {
      params: { period },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock history:', error);
    
    // Fallback to mock data if API call fails
    console.log(`Falling back to mock stock history data for ${symbol}`);
    return generateMockStockData(symbol, period);
  }
};

export const getCompanyDetails = async (symbol) => {
  try {
    // Use mock data if on GitHub Pages
    if (isGitHubPages) {
      console.log(`Using mock company details for ${symbol}`);
      return generateMockCompanyDetails(symbol);
    }
    
    const response = await api.get(`/company/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company details:', error);
    
    // Fallback to mock data if API call fails
    console.log(`Falling back to mock company details for ${symbol}`);
    return generateMockCompanyDetails(symbol);
  }
};

export default api;
