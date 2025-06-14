import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initiatePayment } from '../services/payment';
import urbiniyaImage from '../assets/urbiniya.png';
import './Services.css';

const ProjectCard = ({ project, onPurchase }) => (
  <div className="project-card">
    <div className="project-image">
      <img 
        src={project.image} 
        alt={project.title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/500x300?text=Project+Image';
        }}
      />
    </div>
    <div className="project-content">
      <div className="project-header">
        <h3>{project.title}</h3>
        <div className="project-category">
          {project.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </div>
      </div>

      <p className="project-description">{project.shortDescription}</p>

      <div className="project-features">
        {project.features.map((feature, index) => (
          <span key={index} className="feature-tag">{feature}</span>
        ))}
      </div>

      <div className="project-tech">
        <strong>Technologies:</strong>
        <div className="tech-tags">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>

      <div className="project-delivery">
        <span>⏱️ {project.deliveryTime}</span>
      </div>

      <div className="project-footer">
        <div className="project-pricing">
          <span className="original-price">₹{project.originalPrice}</span>
          <span className="current-price">₹{project.price}</span>
          <span className="discount">
            {Math.round(((project.originalPrice - project.price) / project.originalPrice) * 100)}% OFF
          </span>
        </div>

        <div className="project-actions">
          <Link 
            to={`/services/project/${project.id}`}
            className="btn btn-outline"
          >
            View Details
          </Link>
          <button 
            onClick={() => onPurchase(project)}
            className="btn btn-primary"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Force a re-render of images when category changes
    const images = document.querySelectorAll('.project-image img');
    images.forEach(img => {
      const currentSrc = img.src;
      img.src = '';
      img.src = currentSrc;
    });
  }, [selectedCategory]);

  const projects = [
    {
      id: 1,
      title: "Urbaniya Portfolio",
      description: "Modern real estate platform with property listings, virtual tours, and agent management",
      shortDescription: "Premium real estate platform with modern design",
      category: "web-development",
      price:1,
      originalPrice: 6999,
      features: ["Property Listings", "Virtual Tours", "Agent Portal"],
      technologies: ["React", "Node.js", "MongoDB"],
      deliveryTime: "20-25 days",
      image: urbiniyaImage
    },
    {
      id: 2,
      title: "Restaurant Management System",
      description: "Complete restaurant management with POS, inventory, staff management, and customer ordering",
      shortDescription: "Comprehensive restaurant management solution",
      category: "web-development",
      price: 1000,
      originalPrice: 4499,
      features: ["POS System", "Table Management", "Online Ordering"],
      technologies: ["React", "Express", "PostgreSQL"],
      deliveryTime: "12-18 days",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Mobile Fitness App",
      description: "Comprehensive fitness tracking app with workout plans and progress monitoring",
      shortDescription: "Complete mobile fitness and health tracking app",
      category: "mobile-development",
      price: 3299,
      originalPrice: 4199,
      features: ["Workout Plans", "Nutrition Tracking", "Progress Monitoring"],
      technologies: ["React Native", "Node.js", "MongoDB"],
      deliveryTime: "20-25 days",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Digital Marketing Suite",
      description: "Complete digital marketing platform with analytics and automation",
      shortDescription: "All-in-one digital marketing solution",
      category: "marketing",
      price: 2999,
      originalPrice: 3999,
      features: ["SEO Tools", "Social Media Management", "Email Marketing"],
      technologies: ["React", "Python", "PostgreSQL"],
      deliveryTime: "15-20 days",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'design', label: 'Design' },
    { value: 'consulting', label: 'Consulting' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleCategoryChange = (categoryValue) => {
    setSelectedCategory(categoryValue);
  };

  const handlePurchase = async (project) => {
    try {
      setLoading(true);
      const paymentData = {
        amount: project.price,
        currency: 'INR',
        description: `Purchase of ${project.title}`,
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#667eea'
        }
      };
      await initiatePayment(paymentData);
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="services">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Processing payment...</p>
        </div>
      )}

      <section className="services-hero">
        <div className="container">
          <h1>Our Premium Projects</h1>
          <p>Ready-to-deploy solutions for your business needs</p>
        </div>
      </section>

      <div className="container">
        <div className="services-filters">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onPurchase={handlePurchase}
              />
            ))
          ) : (
            <div className="no-projects">
              <h3>No projects found in this category</h3>
              <p>Please try selecting a different category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
