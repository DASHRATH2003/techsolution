import React, { useState, useEffect } from 'react';
import { companyAPI, teamAPI } from '../services/api';
import './About.css';

const About = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [leadership, setLeadership] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

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
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>About {companyInfo?.name || 'Our Company'}</h1>
            <p>{companyInfo?.tagline || 'Building the future, one project at a time'}</p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="company-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>{companyInfo?.story || 'We started with a simple mission: to help businesses succeed through innovative solutions and exceptional service.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <h3>Our Mission</h3>
              <p>{companyInfo?.mission || 'To deliver exceptional value to our clients through innovative solutions and outstanding service.'}</p>
            </div>
            <div className="mv-card">
              <h3>Our Vision</h3>
              <p>{companyInfo?.vision || 'To be the leading provider of innovative solutions that transform businesses and improve lives.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      {companyInfo?.values && companyInfo.values.length > 0 && (
        <section className="company-values">
          <div className="container">
            <div className="section-header">
              <h2>Our Values</h2>
              <p>The principles that guide everything we do</p>
            </div>
            <div className="values-grid">
              {companyInfo.values.map((value, index) => (
                <div key={index} className="value-card">
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
        <section className="leadership">
          <div className="container">
            <div className="section-header">
              <h2>Leadership Team</h2>
              <p>Meet the people leading our company forward</p>
            </div>
            <div className="leadership-grid">
              {leadership.map((member) => (
                <div key={member._id} className="leader-card">
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

      {/* Achievements */}
      {companyInfo?.achievements && companyInfo.achievements.length > 0 && (
        <section className="achievements">
          <div className="container">
            <div className="section-header">
              <h2>Our Achievements</h2>
              <p>Milestones that mark our journey</p>
            </div>
            <div className="achievements-timeline">
              {companyInfo.achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <div className="achievement-date">
                    {new Date(achievement.date).getFullYear()}
                  </div>
                  <div className="achievement-content">
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>100+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat-item">
              <h3>5+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Support Available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
