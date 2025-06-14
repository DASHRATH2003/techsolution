import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { companyAPI } from '../services/api';
import TestimonialsSection from '../components/TestimonialsSection';
import ServiceCard from '../components/ServiceCard';
import WorkflowSection from '../components/WorkflowSection';
import InsightsSection from '../components/InsightsSection';
import AboutSection from '../components/AboutSection';
import './Home.css';

const servicesList = [
  {
    id: 1,
    title: "Web Development",
    icon: "🌐",
    description: "Modern, responsive websites and web applications built with cutting-edge technologies.",
    features: ["Custom Development", "Responsive Design", "Performance Optimization"],
    technologies: ["React", "Node.js", "Next.js"],
    bgColor: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    link: "/services/web-development"
  },
  {
    id: 2,
    title: "Mobile App Development",
    icon: "📱",
    description: "Native and cross-platform mobile applications for iOS and Android platforms.",
    features: ["Native Apps", "Cross-Platform", "App Store Support"],
    technologies: ["React Native", "Flutter", "Swift"],
    bgColor: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)",
    link: "/services/mobile-development"
  },
  {
    id: 3,
    title: "UI/UX Design",
    icon: "🎨",
    description: "Beautiful and intuitive user interfaces with focus on user experience and accessibility.",
    features: ["User Research", "Wireframing", "Prototyping"],
    technologies: ["Figma", "Adobe XD", "Sketch"],
    bgColor: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
    link: "/services/ui-ux-design"
  },
  {
    id: 4,
    title: "Digital Marketing",
    icon: "📈",
    description: "Comprehensive digital marketing solutions to grow your online presence.",
    features: ["SEO", "Social Media", "Content Strategy"],
    technologies: ["Google Analytics", "SEMrush", "HubSpot"],
    bgColor: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    link: "/services/digital-marketing"
  },
  {
    id: 5,
    title: "Cloud Solutions",
    icon: "☁️",
    description: "Scalable cloud infrastructure and deployment solutions for your applications.",
    features: ["Cloud Migration", "DevOps", "Monitoring"],
    technologies: ["AWS", "Azure", "Docker"],
    bgColor: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    link: "/services/cloud-solutions"
  },
  {
    id: 6,
    title: "E-commerce Solutions",
    icon: "🛍️",
    description: "Full-featured online stores with secure payment processing and inventory management.",
    features: ["Payment Gateway", "Inventory", "Analytics"],
    technologies: ["Shopify", "WooCommerce", "Stripe"],
    bgColor: "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)",
    link: "/services/ecommerce"
  }
];

const Home = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    fetchHomeData();
    setupIntersectionObserver();
    setupMouseTracking();

    // Setup scroll progress
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const setupIntersectionObserver = () => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );
  };

  const setupMouseTracking = () => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      
      setMousePosition({ x, y });

      // Parallax effect for hero elements
      if (heroRef.current) {
        const elements = heroRef.current.querySelectorAll('.parallax');
        elements.forEach((el) => {
          const speed = el.dataset.speed || 1;
          const xOffset = x * 50 * speed;
          const yOffset = y * 50 * speed;
          el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  };

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const companyResponse = await companyAPI.getCompanyInfo();
      setCompanyInfo(companyResponse.data);
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-animation">
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
        </div>
        <p>Loading amazing content...</p>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero" ref={heroRef} data-section="hero">
        <div className="hero-background">
          <div 
            className="hero-gradient parallax" 
            data-speed="0.5"
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
            }}
          />
        </div>

        <div className="container">
          <div className="hero-content">
            <h1 className="animate-title">
              Welcome to <span className="highlight">Codetech</span>
              {(companyInfo?.tagline || 'Building the Future').split('').map((char, i) => (
                <span 
                  key={i} 
                  className="char"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {char}
                </span>
              ))}
            </h1>
            <p className="hero-subtitle parallax" data-speed="0.8">
              {companyInfo?.description || 'Innovative solutions for modern challenges'}
            </p>
            <div className="hero-cta parallax" data-speed="1.2">
              <Link to="/services" className="btn btn-primary btn-glow">
                Explore Our Services
                <span className="btn-particles">
                  {[...Array(6)].map((_, i) => (
                    <span key={i} className="particle-dot" />
                  ))}
                </span>
              </Link>
            </div>
          </div>

          <div className="hero-visual parallax" data-speed="1.5">
            <div className="floating-cards">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="tech-card"
                  style={{
                    transform: `rotate(${i * 15}deg) translate(${mousePosition.x * (i + 1) * 10}px, ${mousePosition.y * (i + 1) * 10}px)`
                  }}
                >
                  <div className="card-glow" />
                  <div className="card-content">
                    <div className="tech-icon">{['🚀', '💡', '⚡'][i]}</div>
                    <div className="tech-text">
                      {['Innovation', 'Creativity', 'Speed'][i]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrows">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <section className="services-section" data-section="services">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="section-description">
              We offer a comprehensive suite of digital solutions to help your business thrive in the modern world.
            </p>
          </div>

          <div className="services-grid">
            {servicesList.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                mousePosition={mousePosition}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <WorkflowSection />

      {/* Insights Section */}
      <InsightsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="cta-section" data-section="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="animate-in">Ready to Transform Your Business?</h2>
            <p className="animate-in">Let's create something amazing together</p>
            <Link to="/contact" className="btn btn-primary btn-large animate-in">
              Get Started
              <span className="btn-effect"></span>
            </Link>
          </div>
          <div className="cta-shapes">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="floating-shape"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  transform: `translate(${mousePosition.x * (i + 1) * 2}px, ${mousePosition.y * (i + 1) * 2}px)`
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
