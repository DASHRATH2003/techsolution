import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO, TechVision Inc",
    image: "/images/testimonials/sarah.jpg",
    rating: 5,
    text: "Working with this team has been transformative for our business. Their expertise in web development and commitment to quality delivered results that exceeded our expectations.",
    company_logo: "/images/companies/techvision.svg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, InnovateLab",
    image: "/images/testimonials/michael.jpg",
    rating: 5,
    text: "The mobile app they developed for us has received outstanding feedback from our users. Their attention to detail and innovative solutions set them apart from other developers.",
    company_logo: "/images/companies/innovatelab.svg"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager, FinTech Solutions",
    image: "/images/testimonials/emily.jpg",
    rating: 5,
    text: "Their team's deep understanding of UI/UX principles helped us create an intuitive and beautiful interface. The end result has significantly improved our user engagement metrics.",
    company_logo: "/images/companies/fintech.svg"
  }
];

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = testimonials.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonials-section" data-section="testimonials">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="section-description">
            Don't just take our word for it - hear from some of our satisfied clients about their experience working with us.
          </p>
        </div>

        <div className="testimonials-slider">
          <div 
            className="testimonials-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-author">
                    <div className="author-image">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="author-info">
                      <h3>{testimonial.name}</h3>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="company-logo">
                    <img src={testimonial.company_logo} alt="Company Logo" />
                  </div>
                </div>
                
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <svg key={index} width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <div className="testimonial-content">
                  <p>{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="slider-controls">
            <button className="prev-btn" onClick={prevSlide} aria-label="Previous testimonial">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="slider-dots">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  className={`dot-btn ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button className="next-btn" onClick={nextSlide} aria-label="Next testimonial">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 