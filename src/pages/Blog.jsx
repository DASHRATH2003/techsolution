import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const observerRef = useRef(null);

  // Mock blog posts data for demonstration
  const mockPosts = [
    {
      _id: '1',
      title: 'The Future of Web Development: Trends to Watch in 2024',
      excerpt: 'Explore the cutting-edge technologies and methodologies that are shaping the future of web development.',
      content: 'Full article content here...',
      category: 'Technology',
      author: { name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
      publishDate: '2024-01-15',
      readTime: 8,
      featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
      tags: ['React', 'JavaScript', 'Web Development'],
      slug: 'future-of-web-development-2024'
    },
    {
      _id: '2',
      title: 'Building Scalable E-commerce Solutions with Modern Tech Stack',
      excerpt: 'Learn how to create robust e-commerce platforms that can handle millions of users and transactions.',
      content: 'Full article content here...',
      category: 'E-commerce',
      author: { name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
      publishDate: '2024-01-12',
      readTime: 12,
      featuredImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
      tags: ['E-commerce', 'Node.js', 'MongoDB'],
      slug: 'scalable-ecommerce-solutions'
    },
    {
      _id: '3',
      title: 'UI/UX Design Principles That Drive User Engagement',
      excerpt: 'Discover the key design principles that create intuitive and engaging user experiences.',
      content: 'Full article content here...',
      category: 'Design',
      author: { name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
      publishDate: '2024-01-10',
      readTime: 6,
      featuredImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
      tags: ['UI/UX', 'Design', 'User Experience'],
      slug: 'ui-ux-design-principles'
    },
    {
      _id: '4',
      title: 'Cloud Computing: Choosing the Right Platform for Your Business',
      excerpt: 'A comprehensive guide to selecting the perfect cloud platform for your specific business needs.',
      content: 'Full article content here...',
      category: 'Cloud',
      author: { name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
      publishDate: '2024-01-08',
      readTime: 10,
      featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      tags: ['Cloud', 'AWS', 'DevOps'],
      slug: 'cloud-computing-platform-guide'
    },
    {
      _id: '5',
      title: 'Mobile App Development: Native vs Cross-Platform',
      excerpt: 'Compare the pros and cons of native and cross-platform mobile app development approaches.',
      content: 'Full article content here...',
      category: 'Mobile',
      author: { name: 'David Brown', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
      publishDate: '2024-01-05',
      readTime: 9,
      featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
      tags: ['Mobile', 'React Native', 'Flutter'],
      slug: 'native-vs-cross-platform'
    },
    {
      _id: '6',
      title: 'Data Analytics: Turning Information into Business Intelligence',
      excerpt: 'Learn how to leverage data analytics to make informed business decisions and drive growth.',
      content: 'Full article content here...',
      category: 'Analytics',
      author: { name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face' },
      publishDate: '2024-01-03',
      readTime: 11,
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      tags: ['Analytics', 'Big Data', 'Business Intelligence'],
      slug: 'data-analytics-business-intelligence'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setPosts(mockPosts);
      setFilteredPosts(mockPosts);
      setLoading(false);
    }, 1000);

    // Setup intersection observer for animations
    setupIntersectionObserver();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Setup intersection observer for scroll animations
  const setupIntersectionObserver = () => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const postId = entry.target.dataset.postId;
            setVisiblePosts(prev => new Set([...prev, postId]));
          }
        });
      },
      { threshold: 0.1 }
    );
  };

  // Filter posts based on search and category
  useEffect(() => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post =>
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory]);

  // Observe posts when they mount
  useEffect(() => {
    const postElements = document.querySelectorAll('[data-post-id]');
    postElements.forEach(element => {
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    });
  }, [filteredPosts]);

  const categories = ['all', ...new Set(posts.map(post => post.category))];

  const getCategoryIcon = (category) => {
    const icons = {
      'Technology': '💻',
      'E-commerce': '🛒',
      'Design': '🎨',
      'Cloud': '☁️',
      'Mobile': '📱',
      'Analytics': '📊'
    };
    return icons[category] || '📝';
  };

  if (loading) {
    return (
      <div className="blog-loading">
        <div className="loading-animation">
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <p>Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog">
      {/* Animated Background */}
      <div className="blog-background">
        <div className="floating-elements">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="floating-element"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="blog-hero">
        <div className="hero-content">
          <div className="hero-text animate-fade-up">
            <div className="hero-badge">
              <span>📚 Knowledge Hub</span>
            </div>
            <h1 className="hero-title">
              <span className="title-word">Insights</span>
              <span className="title-word">That</span>
              <span className="title-word gradient-text">Inspire</span>
            </h1>
            <p className="hero-description">
              Discover the latest trends, tips, and insights from our team of experts.
              Stay ahead of the curve with our comprehensive guides and tutorials.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="blog-controls animate-slide-up">
            <div className="search-container">
              <div className="search-input-wrapper">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19S2 15.194 2 10.5 5.806 2 10.5 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="category-filters">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="category-icon">
                    {category === 'all' ? '🌟' : getCategoryIcon(category)}
                  </span>
                  <span className="category-text">
                    {category === 'all' ? 'All Posts' : category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-content">
        <div className="container">
          {filteredPosts.length > 0 ? (
            <div className="blog-grid">
              {filteredPosts.map((post, index) => (
                <article
                  key={post._id}
                  data-post-id={post._id}
                  className={`blog-card modern-blog-card ${visiblePosts.has(post._id) ? 'animate-in' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-glow-effect" />

                  <div className="blog-image-container">
                    <img src={post.featuredImage} alt={post.title} className="blog-image" />
                    <div className="image-overlay">
                      <div className="category-badge">
                        <span className="category-icon">{getCategoryIcon(post.category)}</span>
                        <span>{post.category}</span>
                      </div>
                      <div className="read-time-badge">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{post.readTime} min</span>
                      </div>
                    </div>
                  </div>

                  <div className="blog-content-area">
                    <div className="blog-meta">
                      <div className="author-info">
                        <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
                        <div className="author-details">
                          <span className="author-name">{post.author.name}</span>
                          <span className="publish-date">
                            {new Date(post.publishDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h2 className="blog-title">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="blog-excerpt">{post.excerpt}</p>

                    <div className="blog-tags">
                      {post.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Link to={`/blog/${post.slug}`} className="read-more-btn">
                      <span>Read Full Article</span>
                      <svg className="btn-arrow" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>

                  <div className="card-hover-glow" />
                </article>
              ))}
            </div>
          ) : (
            <div className="no-posts animate-fade-up">
              <div className="no-posts-icon">🔍</div>
              <h2>No Articles Found</h2>
              <p>
                {searchTerm || selectedCategory !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'We\'re working on creating amazing content for you. Check back soon!'
                }
              </p>
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content animate-fade-up">
            <div className="newsletter-icon">📧</div>
            <h2>Stay Updated</h2>
            <p>Get the latest articles and insights delivered straight to your inbox.</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button className="newsletter-btn">
                <span>Subscribe</span>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
