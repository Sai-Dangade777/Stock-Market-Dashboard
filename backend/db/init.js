// Sample company data
const companies = [
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

// Function to initialize the in-memory database with sample data
async function initializeDb(db) {
  console.log('Initializing in-memory database...');
  
  // Create companies and stock_prices collections
  db.companies = [...companies];
  db.stock_prices = [];
  
  // Generate stock price data for each company
  console.log('Generating mock stock price data...');
  for (const company of companies) {
    const stockData = generateMockStockData(company.symbol);
    
    // Add company ID to each data point
    const stockPricesWithCompanyId = stockData.map(dataPoint => ({
      ...dataPoint,
      company_id: company.id
    }));
    
    // Add to the database
    db.stock_prices.push(...stockPricesWithCompanyId);
    
    console.log(`Generated ${stockData.length} stock price records for ${company.symbol}`);
  }
  
  console.log('In-memory database initialization complete');
  console.log(`Total companies: ${db.companies.length}`);
  console.log(`Total stock price records: ${db.stock_prices.length}`);
  
  // Add some statistics for each company
  addCompanyStats(db);
  
  return db;
}

// Function to add statistics to company objects
function addCompanyStats(db) {
  for (const company of db.companies) {
    const companyStockData = db.stock_prices.filter(price => price.company_id === company.id);
    
    // Get data from the past year
    const yearAgo = new Date();
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    
    const yearData = companyStockData.filter(price => new Date(price.date) >= yearAgo);
    
    if (yearData.length > 0) {
      // Calculate 52-week high and low
      company.year_high = Math.max(...yearData.map(price => price.close));
      company.year_low = Math.min(...yearData.map(price => price.close));
      
      // Calculate average volume (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const thirtyDayData = companyStockData.filter(price => new Date(price.date) >= thirtyDaysAgo);
      if (thirtyDayData.length > 0) {
        const totalVolume = thirtyDayData.reduce((sum, price) => sum + price.volume, 0);
        company.avg_volume = totalVolume / thirtyDayData.length;
      }
      
      // Add latest price
      const latestPrice = companyStockData.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      )[0];
      
      company.latest_price = latestPrice;
    }
  }
}

// Function to generate mock historical stock data
function generateMockStockData(symbol) {
  const stockData = [];
  const today = new Date();
  
  // Generate data for the past 2 years
  for (let i = 730; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Skip weekends
    const day = date.getDay();
    if (day === 0 || day === 6) {
      continue;
    }
    
    // Generate a random starting price between 50 and 500 based on the symbol
    // This ensures consistent pricing for the same symbol
    const basePrice = getBasePrice(symbol);
    
    // Add some randomness and trends
    const trend = Math.sin(i / 30) * 0.1; // Cyclical component
    const randomFactor = Math.random() * 0.06 - 0.03; // Random daily fluctuation
    const timeTrend = i / 730 * 0.5; // Long term trend
    
    const dayChange = basePrice * (trend + randomFactor - timeTrend);
    
    // Calculate OHLC values
    const open = basePrice + dayChange;
    const close = open * (1 + (Math.random() * 0.06 - 0.03));
    const high = Math.max(open, close) * (1 + Math.random() * 0.03);
    const low = Math.min(open, close) * (1 - Math.random() * 0.03);
    
    // Generate a random volume
    const volume = Math.floor(Math.random() * 10000000) + 1000000;
    
    stockData.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume
    });
  }
  
  return stockData;
}

// Helper function to get a consistent base price for a company
function getBasePrice(symbol) {
  // Simple hash function to get a number from a string
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = ((hash << 5) - hash) + symbol.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Map the hash to a price range between 50 and 500
  return Math.abs(hash % 450) + 50;
}

module.exports = initializeDb;
