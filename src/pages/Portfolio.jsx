import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css';
import urbiniyaImage from '../assets/urbiniya.png';
import Corbitimage from '../assets/Coribix.png'

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState({});
  const projects = [
    {
      id: 1,
      title: "Urbaniya Portfolio",
      category: "web",
      image: urbiniyaImage,
      description: "Modern portfolio website with smooth animations, responsive design, and professional UI/UX. Features include dynamic content loading, interactive components, and seamless navigation.",
      technologies: ["React", "CSS3", "Animation", "Responsive Design", "Vercel"],
      link: "https://urbaniyanew-u7iz.vercel.app"
    },
    {
      id: 2,
      title: "TechSolution Website",
      category: "web",
      image: Corbitimage,
      description: "Modern web application with payment integration",
      technologies: ["React", "Node.js", "MongoDB", "Razorpay"],
      link: "https://constructionproject.vercel.app"
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      category: "ecommerce",
      image: "/images/ecommerce.png",
      description: "Full-featured online shopping platform",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#"
    },
    {
      id: 4,
      title: "Mobile App UI",
      category: "mobile",
      image: "/images/mobile-app.png",
      description: "Modern mobile application interface",
      technologies: ["React Native", "Firebase"],
      link: "#"
    },
    {
      id: 5,
      title: "Dashboard Analytics",
      category: "web",
      image: "/images/dashboard.png",
      description: "Data visualization dashboard",
      technologies: ["React", "D3.js", "Material-UI"],
      link: "#"
    },
    {
      id: 6,
      title: "Social Media App",
      category: "mobile",
      image: "/images/social-app.png",
      description: "Social networking platform",
      technologies: ["React Native", "Node.js", "MongoDB"],
      link: "#"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.dataset.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-id]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ecommerce', label: 'E-Commerce' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="portfolio">
      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="container">
          <h1 className="animate-fade-up">Our Portfolio</h1>
          <p className="animate-fade-up delay-1">Showcasing our best work and innovative solutions</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="portfolio-filter">
        <div className="container">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="portfolio-grid">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card ${isVisible[project.id] ? 'visible' : ''}`}
                data-id={project.id}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project">
                      View Project
                    </a>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="portfolio-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Have a project in mind?</h2>
            <p>Let's work together to bring your ideas to life</p>
            <Link to="/contact" className="cta-button">Start a Project</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
