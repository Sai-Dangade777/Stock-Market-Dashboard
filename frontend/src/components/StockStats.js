import React from 'react';
import './StockStats.css';

const StockStats = ({ stats }) => {
  if (!stats) {
    return (
      <div className="stock-stats-container loading">
        <div className="stats-loading">
          <div className="stats-skeleton"></div>
          <div className="stats-skeleton"></div>
          <div className="stats-skeleton"></div>
          <div className="stats-skeleton"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="stock-stats-container">
      <h3 className="stats-title">Key Statistics</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">52 Week High</span>
          <span className="stat-value">${stats.year_high ? stats.year_high.toFixed(2) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">52 Week Low</span>
          <span className="stat-value">${stats.year_low ? stats.year_low.toFixed(2) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Avg. Volume</span>
          <span className="stat-value">{stats.avg_volume ? formatNumber(stats.avg_volume) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Latest Volume</span>
          <span className="stat-value">{stats.latest_price?.volume ? formatNumber(stats.latest_price.volume) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Open</span>
          <span className="stat-value">${stats.latest_price?.open ? stats.latest_price.open.toFixed(2) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Previous Close</span>
          <span className="stat-value">${stats.latest_price?.close ? stats.latest_price.close.toFixed(2) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Day High</span>
          <span className="stat-value">${stats.latest_price?.high ? stats.latest_price.high.toFixed(2) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Day Low</span>
          <span className="stat-value">${stats.latest_price?.low ? stats.latest_price.low.toFixed(2) : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

// Helper function to format large numbers
const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num;
};

export default StockStats;
