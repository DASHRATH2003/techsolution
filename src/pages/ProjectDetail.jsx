import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { initiatePayment, demoPayment, formatCurrency } from '../services/payment';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Static project data (same as in Services.jsx)
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Complete online store with payment gateway, inventory management, and admin dashboard. This comprehensive e-commerce solution includes everything you need to start selling online immediately. Features include product catalog management, shopping cart functionality, secure payment processing, order management, customer accounts, and a powerful admin dashboard for managing your entire store.",
      shortDescription: "Full-featured e-commerce solution with modern design",
      category: "web-development",
      price: 2999,
      originalPrice: 3999,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["Responsive Design", "Payment Gateway", "Admin Panel", "Inventory Management", "SEO Optimized", "Customer Reviews", "Wishlist", "Multi-language Support"],
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      deliveryTime: "15-20 days",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 2,
      title: "Restaurant Management System",
      description: "Complete restaurant management with POS, inventory, staff management, and customer ordering. This system streamlines all restaurant operations from order taking to kitchen management, inventory tracking, and customer service. Perfect for restaurants, cafes, and food service businesses.",
      shortDescription: "Comprehensive restaurant management solution",
      category: "web-development",
      price: 2499,
      originalPrice: 3299,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["POS System", "Table Management", "Online Ordering", "Staff Management", "Analytics", "Kitchen Display", "Customer Management", "Reporting"],
      technologies: ["React", "Express", "PostgreSQL", "Socket.io"],
      deliveryTime: "12-18 days",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 3,
      title: "Learning Management System",
      description: "Educational platform with course management, video streaming, assignments, and progress tracking. This comprehensive LMS includes everything educational institutions need to deliver online courses effectively. Features include course creation tools, student management, progress tracking, assignments, quizzes, certificates, and detailed analytics.",
      shortDescription: "Complete LMS for educational institutions",
      category: "web-development",
      price: 3499,
      originalPrice: 4499,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["Course Management", "Video Streaming", "Assignments", "Progress Tracking", "Certificates", "Student Portal", "Instructor Dashboard", "Analytics"],
      technologies: ["React", "Node.js", "MongoDB", "AWS S3"],
      deliveryTime: "20-25 days",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 4,
      title: "Real Estate Platform",
      description: "Property listing platform with advanced search, virtual tours, and agent management. This modern real estate platform connects buyers, sellers, and agents with powerful search capabilities, detailed property listings, virtual tours, and comprehensive agent profiles.",
      shortDescription: "Modern real estate listing and management platform",
      category: "web-development",
      price: 2799,
      originalPrice: 3599,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["Property Listings", "Advanced Search", "Virtual Tours", "Agent Profiles", "Mortgage Calculator", "Favorites", "Contact Forms", "Map Integration"],
      technologies: ["React", "Node.js", "MongoDB", "Google Maps API"],
      deliveryTime: "18-22 days",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1448630360428-65456885c650?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 5,
      title: "Healthcare Management System",
      description: "Hospital management system with patient records, appointment scheduling, and billing. This comprehensive healthcare solution streamlines hospital operations with patient management, appointment scheduling, billing, doctor portals, and detailed reporting capabilities.",
      shortDescription: "Comprehensive healthcare management solution",
      category: "web-development",
      price: 3999,
      originalPrice: 5199,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      features: ["Patient Records", "Appointment Scheduling", "Billing System", "Doctor Portal", "Reports", "Prescription Management", "Insurance Claims", "Lab Results"],
      technologies: ["React", "Node.js", "PostgreSQL", "Socket.io"],
      deliveryTime: "25-30 days",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop"
      ]
    }
  ];

  useEffect(() => {
    const foundProject = projects.find(p => p.id === parseInt(id));
    setProject(foundProject);
    setLoading(false);
  }, [id]);

  const handlePurchase = async () => {
    if (!project || paymentLoading) return;

    setPaymentLoading(true);

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
        setPaymentLoading(false);

        // Show detailed success message
        const successMessage = `
🎉 Payment Successful!

Project: ${project.title}
Amount Paid: ₹${project.price.toLocaleString('en-IN')}
Payment ID: ${response.razorpay_payment_id}
Order ID: ${response.razorpay_order_id}

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
        setPaymentLoading(false);
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
        await initiatePayment(paymentData);
      } catch (backendError) {
        console.log('Backend not available, using demo payment:', backendError);
        await demoPayment(paymentData);
      }
    } catch (error) {
      setPaymentLoading(false);
      console.error('Error initiating payment:', error);
      alert('Payment gateway is currently unavailable. Please try again later.');
    }
  };

  if (loading) {
    return <div className="loading">Loading project details...</div>;
  }

  if (!project) {
    return (
      <div className="project-not-found">
        <div className="container">
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/services" className="btn btn-primary">Back to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail">
      {/* Hero Section */}
      <section className="project-hero">
        <div className="container">
          <div className="project-hero-content">
            <div className="project-info">
              <div className="breadcrumb">
                <Link to="/services">Projects</Link> / {project.title}
              </div>
              <h1>{project.title}</h1>
              <p className="project-subtitle">{project.shortDescription}</p>

              <div className="project-meta">
                <div className="meta-item">
                  <span className="meta-label">Category:</span>
                  <span className="meta-value">
                    {project.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Delivery:</span>
                  <span className="meta-value">{project.deliveryTime}</span>
                </div>
              </div>

              <div className="project-pricing-hero">
                <span className="original-price">₹{project.originalPrice}</span>
                <span className="current-price">₹{project.price}</span>
                <span className="discount">
                  {Math.round(((project.originalPrice - project.price) / project.originalPrice) * 100)}% OFF
                </span>
              </div>

              <div className="hero-actions">
                <button
                  className="btn btn-primary btn-large"
                  onClick={handlePurchase}
                  disabled={paymentLoading}
                >
                  {paymentLoading ? 'Processing...' : `Buy Now - ₹${project.price}`}
                </button>
                <button
                  className="btn btn-outline btn-large"
                  onClick={() => setShowVideo(true)}
                >
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="project-image-hero">
              <img src={project.image} alt={project.title} />
              <div className="play-overlay" onClick={() => setShowVideo(true)}>
                <div className="play-button-large">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="40" fill="rgba(255,255,255,0.9)"/>
                    <path d="M32 25L55 40L32 55V25Z" fill="#333"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="video-modal" onClick={() => setShowVideo(false)}>
          <div className="video-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-video" onClick={() => setShowVideo(false)}>×</button>
            <iframe
              src={project.videoUrl}
              title={project.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Project Details */}
      <section className="project-details">
        <div className="container">
          <div className="details-grid">
            <div className="details-main">
              <h2>Project Description</h2>
              <p>{project.description}</p>

              <h3>Key Features</h3>
              <div className="features-list">
                {project.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <h3>Technologies Used</h3>
              <div className="tech-stack">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">{tech}</span>
                ))}
              </div>

              {project.gallery && (
                <>
                  <h3>Project Gallery</h3>
                  <div className="project-gallery">
                    {project.gallery.map((image, index) => (
                      <img key={index} src={image} alt={`${project.title} ${index + 1}`} />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="details-sidebar">
              <div className="purchase-card">
                <h3>Purchase This Project</h3>
                <div className="price-display">
                  <span className="original-price">{formatCurrency(project.originalPrice)}</span>
                  <span className="current-price">{formatCurrency(project.price)}</span>
                </div>
                <div className="savings">
                  You save {formatCurrency(project.originalPrice - project.price)}!
                </div>

                <button
                  className="btn btn-primary btn-full"
                  onClick={handlePurchase}
                  disabled={paymentLoading}
                >
                  {paymentLoading ? 'Processing...' : 'Buy Now'}
                </button>

                <div className="purchase-includes">
                  <h4>What's Included:</h4>
                  <ul>
                    <li>Complete source code</li>
                    <li>Database schema</li>
                    <li>Installation guide</li>
                    <li>30 days support</li>
                    <li>Free updates for 6 months</li>
                  </ul>
                </div>
              </div>

              <div className="contact-card">
                <h3>Need Customization?</h3>
                <p>We can customize this project according to your specific requirements.</p>
                <Link to="/contact" className="btn btn-outline btn-full">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
