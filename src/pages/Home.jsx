import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { companyAPI, servicesAPI, testimonialsAPI } from '../services/api';
import './Home.css';

const Home = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    fetchHomeData();
    setupIntersectionObserver();
    setupMouseTracking();
    setupTestimonialRotation();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Intersection Observer for scroll animations
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

  // Mouse tracking for parallax effects
  const setupMouseTracking = () => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  };

  // Auto-rotate testimonials
  const setupTestimonialRotation = () => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  };

  // Observe sections when they mount
  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });
  }, [loading]);

  // Helper function to get service icons
  const getServiceIcon = (title) => {
    const iconMap = {
      'Web Development': '🌐',
      'Mobile App': '📱',
      'E-commerce': '🛒',
      'Digital Marketing': '📈',
      'UI/UX Design': '🎨',
      'Cloud Services': '☁️',
      'Data Analytics': '📊',
      'Consulting': '💡'
    };

    // Find matching icon or use default
    const matchedKey = Object.keys(iconMap).find(key =>
      title.toLowerCase().includes(key.toLowerCase())
    );

    return iconMap[matchedKey] || '⚡';
  };

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const [companyResponse, servicesResponse, testimonialsResponse] = await Promise.all([
        companyAPI.getCompanyInfo(),
        servicesAPI.getAllServices({ isActive: true }),
        testimonialsAPI.getFeaturedTestimonials()
      ]);

      setCompanyInfo(companyResponse.data);
      setServices(servicesResponse.data.slice(0, 6)); // Show first 6 services
      setTestimonials(testimonialsResponse.data.slice(0, 3)); // Show first 3 testimonials
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      {/* Animated Background Particles */}
      <div className="particles-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-background">
          <div
            className="hero-gradient"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          />
          <div className="floating-shapes">
            <div className="shape shape-1" />
            <div className="shape shape-2" />
            <div className="shape shape-3" />
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-text animate-slide-up">
            <div className="hero-badge">
              <span>🚀 Innovation Meets Excellence</span>
            </div>
            <h1 className="hero-title">
              <span className="title-line">Transform Your</span>
              <span className="title-line gradient-text">Digital Dreams</span>
              <span className="title-line">Into Reality</span>
            </h1>
            <p className="hero-description">
              {companyInfo?.mission || 'We craft cutting-edge solutions that propel your business into the future. From concept to deployment, we\'re your trusted technology partner.'}
            </p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary btn-glow">
                <span>Start Your Journey</span>
                <div className="btn-shine" />
              </Link>
              <Link to="/services" className="btn btn-secondary btn-glass">
                <span>Explore Services</span>
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">99%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card floating">
              <div className="card-glow" />
              <div className="tech-stack">
                <div className="tech-item">React</div>
                <div className="tech-item">Node.js</div>
                <div className="tech-item">MongoDB</div>
                <div className="tech-item">AWS</div>
              </div>
              <div className="code-preview">
                <div className="code-line">
                  <span className="code-keyword">const</span>
                  <span className="code-variable"> success</span>
                  <span className="code-operator"> = </span>
                  <span className="code-function">buildAmazing</span>
                  <span className="code-bracket">(</span>
                  <span className="code-string">'your-idea'</span>
                  <span className="code-bracket">);</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>Scroll to explore</p>
        </div>
      </section>

      {/* Services Section */}
      <section
        className={`services-preview ${isVisible.services ? 'animate-in' : ''}`}
        data-section="services"
      >
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <span>💼 What We Do</span>
            </div>
            <h2 className="section-title">
              Our <span className="gradient-text">Premium</span> Services
            </h2>
            <p className="section-description">
              Cutting-edge solutions tailored to accelerate your business growth
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div
                key={service._id}
                className="service-card modern-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-background" />
                <div className="service-icon">
                  <div className="icon-glow" />
                  {getServiceIcon(service.title)}
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.shortDescription}</p>
                  <div className="service-features">
                    <span className="feature-tag">Modern</span>
                    <span className="feature-tag">Scalable</span>
                    <span className="feature-tag">Secure</span>
                  </div>
                </div>
                <Link to={`/services/${service._id}`} className="service-link modern-link">
                  <span>Explore Service</span>
                  <svg className="link-arrow" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <div className="card-hover-effect" />
              </div>
            ))}
          </div>

          <div className="section-footer">
            <Link to="/services" className="btn btn-outline btn-large">
              <span>View All Services</span>
              <div className="btn-particles">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="particle-dot" />
                ))}
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About Our Company</h2>
              <p>{companyInfo?.story || 'We are a dedicated team committed to delivering excellence.'}</p>
              <Link to="/about" className="btn btn-primary">Learn More About Us</Link>
            </div>
            <div className="about-stats">
              <div className="stat">
                <h3>100+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>50+</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stat">
                <h3>5+</h3>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="testimonials-preview">
          <div className="container">
            <div className="section-header">
              <h2>What Our Clients Say</h2>
              <p>Don't just take our word for it</p>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} className="testimonial-card">
                  <div className="testimonial-content">
                    <p>"{testimonial.testimonial}"</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4>{testimonial.clientName}</h4>
                      <p>{testimonial.clientPosition} at {testimonial.companyName}</p>
                    </div>
                    <div className="rating">
                      {'★'.repeat(testimonial.rating)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="section-footer">
              <Link to="/testimonials" className="btn btn-outline">View All Testimonials</Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Let's discuss how we can help your business grow</p>
            <Link to="/contact" className="btn btn-primary btn-large">Contact Us Today</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
