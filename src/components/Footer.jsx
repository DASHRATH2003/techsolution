import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { companyAPI } from '../services/api';
import './Footer.css';

const Footer = () => {
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await companyAPI.getContactInfo();
      setCompanyInfo(response.data);
    } catch (error) {
      console.error('Error fetching company info:', error);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            {companyInfo && (
              <div className="contact-info">
                {companyInfo.contact?.email && (
                  <p>
                    <strong>Email:</strong> 
                    <a href={`mailto:${companyInfo.contact.email}`}>
                      {companyInfo.contact.email}
                    </a>
                  </p>
                )}
                {companyInfo.contact?.phone && (
                  <p>
                    <strong>Phone:</strong> 
                    <a href={`tel:${companyInfo.contact.phone}`}>
                      {companyInfo.contact.phone}
                    </a>
                  </p>
                )}
                {companyInfo.address && (
                  <p>
                    <strong>Address:</strong><br />
                    {companyInfo.address.street}<br />
                    {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zipCode}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            {companyInfo?.socialMedia && (
              <div className="social-links">
                {companyInfo.socialMedia.facebook && (
                  <a href={companyInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                )}
                {companyInfo.socialMedia.twitter && (
                  <a href={companyInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                )}
                {companyInfo.socialMedia.linkedin && (
                  <a href={companyInfo.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                )}
                {companyInfo.socialMedia.instagram && (
                  <a href={companyInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
