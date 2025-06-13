import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { companyAPI } from '../services/api';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [companyInfo, setCompanyInfo] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await companyAPI.getCompanyInfo();
      setCompanyInfo(response.data);
    } catch (error) {
      console.error('Error fetching company info:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" onClick={closeMenu}>
              <h2>{companyInfo?.name || ''}</h2>
            </Link>
          </div>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link 
                  to="/" 
                  className={`nav-link ${isActive('/')}`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/about" 
                  className={`nav-link ${isActive('/about')}`}
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link 
                  to="/services" 
                  className={`nav-link ${isActive('/services')}`}
                  onClick={closeMenu}
                >
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/portfolio" 
                  className={`nav-link ${isActive('/portfolio')}`}
                  onClick={closeMenu}
                >
                  Portfolio
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/blog" 
                  className={`nav-link ${isActive('/blog')}`}
                  onClick={closeMenu}
                >
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/careers" 
                  className={`nav-link ${isActive('/careers')}`}
                  onClick={closeMenu}
                >
                  Careers
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/contact" 
                  className={`nav-link ${isActive('/contact')} cta-button`}
                  onClick={closeMenu}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          <button 
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
