import React, { useState, useEffect } from 'react';
import { testimonialsAPI } from '../services/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await testimonialsAPI.getAllTestimonials({ isActive: true });
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading testimonials...</div>;
  }

  return (
    <div className="testimonials">
      <section className="testimonials-hero">
        <div className="container">
          <h1>Client Testimonials</h1>
          <p>What our clients say about working with us</p>
        </div>
      </section>

      <section className="testimonials-content">
        <div className="container">
          {testimonials.length > 0 ? (
            <div className="testimonials-grid">
              {testimonials.map(testimonial => (
                <div key={testimonial._id} className="testimonial-card">
                  <div className="testimonial-content">
                    <div className="rating">
                      {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                    </div>
                    <blockquote>
                      "{testimonial.testimonial}"
                    </blockquote>
                  </div>
                  
                  <div className="testimonial-author">
                    <div className="author-image">
                      {testimonial.clientImage ? (
                        <img src={testimonial.clientImage} alt={testimonial.clientName} />
                      ) : (
                        <div className="placeholder-avatar">
                          {testimonial.clientName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="author-info">
                      <h3>{testimonial.clientName}</h3>
                      <p>{testimonial.clientPosition}</p>
                      <p className="company">{testimonial.companyName}</p>
                    </div>
                  </div>

                  {testimonial.projectType && (
                    <div className="project-info">
                      <span className="project-type">
                        {testimonial.projectType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      {testimonial.projectDuration && (
                        <span className="project-duration">
                          Duration: {testimonial.projectDuration}
                        </span>
                      )}
                    </div>
                  )}

                  {testimonial.isVideoTestimonial && testimonial.videoUrl && (
                    <div className="video-testimonial">
                      <a href={testimonial.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                        Watch Video Testimonial
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-testimonials">
              <h2>No Testimonials Yet</h2>
              <p>We're working hard to deliver exceptional results for our clients. Check back soon for testimonials!</p>
            </div>
          )}
        </div>
      </section>

      <section className="testimonials-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Join Our Happy Clients?</h2>
            <p>Let's discuss how we can help you achieve your goals</p>
            <a href="/contact" className="btn btn-primary">Start Your Project</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
