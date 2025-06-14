import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-hero-section">
      <div className="about-container">
        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="about-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Grow your Business &<br />
              Customer Satisfaction<br />
              with <span className="highlight">Quiety</span>
            </motion.h1>
            
            <motion.p 
              className="about-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Dynamically disintermediate technically sound technologies with
              compelling quality vectors error-free communities.
            </motion.p>

            <motion.div 
              className="about-cta-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/careers" className="btn btn-primary">
                Open Positions
              </Link>
              <Link to="/team" className="btn btn-secondary">
                Meet Our Team
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="about-image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img 
              src="/images/about/team-meeting.jpg" 
              alt="Team brainstorming session" 
              className="main-image"
            />
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="background-elements">
        <div className="gradient-circle gradient-1"></div>
        <div className="gradient-circle gradient-2"></div>
        <div className="gradient-circle gradient-3"></div>
      </div>
    </section>
  );
};

export default AboutSection; 