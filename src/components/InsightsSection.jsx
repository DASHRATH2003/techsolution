import React from 'react';
import { Link } from 'react-router-dom';

const insightsPosts = [
  {
    id: 1,
    category: "Blogs",
    title: "Flutter's Isolates: Do Heavy Lifting Without Freezing Your App (or Your Brain)",
    author: "Ajinkya Karanjikar",
    date: "14 May 2025",
    image: "/images/flutter-isolates.svg",
    link: "/blog/flutter-isolates"
  },
  {
    id: 2,
    category: "On Stage",
    title: "Web Summit 2025 | Panel Discussion Ft. Gautam Rege",
    author: "Gautam Rege",
    date: "03 Jun 2025",
    image: "/images/web-summit.svg",
    link: "/events/web-summit-2025"
  },
  {
    id: 3,
    category: "Insights",
    title: "Josh AI Fintech Forum",
    author: "LinkedIn Group",
    company: "Josh Software",
    image: "/images/ai-fintech.svg",
    link: "/insights/ai-fintech-forum"
  }
];

const InsightsSection = () => {
  return (
    <section className="insights-section" data-section="insights">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">
            Insights & <span className="gradient-text">Thought Leadership</span>
          </h2>
          <p className="section-description">
            Our collection of insightful blogs, articles and white papers are sure to help you gain valuable
            perspectives on industry trends, best practices, and innovative strategies that drive success in
            today's dynamic business landscape.
          </p>
        </div>

        <div className="insights-grid">
          {insightsPosts.map((post) => (
            <div key={post.id} className="insight-card" data-aos="fade-up">
              <div className="card-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="card-content">
                <span className="category">{post.category}</span>
                <h3>{post.title}</h3>
                <div className="author-info">
                  <span>{post.author}</span>
                  {post.company && <span> | {post.company}</span>}
                  {post.date && <span> | {post.date}</span>}
                </div>
                <Link to={post.link} className="learn-more">
                  Learn more
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection; 