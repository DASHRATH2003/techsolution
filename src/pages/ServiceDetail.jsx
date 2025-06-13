import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesAPI } from '../services/api';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      setLoading(true);
      const response = await servicesAPI.getService(id);
      setService(response.data);
    } catch (error) {
      console.error('Error fetching service:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading service details...</div>;
  }

  if (!service) {
    return (
      <div className="service-not-found">
        <div className="container">
          <h1>Service Not Found</h1>
          <p>The service you're looking for doesn't exist.</p>
          <Link to="/services" className="btn btn-primary">Back to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="service-detail">
      <section className="service-hero">
        <div className="container">
          <h1>{service.title}</h1>
          <p>{service.shortDescription}</p>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="service-grid">
            <div className="service-main">
              <div className="service-description">
                <h2>About This Service</h2>
                <p>{service.description}</p>
              </div>

              {service.features && service.features.length > 0 && (
                <div className="service-features">
                  <h2>What's Included</h2>
                  <ul>
                    {service.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {service.caseStudies && service.caseStudies.length > 0 && (
                <div className="case-studies">
                  <h2>Case Studies</h2>
                  <div className="case-studies-grid">
                    {service.caseStudies.map((caseStudy, index) => (
                      <div key={index} className="case-study-card">
                        <h3>{caseStudy.title}</h3>
                        <p><strong>Client:</strong> {caseStudy.clientName}</p>
                        <p>{caseStudy.description}</p>
                        {caseStudy.results && (
                          <p><strong>Results:</strong> {caseStudy.results}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="service-sidebar">
              <div className="pricing-card">
                <h3>Pricing</h3>
                <div className="price">
                  {service.pricing.type === 'contact' ? 'Contact for pricing' : 
                   service.pricing.type === 'custom' ? 'Custom pricing' :
                   `$${service.pricing.amount}${service.pricing.period === 'hourly' ? '/hr' : 
                   service.pricing.period === 'monthly' ? '/month' : 
                   service.pricing.period === 'yearly' ? '/year' : ''}`}
                </div>
                <Link to="/contact" className="btn btn-primary btn-full">
                  Get Started
                </Link>
              </div>

              <div className="service-info">
                <h3>Service Details</h3>
                <div className="info-item">
                  <strong>Category:</strong> {service.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
                <div className="info-item">
                  <strong>Pricing Type:</strong> {service.pricing.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
              </div>

              <div className="cta-section">
                <h3>Ready to Get Started?</h3>
                <p>Contact us to discuss your project requirements.</p>
                <Link to="/contact" className="btn btn-outline btn-full">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
