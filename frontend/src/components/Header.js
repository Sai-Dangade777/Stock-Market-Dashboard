import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaMoon, FaSun } from 'react-icons/fa';
import ThemeContext from '../context/ThemeContext';
import './Header.css';

const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <FaChartLine className="logo-icon" />
          <span>StockInsight</span>
        </Link>
        
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <a href="https://github.com/Sai-Dangade777/JarNox-Stock-Dashboard" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
        
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
