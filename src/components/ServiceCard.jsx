import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service, index, mousePosition }) => (
  <div
    className="service-card"
    data-section={`service-${index}`}
    style={{ 
      animationDelay: `${index * 0.1}s`,
      background: `${service.bgColor}`,
    }}
  >
    <div className="service-content">
      <div className="service-icon-wrapper">
        <div className="service-icon">{service.icon}</div>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      
      <div className="service-features">
        {service.features.map((feature, idx) => (
          <span key={idx} className="feature-tag">
            {feature}
          </span>
        ))}
      </div>
      
      <div className="service-tech">
        {service.technologies.map((tech, idx) => (
          <span key={idx} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>

      <Link to={service.link} className="service-link">
        Learn More
        <svg viewBox="0 0 24 24" className="arrow-icon">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
    
    <div className="card-shapes">
      {[...Array(3)].map((_, i) => (
        <div 
          key={i} 
          className="shape"
          style={{
            transform: `rotate(${i * 120}deg) translateX(${mousePosition.x * 5}px) translateY(${mousePosition.y * 5}px)`
          }}
        />
      ))}
    </div>
  </div>
);

export default ServiceCard; 