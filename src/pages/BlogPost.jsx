import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI } from '../services/api';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getPost(slug);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading blog post...</div>;
  }

  if (!post) {
    return (
      <div className="post-not-found">
        <div className="container">
          <h1>Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <article className="post-content">
        <div className="container">
          <header className="post-header">
            <div className="post-meta">
              <span className="category">{post.category}</span>
              <span className="date">
                {new Date(post.publishDate).toLocaleDateString()}
              </span>
              <span className="read-time">{post.readTime} min read</span>
            </div>
            <h1>{post.title}</h1>
            <div className="author-info">
              {post.author?.image && (
                <img src={post.author.image} alt={post.author.name} className="author-avatar" />
              )}
              <div>
                <div className="author-name">By {post.author?.name || 'Anonymous'}</div>
                <div className="author-position">{post.author?.position}</div>
              </div>
            </div>
          </header>

          {post.featuredImage && (
            <div className="post-image">
              <img src={post.featuredImage} alt={post.title} />
            </div>
          )}

          <div className="post-body">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              <h3>Tags:</h3>
              <div className="tags-list">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}

          <div className="post-footer">
            <Link to="/blog" className="btn btn-outline">← Back to Blog</Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
