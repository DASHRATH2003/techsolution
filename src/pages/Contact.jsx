import React, { useState, useEffect } from 'react';
import { companyAPI, contactAPI } from '../services/api';
import './Contact.css';

const Contact = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general',
    serviceInterest: '',
    budget: 'not-specified',
    timeline: 'not-specified'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await contactAPI.sendMessage(formData);
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: 'general',
        serviceInterest: '',
        budget: 'not-specified',
        timeline: 'not-specified'
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Contact Us</h1>
            <p>Get in touch with us to discuss your project</p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="inquiryType">Inquiry Type</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="service-inquiry">Service Inquiry</option>
                    <option value="support">Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="career">Career</option>
                  </select>
                </div>

                {formData.inquiryType === 'service-inquiry' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="serviceInterest">Service Interest</label>
                      <select
                        id="serviceInterest"
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a service</option>
                        <option value="web-development">Web Development</option>
                        <option value="mobile-development">Mobile Development</option>
                        <option value="consulting">Consulting</option>
                        <option value="design">Design</option>
                        <option value="marketing">Marketing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="budget">Budget Range</label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                        >
                          <option value="not-specified">Not Specified</option>
                          <option value="under-5k">Under $5,000</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-25k">$10,000 - $25,000</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="50k-100k">$50,000 - $100,000</option>
                          <option value="over-100k">Over $100,000</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="timeline">Timeline</label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                        >
                          <option value="not-specified">Not Specified</option>
                          <option value="asap">ASAP</option>
                          <option value="1-month">Within 1 month</option>
                          <option value="2-3-months">2-3 months</option>
                          <option value="3-6-months">3-6 months</option>
                          <option value="6-months-plus">6+ months</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                {submitStatus && (
                  <div className={`form-status ${submitStatus.type}`}>
                    {submitStatus.message}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Get in Touch</h2>
              
              {companyInfo && (
                <div className="contact-details">
                  {companyInfo.contact?.email && (
                    <div className="contact-item">
                      <h3>Email</h3>
                      <p>
                        <a href={`mailto:${companyInfo.contact.email}`}>
                          {companyInfo.contact.email}
                        </a>
                      </p>
                    </div>
                  )}

                  {companyInfo.contact?.phone && (
                    <div className="contact-item">
                      <h3>Phone</h3>
                      <p>
                        <a href={`tel:${companyInfo.contact.phone}`}>
                          {companyInfo.contact.phone}
                        </a>
                      </p>
                    </div>
                  )}

                  {companyInfo.address && (
                    <div className="contact-item">
                      <h3>Address</h3>
                      <p>
                        {companyInfo.address.street}<br />
                        {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zipCode}<br />
                        {companyInfo.address.country}
                      </p>
                    </div>
                  )}

                  {companyInfo.contact?.businessHours && (
                    <div className="contact-item">
                      <h3>Business Hours</h3>
                      <p>{companyInfo.contact.businessHours}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="contact-cta">
                <h3>Prefer to call?</h3>
                <p>We're here to help and answer any questions you might have.</p>
                {companyInfo?.contact?.phone && (
                  <a href={`tel:${companyInfo.contact.phone}`} className="btn btn-outline">
                    Call Now
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
