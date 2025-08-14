import React, { useState, useEffect } from 'react';
import CompanyList from '../components/CompanyList';
import StockChart from '../components/StockChart';
import StockStats from '../components/StockStats';
import { getCompanies, getStockHistory, getCompanyDetails } from '../api/stockApi';
import './Dashboard.css';

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [period, setPeriod] = useState('1y');
  const [loading, setLoading] = useState({
    companies: true,
    stockData: false,
    companyDetails: false
  });
  const [error, setError] = useState(null);

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
        setLoading(prev => ({ ...prev, companies: false }));
        
        // Auto-select the first company
        if (data.length > 0 && !selectedCompany) {
          setSelectedCompany(data[0].symbol);
        }
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError('Failed to fetch companies. Please try again later.');
        setLoading(prev => ({ ...prev, companies: false }));
      }
    };

    fetchCompanies();
  }, [selectedCompany]);

  // Fetch stock data when selected company changes or period changes
  useEffect(() => {
    if (!selectedCompany) return;

    const fetchStockData = async () => {
      try {
        setLoading(prev => ({ ...prev, stockData: true }));
        const data = await getStockHistory(selectedCompany, period);
        setStockData(data);
        setLoading(prev => ({ ...prev, stockData: false }));
      } catch (err) {
        console.error('Error fetching stock data:', err);
        setError('Failed to fetch stock data. Please try again later.');
        setLoading(prev => ({ ...prev, stockData: false }));
      }
    };

    const fetchCompanyDetails = async () => {
      try {
        setLoading(prev => ({ ...prev, companyDetails: true }));
        const data = await getCompanyDetails(selectedCompany);
        setCompanyDetails(data);
        setLoading(prev => ({ ...prev, companyDetails: false }));
      } catch (err) {
        console.error('Error fetching company details:', err);
        setError('Failed to fetch company details. Please try again later.');
        setLoading(prev => ({ ...prev, companyDetails: false }));
      }
    };

    fetchStockData();
    fetchCompanyDetails();
  }, [selectedCompany, period]);

  const handleCompanySelect = (symbol) => {
    setSelectedCompany(symbol);
  };

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // Find company name for the selected company
  const selectedCompanyName = companies.find(
    company => company.symbol === selectedCompany
  )?.name || '';

  return (
    <div className="dashboard-container">
      <div className="dashboard-layout">
        <div className="company-list-section">
          <CompanyList 
            companies={companies} 
            selectedCompany={selectedCompany}
            onSelectCompany={handleCompanySelect}
            isLoading={loading.companies}
          />
        </div>
        
        <div className="chart-section">
          <StockChart 
            stockData={stockData} 
            companyName={selectedCompanyName}
            symbol={selectedCompany}
            period={period}
            onPeriodChange={handlePeriodChange}
            isLoading={loading.stockData}
          />
        </div>
      </div>
      
      <div className="stats-section">
        <StockStats 
          stats={companyDetails}
          isLoading={loading.companyDetails}
        />
      </div>
    </div>
  );
};

export default Dashboard;
