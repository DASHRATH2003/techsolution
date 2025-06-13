import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { careersAPI } from '../services/api';

const Careers = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  useEffect(() => {
    fetchPositions();
  }, [selectedDepartment]);

  const fetchPositions = async () => {
    try {
      setLoading(true);
      const params = selectedDepartment !== 'all' ? { department: selectedDepartment, isActive: true } : { isActive: true };
      const response = await careersAPI.getAllPositions(params);
      setPositions(response.data);
    } catch (error) {
      console.error('Error fetching career positions:', error);
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'operations', label: 'Operations' },
    { value: 'management', label: 'Management' }
  ];

  if (loading) {
    return <div className="loading">Loading career opportunities...</div>;
  }

  return (
    <div className="careers">
      <section className="careers-hero">
        <div className="container">
          <h1>Join Our Team</h1>
          <p>Build your career with us and make a difference</p>
        </div>
      </section>

      <section className="careers-content">
        <div className="container">
          <div className="careers-filters">
            {departments.map(department => (
              <button
                key={department.value}
                className={`filter-btn ${selectedDepartment === department.value ? 'active' : ''}`}
                onClick={() => setSelectedDepartment(department.value)}
              >
                {department.label}
              </button>
            ))}
          </div>

          {positions.length > 0 ? (
            <div className="positions-list">
              {positions.map(position => (
                <div key={position._id} className="position-card">
                  <div className="position-header">
                    <h3>{position.title}</h3>
                    <div className="position-meta">
                      <span className="department">{position.department}</span>
                      <span className="type">{position.type}</span>
                      <span className="location">{position.location}</span>
                    </div>
                  </div>
                  <div className="position-content">
                    <p>{position.description.substring(0, 200)}...</p>
                    <div className="position-details">
                      <span className="experience">Experience: {position.experience}</span>
                      {position.salary && position.salary.min && (
                        <span className="salary">
                          Salary: ${position.salary.min.toLocaleString()} - ${position.salary.max.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="position-footer">
                    <Link to={`/careers/${position._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-positions">
              <h2>No Open Positions</h2>
              <p>We don't have any open positions in the selected department right now, but we're always looking for talented people!</p>
              <Link to="/contact" className="btn btn-primary">
                Send Us Your Resume
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="company-culture">
        <div className="container">
          <div className="culture-content">
            <h2>Why Work With Us?</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <h3>🚀 Growth Opportunities</h3>
                <p>Continuous learning and career advancement opportunities</p>
              </div>
              <div className="benefit-item">
                <h3>💼 Competitive Benefits</h3>
                <p>Health insurance, retirement plans, and more</p>
              </div>
              <div className="benefit-item">
                <h3>🏠 Flexible Work</h3>
                <p>Remote work options and flexible schedules</p>
              </div>
              <div className="benefit-item">
                <h3>🎯 Meaningful Work</h3>
                <p>Work on projects that make a real impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
