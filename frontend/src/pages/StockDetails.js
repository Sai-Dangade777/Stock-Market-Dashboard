import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import StockChart from '../components/StockChart';
import StockStats from '../components/StockStats';
import { getStockHistory, getCompanyDetails } from '../api/stockApi';
import './StockDetails.css';

const StockDetails = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [period, setPeriod] = useState('1y');
  const [loading, setLoading] = useState({
    stockData: true,
    companyDetails: true
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(prev => ({ ...prev, stockData: true }));
        const data = await getStockHistory(symbol, period);
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
        const data = await getCompanyDetails(symbol);
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
  }, [symbol, period]);

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <div className="error-actions">
          <button onClick={() => window.location.reload()}>Retry</button>
          <Link to="/" className="back-link">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="stock-details-container">
      <div className="back-navigation">
        <Link to="/" className="back-button">
          <FaArrowLeft /> Back to Dashboard
        </Link>
      </div>
      
      <div className="company-overview">
        {loading.companyDetails ? (
          <div className="company-overview-skeleton"></div>
        ) : (
          <>
            <div className="company-header">
              <h1>{companyDetails?.name} ({symbol})</h1>
              <span className="company-sector">{companyDetails?.sector}</span>
            </div>
            <p className="company-description">{companyDetails?.description}</p>
          </>
        )}
      </div>
      
      <div className="details-grid">
        <div className="chart-section">
          <StockChart 
            stockData={stockData} 
            companyName={companyDetails?.name || ''}
            symbol={symbol}
            period={period}
            onPeriodChange={handlePeriodChange}
            isLoading={loading.stockData}
          />
        </div>
        
        <div className="stats-section">
          <StockStats 
            stats={companyDetails}
            isLoading={loading.companyDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
