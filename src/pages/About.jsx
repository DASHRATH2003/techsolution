import React, { useState, useEffect, useRef } from 'react';
import { companyAPI, teamAPI } from '../services/api';
import './About.css';

const About = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [leadership, setLeadership] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    fetchAboutData();
    setupIntersectionObserver();
    setupMouseTracking();

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
      const [companyResponse, leadershipResponse] = await Promise.all([
        companyAPI.getCompanyInfo(),
        teamAPI.getLeadership()
      ]);

      setCompanyInfo(companyResponse.data);
      setLeadership(leadershipResponse.data);
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
      <section className="about-hero" ref={heroRef}>
        <div className="hero-background">
          <div
            className="hero-gradient"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          />
        </div>
        <div className="container">
          <div className="hero-content animate-fade-up">
            <h1>About {companyInfo?.name || 'Our Company'}</h1>
            <p className="hero-subtitle">{companyInfo?.tagline || 'Building the future, one project at a time'}</p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="company-story" data-section="story">
        <div className="container">
          <div className={`story-content ${isVisible.story ? 'animate-slide-up' : ''}`}>
            <div className="story-text">
              <h2>Our Story</h2>
              <p>{companyInfo?.story || 'We started with a simple mission: to help businesses succeed through innovative solutions and exceptional service.'}</p>
            </div>
            <div className="story-timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>2018</h3>
                  <p>Company Founded</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>2020</h3>
                  <p>Expanded Services</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>2023</h3>
                  <p>Global Reach</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision" data-section="mv">
        <div className="container">
          <div className={`mv-grid ${isVisible.mv ? 'animate-slide-up' : ''}`}>
            <div className="mv-card">
              <div className="card-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>{companyInfo?.mission || 'To deliver exceptional value to our clients through innovative solutions and outstanding service.'}</p>
            </div>
            <div className="mv-card">
              <div className="card-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>{companyInfo?.vision || 'To be the leading provider of innovative solutions that transform businesses and improve lives.'}</p>
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

      {/* Leadership Team */}
      {leadership.length > 0 && (
        <section className="leadership" data-section="team">
          <div className="container">
            <div className={`section-header ${isVisible.team ? 'animate-fade-up' : ''}`}>
              <h2>Leadership Team</h2>
              <p>Meet the people leading our company forward</p>
            </div>
            <div className={`leadership-grid ${isVisible.team ? 'animate-slide-up' : ''}`}>
              {leadership.map((member, index) => (
                <div 
                  key={member._id} 
                  className="leader-card"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="leader-image">
                    {member.image ? (
                      <img src={member.image} alt={member.name} />
                    ) : (
                      <div className="placeholder-avatar">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="leader-info">
                    <h3>{member.name}</h3>
                    <p className="position">{member.position}</p>
                    <p className="bio">{member.bio}</p>
                    {member.socialMedia && (
                      <div className="social-links">
                        {member.socialMedia.linkedin && (
                          <a href={member.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                            LinkedIn
                          </a>
                        )}
                        {member.socialMedia.twitter && (
                          <a href={member.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                            Twitter
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="stats-section" data-section="stats">
        <div className="container">
          <div className={`stats-grid ${isVisible.stats ? 'animate-slide-up' : ''}`}>
            <div className="stat-item">
              <div className="stat-number">
                <span className="counter">100</span>+
              </div>
              <p>Projects Completed</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <span className="counter">50</span>+
              </div>
              <p>Happy Clients</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <span className="counter">5</span>+
              </div>
              <p>Years Experience</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <p>Support Available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
