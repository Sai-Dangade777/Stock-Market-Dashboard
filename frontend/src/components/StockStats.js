import React from 'react';
import { formatPrice, formatLargeNumber } from '../utils/numberFormat';
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
          <span className="stat-value">${stats.year_high ? formatPrice(stats.year_high) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">52 Week Low</span>
          <span className="stat-value">${stats.year_low ? formatPrice(stats.year_low) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Avg. Volume</span>
          <span className="stat-value">{stats.avg_volume ? formatLargeNumber(stats.avg_volume) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Latest Volume</span>
          <span className="stat-value">{stats.latest_price?.volume ? formatLargeNumber(stats.latest_price.volume) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Open</span>
          <span className="stat-value">${stats.latest_price?.open ? formatPrice(stats.latest_price.open) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Previous Close</span>
          <span className="stat-value">${stats.latest_price?.close ? formatPrice(stats.latest_price.close) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Day High</span>
          <span className="stat-value">${stats.latest_price?.high ? formatPrice(stats.latest_price.high) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Day Low</span>
          <span className="stat-value">${stats.latest_price?.low ? formatPrice(stats.latest_price.low) : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

// Using the shared formatters from utils/numberFormat.js

export default StockStats;
