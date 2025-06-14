import React, { useState, useEffect, useRef } from 'react';
import { companyAPI } from '../services/api';
import { Link } from 'react-router-dom';
import welcomeImage from '../assets/welcome.jpg';
import businessProcessImage from '../assets/businessprocess.png';
import './About.css';

const About = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState({});
  const heroRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    fetchAboutData();
    setupIntersectionObserver();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const setupIntersectionObserver = () => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );
  };

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });
  }, [loading]);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const companyResponse = await companyAPI.getCompanyInfo();
      setCompanyInfo(companyResponse.data);
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero-section" ref={heroRef}>
        <div className="about-container">
          <div className="about-content">
            <div className="about-text">
              <h1 className="about-title">
                Grow your Business<br />
                &<br />
                Customer<br />
                Satisfaction<br />
                with <span className="highlight">TechSolutions Inc.</span>
              </h1>
              
              <p className="about-description">
                Dynamically disintermediate technically sound technologies with compelling quality vectors error-free communities.
              </p>

              <div className="about-cta-buttons">
                <Link to="/careers" className="btn btn-primary">
                  Open Positions
                </Link>
                <Link to="/team" className="btn btn-secondary">
                  Meet Our Team
                </Link>
              </div>
            </div>

            <div className="about-image">
              <img 
                src={welcomeImage}
                alt="Team brainstorming session" 
                className="main-image"
              />
              <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="background-elements">
          <div className="gradient-circle gradient-1"></div>
          <div className="gradient-circle gradient-2"></div>
          <div className="gradient-circle gradient-3"></div>
        </div>
      </section>

      {/* About Description Section */}
      <section className="about-description-section" data-section="description">
        <div className="container">
          <div className="about-description-content">
            <h2>About Us</h2>
            <div className="company-tagline">
              <p>Driven by high moral values and ethics, TechSolutions Inc. is a web development company which nurtures your website.</p>
            </div>
            
            <div className="company-motto">
              <blockquote>THE BEST OF A DIGITAL DESIGN AND MARKETING COMPANY</blockquote>
              <p>TechSolutions Inc. is an innovative, managed outsourcing and the Internet strategy company whose forte lies in being creative and an early technology adopter.</p>
            </div>

            <div className="company-info">
              <div className="info-graphic">
                <img 
                  src={businessProcessImage}
                  alt="TechSolutions Inc. Business Process" 
                  className="process-image"
                />
              </div>
              
              <div className="info-text">
                <p>TechSolutions Inc., founded in 2019, started as a small team of passionate developers with a vision to help businesses leverage technology for growth. The company journey started with an initial strength of just four persons, then has developed in leap and bounds during the past years and delivered many potential, viable and scalable solutions to many trusted clients across the globe. Our team works with total devotion, commitment and hard-work of all involved and today we stand proud with a wide-ranging team of skilled professionals.</p>
                
                <p>TechSolutions Inc. is a family of design, solutions, and Internet-based businesses, which makes it easy for everyone to buy or sell online from anywhere to any place in the world. Since its beginning, it has developed leading businesses in consumer e-commerce, online payment, business-to-business markets and cloud computing, reaching Internet users worldwide.</p>
                
                <p>TechSolutions Inc. is a certified company, which affirms our total commitment to quality along with reliability of applications. Our experienced IT professional team has designed, managed, built and maintained high quality applications for a wide range of business verticals including individual business requirements.</p>
                
                <p>Web design, web development, E-Commerce, mobile app development and other web services are under one roof that gives you the one-stop solution to enhance your business that leads to better direction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      {companyInfo?.values && companyInfo.values.length > 0 && (
        <section className="company-values" data-section="values">
          <div className="container">
            <div className={`section-header ${isVisible.values ? 'animate-fade-up' : ''}`}>
              <h2>Our Values</h2>
              <p>The principles that guide everything we do</p>
            </div>
            <div className={`values-grid ${isVisible.values ? 'animate-slide-up' : ''}`}>
              {companyInfo.values.map((value, index) => (
                <div 
                  key={index} 
                  className="value-card"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="value-icon">💫</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default About;