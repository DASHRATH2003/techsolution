import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesAPI } from '../services/api';
import { initiatePayment, demoPayment } from '../services/payment';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Static project data with videos and pricing
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Complete online store with payment gateway, inventory management, and admin dashboard",
      shortDescription: "Full-featured e-commerce solution with modern design",
      category: "web-development",
      price: 1,
      originalPrice: 150,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["Responsive Design", "Payment Gateway", "Admin Panel", "Inventory Management", "SEO Optimized"],
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      deliveryTime: "15-20 days",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Restaurant Management System",
      description: "Complete restaurant management with POS, inventory, staff management, and customer ordering",
      shortDescription: "Comprehensive restaurant management solution",
      category: "web-development",
      price: 100,
      originalPrice: 150,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["POS System", "Table Management", "Online Ordering", "Staff Management", "Analytics"],
      technologies: ["React", "Express", "PostgreSQL", "Socket.io"],
      deliveryTime: "12-18 days",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Learning Management System",
      description: "Educational platform with course management, video streaming, assignments, and progress tracking",
      shortDescription: "Complete LMS for educational institutions",
      category: "web-development",
      price: 100,
      originalPrice: 150,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["Course Management", "Video Streaming", "Assignments", "Progress Tracking", "Analytics"],
      technologies: ["React", "Node.js", "MongoDB", "AWS S3"],
      deliveryTime: "20-25 days",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Real Estate Platform",
      description: "Property listing platform with advanced search, virtual tours, and agent management",
      shortDescription: "Modern real estate listing and management platform",
      category: "web-development",
      price: 2799,
      originalPrice: 3599,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["Property Listings", "Advanced Search", "Virtual Tours", "Agent Profiles", "Mortgage Calculator"],
      technologies: ["React", "Node.js", "MongoDB", "Google Maps API"],
      deliveryTime: "18-22 days",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Healthcare Management System",
      description: "Hospital management system with patient records, appointment scheduling, and billing",
      shortDescription: "Comprehensive healthcare management solution",
      category: "web-development",
      price: 3999,
      originalPrice: 5199,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["Patient Records", "Appointment Scheduling", "Billing System", "Doctor Portal", "Reports"],
      technologies: ["React", "Node.js", "PostgreSQL", "Socket.io"],
      deliveryTime: "25-30 days",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Social Media Management Tool",
      description: "Complete social media management platform with scheduling, analytics, and team collaboration",
      shortDescription: "All-in-one social media management solution",
      category: "marketing",
      price: 1999,
      originalPrice: 2699,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["Post Scheduling", "Analytics Dashboard", "Team Collaboration", "Content Calendar", "Multi-Platform"],
      technologies: ["React", "Node.js", "MongoDB", "Social APIs"],
      deliveryTime: "10-15 days",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop"
    },
    {
      id: 7,
      title: "Mobile Fitness App",
      description: "Comprehensive fitness tracking app with workout plans, nutrition tracking, and progress monitoring",
      shortDescription: "Complete mobile fitness and health tracking app",
      category: "mobile-development",
      price: 3299,
      originalPrice: 4199,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["Workout Plans", "Nutrition Tracking", "Progress Monitoring", "Social Features", "Wearable Integration"],
      technologies: ["React Native", "Node.js", "MongoDB", "HealthKit"],
      deliveryTime: "20-25 days",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop"
    },
    {
      id: 8,
      title: "Project Management Dashboard",
      description: "Advanced project management tool with task tracking, team collaboration, and reporting",
      shortDescription: "Professional project management and collaboration platform",
      category: "web-development",
      price: 2299,
      originalPrice: 2999,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["Task Management", "Team Collaboration", "Time Tracking", "Reporting", "File Sharing"],
      technologies: ["React", "Node.js", "PostgreSQL", "Socket.io"],
      deliveryTime: "15-18 days",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop"
    },
    {
      id: 9,
      title: "Inventory Management System",
      description: "Complete inventory management with barcode scanning, stock alerts, and supplier management",
      shortDescription: "Advanced inventory and warehouse management solution",
      category: "web-development",
      price: 2699,
      originalPrice: 3499,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["Barcode Scanning", "Stock Alerts", "Supplier Management", "Reports", "Multi-Location"],
      technologies: ["React", "Node.js", "MongoDB", "Barcode APIs"],
      deliveryTime: "12-16 days",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&h=300&fit=crop"
    },
    {
      id: 10,
      title: "Custom CRM Solution",
      description: "Customer relationship management system with lead tracking, sales pipeline, and automation",
      shortDescription: "Comprehensive CRM with sales automation and analytics",
      category: "web-development",
      price: 3799,
      originalPrice: 4899,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["Lead Management", "Sales Pipeline", "Email Automation", "Analytics", "Integration APIs"],
      technologies: ["React", "Node.js", "PostgreSQL", "Email APIs"],
      deliveryTime: "22-28 days",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop"
    }
  ];

  useEffect(() => {
    // Filter projects based on selected category
    if (selectedCategory === 'all') {
      setServices(projects);
    } else {
      setServices(projects.filter(project => project.category === selectedCategory));
    }
    setLoading(false);
  }, [selectedCategory]);

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'design', label: 'Design' },
    { value: 'consulting', label: 'Consulting' }
  ];

  const handlePurchase = async (project) => {
    console.log('Starting purchase for project:', project.title, 'Amount:', project.price);

    // First, test backend connectivity
    try {
      console.log('Testing backend connectivity...');
      const testResponse = await fetch('http://localhost:5000/api/payment/test');
      console.log('Backend test response status:', testResponse.status);

      if (testResponse.ok) {
        const testData = await testResponse.json();
        console.log('Backend is accessible:', testData);
      } else {
        console.warn('Backend test failed with status:', testResponse.status);
      }
    } catch (connectError) {
      console.warn('Backend connectivity test failed:', connectError);
    }

    const paymentData = {
      amount: project.price,
      currency: 'INR',
      name: 'TechSolution - Premium Projects',
      description: `${project.title} - Complete Source Code & Documentation`,
      image: 'https://techsolution-gamma.vercel.app/logo.png',
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#667eea'
      },
      onSuccess: (response) => {
        const successMessage = `
🎉 Payment Successful!

Project: ${project.title}
Amount Paid: ₹${project.price.toLocaleString('en-IN')}
Payment ID: ${response.razorpay_payment_id}

✅ What happens next:
• You'll receive project files via email within 24 hours
• Complete source code with documentation
• 30 days of free support included
• Installation guide and setup instructions

Thank you for choosing TechSolution!
        `;

        alert(successMessage);
        console.log('Payment successful:', response);
      },
      onError: (error) => {
        console.error('Payment error:', error);

        if (error.message.includes('cancelled')) {
          alert('Payment was cancelled. You can try again anytime.');
        } else {
          alert('Payment failed. Please try again or contact support if the issue persists.');
        }
      }
    };

    try {
      // Try real payment first, fallback to demo if backend is not available
      try {
        console.log('Attempting real payment with backend...');
        await initiatePayment(paymentData);
      } catch (backendError) {
        console.log('Backend payment failed, using demo payment:', backendError);
        alert('Backend is not available. Using demo payment mode.');
        await demoPayment(paymentData);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Payment gateway is currently unavailable. Please try again later.');
    }
  };

  if (loading) {
    return <div className="loading">Loading services...</div>;
  }

  return (
    <div className="services">
      <section className="services-hero">
        <div className="container">
          <h1>Our Premium Projects</h1>
          <p>Ready-to-deploy solutions for your business needs</p>
        </div>
      </section>

      <section className="services-content">
        <div className="container">
          <div className="services-filters">
            {categories.map(category => (
              <button
                key={category.value}
                className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {services.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="play-button">
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="30" fill="rgba(255,255,255,0.9)"/>
                        <path d="M25 20L40 30L25 40V20Z" fill="#333"/>
                      </svg>
                    </div>
                  </div>
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
                    {project.features.slice(0, 3).map((feature, index) => (
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
                    <span className="delivery-time">⏱️ {project.deliveryTime}</span>
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
                      <Link to={`/services/project/${project.id}`} className="btn btn-outline">
                        View Details
                      </Link>
                      <button
                        className="btn btn-primary"
                        onClick={() => handlePurchase(project)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {services.length === 0 && (
            <div className="no-projects">
              <p>No projects found for the selected category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="why-choose-us">
        <div className="container">
          <h2>Why Choose Our Projects?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🚀</div>
              <h3>Ready to Deploy</h3>
              <p>All projects are fully developed and tested, ready for immediate deployment</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🔧</div>
              <h3>Customizable</h3>
              <p>Easy to customize and modify according to your specific business needs</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">💰</div>
              <h3>Cost Effective</h3>
              <p>Save thousands of dollars and months of development time</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🛠️</div>
              <h3>Full Support</h3>
              <p>Complete documentation and 30 days of free support included</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
