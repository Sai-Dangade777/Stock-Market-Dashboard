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
  
  let seed = 0;
  for (let i = 0; i < symbol.length; i++) {
    seed += symbol.charCodeAt(i) * (i + 1) * 17;
  }
  
  const stockPriceRanges = {
    'AAPL': { min: 150, max: 190 },
    'MSFT': { min: 330, max: 380 },
    'AMZN': { min: 120, max: 180 },
    'GOOGL': { min: 130, max: 150 },
    'META': { min: 300, max: 350 },
    'TSLA': { min: 180, max: 250 },
    'BRK.B': { min: 350, max: 400 },
    'NVDA': { min: 400, max: 500 },
    'JPM': { min: 145, max: 175 },
    'NFLX': { min: 550, max: 650 },
    'DIS': { min: 80, max: 100 },
    'PYPL': { min: 60, max: 80 }
  };
  
  if (symbol === 'JPM' || symbol === 'PYPL') {
    return generateStableMockData(symbol, period);
  }
  
  const range = stockPriceRanges[symbol] || { min: 50, max: 200 };
  let basePrice = range.min + (Math.random() * (range.max - range.min));
  
  const trendPeriod = 30 + (seed % 60);
  const volatility = 0.02 + (seed % 100) / 2000;
  const trendStrength = (seed % 10) / 20;
  
  const trendDirection = symbol === 'JPM' ? 1 : (seed % 3 === 0) ? -0.5 : 1; 
  
  if (basePrice < 10) basePrice = 10 + (Math.random() * 40);
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const day = date.getDay();
    if (day === 0 || day === 6) {
      continue;
    }
    
    const cyclicalComponent = Math.sin(i / trendPeriod + (seed % 10)) * 0.05;
    const randomFactor = (Math.random() * volatility * 2) - volatility;
    const timeTrend = ((days - i) / days) * 0.2 * trendStrength * trendDirection;
    
    const dayChange = basePrice * Math.max(-0.1, Math.min(0.1, cyclicalComponent + randomFactor + timeTrend));
    
    const open = Math.max(1, basePrice + dayChange);
    const closeChange = Math.random() * 0.02 - 0.01;
    const close = Math.max(1, open * (1 + closeChange));
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.max(1, Math.min(open, close) * (1 - Math.random() * 0.01));
    
    const avgVolume = Math.floor((10000000 / Math.sqrt(basePrice)) + 500000);
    const volume = Math.floor(avgVolume * (0.7 + Math.random() * 0.6));
    
    data.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume
    });
    
    basePrice = close;
  }
  
  return data;
};

// Generate company details with statistics
const generateStableMockData = (symbol, period = '1y') => {
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
  
  let basePrice = symbol === 'JPM' ? 155.75 : 72.50;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const day = date.getDay();
    if (day === 0 || day === 6) continue;
    
    const randomChange = (Math.random() * 0.006) - 0.003;
    
    const trend = Math.sin(i / 60) * 0.0015;
    const dayChange = basePrice * (randomChange + trend);
    
    const open = basePrice + dayChange;
    const close = open * (1 + (Math.random() * 0.004 - 0.002));
    const high = Math.max(open, close) * (1 + Math.random() * 0.002);
    const low = Math.min(open, close) * (1 - Math.random() * 0.002);
    
    const volume = Math.floor(3000000 + Math.random() * 2000000);
    
    data.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume
    });
    
    basePrice = close;
  }
  
  return data;
};

export const generateMockCompanyDetails = (symbol) => {
  const company = mockCompanies.find(c => c.symbol === symbol);
  if (!company) return null;
  
  const stockData = generateMockStockData(symbol, '1y');
  
  const yearHigh = Math.max(...stockData.map(item => item.high));
  const yearLow = Math.min(...stockData.map(item => item.low));
  
  const avgVolume = stockData.reduce((sum, item) => sum + item.volume, 0) / stockData.length;
  
  const latestPrice = stockData[stockData.length - 1];
  
  return {
    ...company,
    year_high: yearHigh,
    year_low: yearLow,
    avg_volume: avgVolume,
    latest_price: latestPrice
  };
};
