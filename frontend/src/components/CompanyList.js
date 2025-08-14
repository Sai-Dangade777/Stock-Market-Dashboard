import React from 'react';
import { Link } from 'react-router-dom';
import './CompanyList.css';

const CompanyList = ({ companies, selectedCompany, onSelectCompany, isLoading }) => {
  if (isLoading) {
    return (
      <div className="company-list-container">
        <h2 className="company-list-title">Companies</h2>
        <div className="company-list-loading">
          <div className="company-skeleton"></div>
          <div className="company-skeleton"></div>
          <div className="company-skeleton"></div>
          <div className="company-skeleton"></div>
          <div className="company-skeleton"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="company-list-container">
      <h2 className="company-list-title">Companies</h2>
      <div className="company-search">
        <input
          type="text"
          placeholder="Search companies..."
          className="search-input"
        />
      </div>
      <ul className="company-list">
        {companies.map((company) => (
          <li 
            key={company.symbol}
            className={`company-item ${selectedCompany === company.symbol ? 'selected' : ''}`}
            onClick={() => onSelectCompany(company.symbol)}
          >
            <div className="company-info">
              <h3 className="company-name">{company.name}</h3>
              <span className="company-symbol">{company.symbol}</span>
            </div>
            <span className="company-sector">{company.sector}</span>
          </li>
        ))}
      </ul>
      {selectedCompany && (
        <div className="view-details">
          <Link to={`/stock/${selectedCompany}`} className="view-details-link">
            View Full Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default CompanyList;
