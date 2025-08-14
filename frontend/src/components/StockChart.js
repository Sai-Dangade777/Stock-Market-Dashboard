import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import './StockChart.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StockChart = ({ stockData, companyName, symbol, period, onPeriodChange }) => {
  const [chartData, setChartData] = useState(null);
  
  useEffect(() => {
    if (!stockData || stockData.length === 0) {
      return;
    }
    
    // Sort data chronologically
    const sortedData = [...stockData].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Extract data points
    const dates = sortedData.map(item => {
      const date = new Date(item.date);
      // Format date differently based on the period
      if (period === "1w" || period === "1m") {
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      } else {
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
      }
    });
    
    const closePrices = sortedData.map(item => item.close);
    
    // Calculate price change
    const firstPrice = closePrices[0];
    const lastPrice = closePrices[closePrices.length - 1];
    const priceChange = lastPrice - firstPrice;
    const priceChangePercent = (priceChange / firstPrice) * 100;
    
    // Set line colors based on price change
    const lineColor = priceChange >= 0 ? "rgba(0, 170, 91, 1)" : "rgba(255, 53, 53, 1)";
    const areaColor = priceChange >= 0 ? "rgba(0, 170, 91, 0.1)" : "rgba(255, 53, 53, 0.1)";
    
    setChartData({
      labels: dates,
      datasets: [
        {
          label: `${symbol} Stock Price`,
          data: closePrices,
          borderColor: lineColor,
          backgroundColor: areaColor,
          pointBackgroundColor: lineColor,
          pointBorderColor: "#fff",
          pointBorderWidth: 1,
          pointRadius: dates.length < 30 ? 3 : 0,
          pointHoverRadius: 5,
          tension: 0.3,
          fill: true,
        },
      ],
      priceChange,
      priceChangePercent,
      currentPrice: lastPrice,
    });
    
  }, [stockData, period, symbol]);

  const periods = [
    { value: "1w", label: "1W" },
    { value: "1m", label: "1M" },
    { value: "3m", label: "3M" },
    { value: "6m", label: "6M" },
    { value: "1y", label: "1Y" },
    { value: "5y", label: "5Y" },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", { 
                style: "currency", 
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 3
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8
        }
      },
      y: {
        position: "right",
        grid: {
          color: "rgba(200, 200, 200, 0.2)"
        },
        ticks: {
          callback: function(value) {
            return "$" + value.toFixed(3);
          }
        }
      }
    },
    interaction: {
      mode: "index",
      intersect: false
    },
    hover: {
      mode: "index",
      intersect: false
    }
  };

  if (!stockData || stockData.length === 0) {
    return (
      <div className="stock-chart-container">
        <div className="chart-header">
          <div className="chart-title">
            <h2>Loading chart...</h2>
          </div>
        </div>
        <div className="chart-placeholder">
          <div className="loading-spinner"></div>
          <p>Loading stock data...</p>
        </div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="stock-chart-container loading">
        <div className="chart-loading">
          <div className="chart-skeleton"></div>
          <div className="chart-details-skeleton">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        </div>
      </div>
    );
  }

  const isPositive = chartData.priceChange >= 0;

  return (
    <div className="stock-chart-container">
      <div className="chart-header">
        <div className="chart-title">
          <h2>{companyName || symbol}</h2>
          <div className="chart-subtitle">
            <span className="current-price">
              ${chartData.currentPrice.toFixed(3)}
            </span>
            <span className={`price-change ${isPositive ? "positive" : "negative"}`}>
              {isPositive ? "" : ""} ${Math.abs(chartData.priceChange).toFixed(3)} ({Math.abs(chartData.priceChangePercent).toFixed(3)}%)
            </span>
          </div>
        </div>
        <div className="period-selector">
          {periods.map(p => (
            <button 
              key={p.value}
              className={`period-button ${period === p.value ? "active" : ""}`}
              onClick={() => onPeriodChange(p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default StockChart;
