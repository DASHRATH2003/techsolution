import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { careersAPI } from '../services/api';

const CareerDetail = () => {
  const { id } = useParams();
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosition();
  }, [id]);

  const fetchPosition = async () => {
    try {
      setLoading(true);
      const response = await careersAPI.getPosition(id);
      setPosition(response.data);
    } catch (error) {
      console.error('Error fetching career position:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading position details...</div>;
  }

  if (!position) {
    return (
      <div className="position-not-found">
        <div className="container">
          <h1>Position Not Found</h1>
          <p>The position you're looking for doesn't exist or is no longer available.</p>
          <Link to="/careers" className="btn btn-primary">Back to Careers</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="career-detail">
      <section className="position-hero">
        <div className="container">
          <h1>{position.title}</h1>
          <div className="position-meta">
            <span className="department">{position.department}</span>
            <span className="type">{position.type}</span>
            <span className="location">{position.location}</span>
            <span className="experience">{position.experience}</span>
          </div>
        </div>
      </section>

      <section className="position-content">
        <div className="container">
          <div className="position-grid">
            <div className="position-main">
              <div className="position-description">
                <h2>About This Position</h2>
                <p>{position.description}</p>
              </div>

              {position.responsibilities && position.responsibilities.length > 0 && (
                <div className="position-section">
                  <h2>Responsibilities</h2>
                  <ul>
                    {position.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              )}

              {position.requirements && position.requirements.length > 0 && (
                <div className="position-section">
                  <h2>Requirements</h2>
                  <ul>
                    {position.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {position.preferredQualifications && position.preferredQualifications.length > 0 && (
                <div className="position-section">
                  <h2>Preferred Qualifications</h2>
                  <ul>
                    {position.preferredQualifications.map((qualification, index) => (
                      <li key={index}>{qualification}</li>
                    ))}
                  </ul>
                </div>
              )}

              {position.skills && position.skills.length > 0 && (
                <div className="position-section">
                  <h2>Required Skills</h2>
                  <div className="skills-list">
                    {position.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {position.benefits && position.benefits.length > 0 && (
                <div className="position-section">
                  <h2>Benefits</h2>
                  <ul>
                    {position.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="position-sidebar">
              <div className="apply-card">
                <h3>Ready to Apply?</h3>
                {position.salary && position.salary.min && (
                  <div className="salary-info">
                    <strong>Salary Range:</strong><br />
                    ${position.salary.min.toLocaleString()} - ${position.salary.max.toLocaleString()} {position.salary.period}
                  </div>
                )}
                <div className="application-info">
                  <p>{position.applicationInstructions}</p>
                </div>
                <Link to="/contact" className="btn btn-primary btn-full">
                  Apply Now
                </Link>
              </div>

              <div className="position-info">
                <h3>Position Details</h3>
                <div className="info-item">
                  <strong>Department:</strong> {position.department}
                </div>
                <div className="info-item">
                  <strong>Employment Type:</strong> {position.type}
                </div>
                <div className="info-item">
                  <strong>Location:</strong> {position.location}
                </div>
                <div className="info-item">
                  <strong>Experience Level:</strong> {position.experience}
                </div>
                {position.applicationDeadline && (
                  <div className="info-item">
                    <strong>Application Deadline:</strong> {new Date(position.applicationDeadline).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="share-section">
                <h3>Share This Position</h3>
                <p>Know someone who might be interested?</p>
                <button 
                  onClick={() => navigator.share ? navigator.share({
                    title: position.title,
                    url: window.location.href
                  }) : navigator.clipboard.writeText(window.location.href)}
                  className="btn btn-outline btn-full"
                >
                  Share Position
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerDetail;
