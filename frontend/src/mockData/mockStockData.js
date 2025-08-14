// Mock data for GitHub Pages deployment
export const mockCompanies = [
  { id: 1, symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', description: 'Consumer electronics, software and online services.' },
  { id: 2, symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology', description: 'Software, hardware, and cloud computing.' },
  { id: 3, symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer Cyclical', description: 'E-commerce, cloud computing, and digital streaming.' },
  { id: 4, symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Communication Services', description: 'Internet services and products.' },
  { id: 5, symbol: 'META', name: 'Meta Platforms Inc.', sector: 'Communication Services', description: 'Social media technology company.' },
  { id: 6, symbol: 'TSLA', name: 'Tesla, Inc.', sector: 'Automotive', description: 'Electric vehicles and clean energy.' },
  { id: 7, symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', sector: 'Financial Services', description: 'Conglomerate holding company.' },
  { id: 8, symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Technology', description: 'Graphics processing units and artificial intelligence.' },
  { id: 9, symbol: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financial Services', description: 'Banking and financial services.' },
  { id: 10, symbol: 'NFLX', name: 'Netflix, Inc.', sector: 'Communication Services', description: 'Streaming media and video production.' },
  { id: 11, symbol: 'DIS', name: 'The Walt Disney Company', sector: 'Communication Services', description: 'Entertainment and media conglomerate.' },
  { id: 12, symbol: 'PYPL', name: 'PayPal Holdings, Inc.', sector: 'Financial Services', description: 'Online payment solutions.' },
];

// Generate mock stock price data for a company
export const generateMockStockData = (symbol, period = '1y') => {
  const data = [];
  const today = new Date();
  let days;
  
  switch (period) {
    case '1w': days = 7; break;
    case '1m': days = 30; break;
    case '3m': days = 90; break;
    case '6m': days = 180; break;
    case '1y': days = 365; break;
    case '5y': days = 1825; break;
    default: days = 365;
  }
  
  // Use the symbol to generate a consistent seed value for random numbers
  let seed = 0;
  for (let i = 0; i < symbol.length; i++) {
    seed += symbol.charCodeAt(i);
  }
  
  // Generate a starting price based on the seed
  let basePrice = (seed % 450) + 50; // Range: 50 to 500
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Skip weekends
    const day = date.getDay();
    if (day === 0 || day === 6) {
      continue;
    }
    
    // Add some randomness and trends
    const trend = Math.sin(i / 30) * 0.1; // Cyclical component
    const randomFactor = Math.random() * 0.06 - 0.03; // Random daily fluctuation
    const timeTrend = (days - i) / days * 0.5; // Long term trend
    
    const dayChange = basePrice * (trend + randomFactor + timeTrend);
    
    // Calculate OHLC values
    const open = basePrice + dayChange;
    const close = open * (1 + (Math.random() * 0.06 - 0.03));
    const high = Math.max(open, close) * (1 + Math.random() * 0.03);
    const low = Math.min(open, close) * (1 - Math.random() * 0.03);
    
    // Generate a random volume
    const volume = Math.floor(Math.random() * 10000000) + 1000000;
    
    data.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume
    });
    
    // Update base price for next day
    basePrice = close;
  }
  
  return data;
};

// Generate company details with statistics
export const generateMockCompanyDetails = (symbol) => {
  const company = mockCompanies.find(c => c.symbol === symbol);
  if (!company) return null;
  
  // Get some stock data to calculate stats
  const stockData = generateMockStockData(symbol, '1y');
  
  // Calculate 52-week high/low
  const yearHigh = Math.max(...stockData.map(item => item.high));
  const yearLow = Math.min(...stockData.map(item => item.low));
  
  // Calculate average volume
  const avgVolume = stockData.reduce((sum, item) => sum + item.volume, 0) / stockData.length;
  
  // Get latest price data
  const latestPrice = stockData[stockData.length - 1];
  
  return {
    ...company,
    year_high: yearHigh,
    year_low: yearLow,
    avg_volume: avgVolume,
    latest_price: latestPrice
  };
};
