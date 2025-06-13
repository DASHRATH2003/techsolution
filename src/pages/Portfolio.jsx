import React from 'react';

const Portfolio = () => {
  return (
    <div className="portfolio">
      <section className="portfolio-hero">
        <div className="container">
          <h1>Our Portfolio</h1>
          <p>Showcasing our best work and client success stories</p>
        </div>
      </section>

      <section className="portfolio-content">
        <div className="container">
          <div className="coming-soon">
            <h2>Portfolio Coming Soon</h2>
            <p>We're currently updating our portfolio with our latest projects. Check back soon!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
