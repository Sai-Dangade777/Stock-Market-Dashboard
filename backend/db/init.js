const fs = require('fs');
const path = require('path');
const yahooFinance = require('yahoo-finance2').default;

const stockSymbols = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META',
  'TSLA', 'NVDA', 'JPM', 'V', 'JNJ'
];

const companyInfo = {
  'AAPL': { name: 'Apple Inc.', sector: 'Technology', description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.' },
  'MSFT': { name: 'Microsoft Corporation', sector: 'Technology', description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.' },
  'GOOGL': { name: 'Alphabet Inc.', sector: 'Technology', description: 'Alphabet Inc. provides various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.' },
  'AMZN': { name: 'Amazon.com, Inc.', sector: 'Consumer Cyclical', description: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions through online and physical stores in North America and internationally.' },
  'META': { name: 'Meta Platforms, Inc.', sector: 'Technology', description: 'Meta Platforms, Inc. engages in the development of products that enable people to connect and share with friends and family through mobile devices, personal computers, and other surfaces worldwide.' },
  'TSLA': { name: 'Tesla, Inc.', sector: 'Automotive', description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.' },
  'NVDA': { name: 'NVIDIA Corporation', sector: 'Technology', description: 'NVIDIA Corporation provides graphics, and compute and networking solutions in the United States, Taiwan, China, and internationally.' },
  'JPM': { name: 'JPMorgan Chase & Co.', sector: 'Financial Services', description: 'JPMorgan Chase & Co. operates as a financial services company worldwide.' },
  'V': { name: 'Visa Inc.', sector: 'Financial Services', description: 'Visa Inc. operates as a payments technology company worldwide.' },
  'JNJ': { name: 'Johnson & Johnson', sector: 'Healthcare', description: 'Johnson & Johnson researches, develops, manufactures, and sells various products in the healthcare field worldwide.' }
};

let stockData = {};

async function fetchStockHistory(symbol, period = '1y', interval = '1d') {
  try {
    const result = await yahooFinance.historical(symbol, {
      period1: new Date(Date.now() - period === '5y' ? 5 * 365 * 24 * 60 * 60 * 1000 : 
                        period === '1y' ? 365 * 24 * 60 * 60 * 1000 : 
                        period === '6m' ? 180 * 24 * 60 * 60 * 1000 : 
                        period === '3m' ? 90 * 24 * 60 * 60 * 1000 : 
                        period === '1m' ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000),
      period2: new Date(),
      interval: interval
    });
    
    return result.map(item => ({
      date: item.date.toISOString().split('T')[0],
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume
    }));
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return [];
  }
}

async function fetchCompanyDetails(symbol) {
  try {
    const quote = await yahooFinance.quoteSummary(symbol, {
      modules: ['price', 'summaryDetail', 'defaultKeyStatistics']
    });
    
    const price = quote.price;
    const details = quote.summaryDetail;
    const stats = quote.defaultKeyStatistics;
    
    return {
      symbol,
      name: companyInfo[symbol]?.name || price.shortName || price.longName,
      sector: companyInfo[symbol]?.sector || 'N/A',
      description: companyInfo[symbol]?.description || 'No description available',
      currentPrice: price.regularMarketPrice,
      change: price.regularMarketChange,
      changePercent: price.regularMarketChangePercent,
      marketCap: details.marketCap,
      volume: details.volume,
      high52Week: details.fiftyTwoWeekHigh,
      low52Week: details.fiftyTwoWeekLow,
      avgVolume: details.averageVolume
    };
  } catch (error) {
    console.error("Error fetching details for %s:", symbol, error);
    return {
      symbol,
      name: companyInfo[symbol]?.name || symbol,
      sector: companyInfo[symbol]?.sector || 'N/A',
      description: companyInfo[symbol]?.description || 'No description available',
      currentPrice: 0,
      change: 0,
      changePercent: 0,
      marketCap: 0,
      volume: 0,
      high52Week: 0,
      low52Week: 0,
      avgVolume: 0
    };
  }
}

async function initializeStockData() {
  console.log('Initializing stock data from Yahoo Finance API...');
  
  try {
    const companyPromises = stockSymbols.map(fetchCompanyDetails);
    const companies = await Promise.all(companyPromises);
    
    stockData.companies = companies;
    
    for (const symbol of stockSymbols) {
      const history = await fetchStockHistory(symbol);
      if (!stockData.history) stockData.history = {};
      stockData.history[symbol] = history;
    }
    
    console.log('Stock data initialization complete');
    return { success: true, message: 'Stock data initialized successfully' };
  } catch (error) {
    console.error('Error initializing stock data:', error);
    return { success: false, message: 'Failed to initialize stock data', error };
  }
}

function getCompanies() {
  return stockData.companies || [];
}

function getStockHistory(symbol, period = '1y') {
  if (!stockData.history || !stockData.history[symbol]) {
    return [];
  }
  
  const history = stockData.history[symbol];
  
  const now = new Date();
  let startDate;
  
  switch (period) {
    case '5y':
      startDate = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate());
      break;
    case '1y':
      startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      break;
    case '6m':
      startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
      break;
    case '3m':
      startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
      break;
    case '1m':
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      break;
    case '1w':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      break;
    default:
      startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  }
  
  return history.filter(item => new Date(item.date) >= startDate);
}

function getCompanyDetails(symbol) {
  return stockData.companies?.find(company => company.symbol === symbol) || null;
}

async function refreshStockData(symbol) {
  try {
    const companyDetails = await fetchCompanyDetails(symbol);
    const history = await fetchStockHistory(symbol);
    
    const companyIndex = stockData.companies?.findIndex(company => company.symbol === symbol) || -1;
    if (companyIndex >= 0) {
      stockData.companies[companyIndex] = companyDetails;
    }
    
    if (!stockData.history) stockData.history = {};
    stockData.history[symbol] = history;
    
    return { success: true, message: `Stock data refreshed for ${symbol}` };
  } catch (error) {
    console.error(`Error refreshing data for ${symbol}:`, error);
    return { success: false, message: `Failed to refresh data for ${symbol}`, error };
  }
}

module.exports = {
  initializeDb: initializeStockData,
  getCompanies,
  getStockHistory,
  getCompanyDetails,
  refreshStockData
};
