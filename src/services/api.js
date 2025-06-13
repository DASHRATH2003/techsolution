import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Company API
export const companyAPI = {
  getCompanyInfo: () => api.get('/company'),
  updateCompanyInfo: (data) => api.post('/company', data),
  getContactInfo: () => api.get('/company/contact'),
};

// Services API
export const servicesAPI = {
  getAllServices: (params = {}) => api.get('/services', { params }),
  getService: (id) => api.get(`/services/${id}`),
  createService: (data) => api.post('/services', data),
  updateService: (id, data) => api.put(`/services/${id}`, data),
  deleteService: (id) => api.delete(`/services/${id}`),
  getServicesByCategory: (category) => api.get(`/services/category/${category}`),
};

// Team API
export const teamAPI = {
  getAllTeamMembers: (params = {}) => api.get('/team', { params }),
  getTeamMember: (id) => api.get(`/team/${id}`),
  createTeamMember: (data) => api.post('/team', data),
  updateTeamMember: (id, data) => api.put(`/team/${id}`, data),
  deleteTeamMember: (id) => api.delete(`/team/${id}`),
  getLeadership: () => api.get('/team', { params: { isLeadership: true, isActive: true } }),
};

// Blog API
export const blogAPI = {
  getAllPosts: (params = {}) => api.get('/blog', { params }),
  getPost: (slug) => api.get(`/blog/${slug}`),
  createPost: (data) => api.post('/blog', data),
  updatePost: (id, data) => api.put(`/blog/${id}`, data),
  deletePost: (id) => api.delete(`/blog/${id}`),
  getPostsByCategory: (category, params = {}) => api.get(`/blog/category/${category}`, { params }),
};

// Testimonials API
export const testimonialsAPI = {
  getAllTestimonials: (params = {}) => api.get('/testimonials', { params }),
  getTestimonial: (id) => api.get(`/testimonials/${id}`),
  createTestimonial: (data) => api.post('/testimonials', data),
  updateTestimonial: (id, data) => api.put(`/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/testimonials/${id}`),
  getFeaturedTestimonials: () => api.get('/testimonials', { params: { isFeatured: true, isActive: true } }),
};

// Contact API
export const contactAPI = {
  getAllContacts: (params = {}) => api.get('/contact', { params }),
  getContact: (id) => api.get(`/contact/${id}`),
  sendMessage: (data) => api.post('/contact', data),
  updateContact: (id, data) => api.put(`/contact/${id}`, data),
  deleteContact: (id) => api.delete(`/contact/${id}`),
  markAsRead: (id) => api.patch(`/contact/${id}/read`),
};

// Careers API
export const careersAPI = {
  getAllPositions: (params = {}) => api.get('/careers', { params }),
  getPosition: (id) => api.get(`/careers/${id}`),
  createPosition: (data) => api.post('/careers', data),
  updatePosition: (id, data) => api.put(`/careers/${id}`, data),
  deletePosition: (id) => api.delete(`/careers/${id}`),
  getPositionsByDepartment: (department) => api.get(`/careers/department/${department}`),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
