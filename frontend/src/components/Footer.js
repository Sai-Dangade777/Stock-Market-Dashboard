import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-info">
          <p>&copy; {currentYear} StockInsight Dashboard</p>
          <p>Created by Sai Dangade</p>
        </div>
        <div className="footer-links">
          <a href="https://github.com/Sai-Dangade777" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
