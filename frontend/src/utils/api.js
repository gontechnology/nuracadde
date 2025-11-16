import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Properties
export const getProperties = async (activeOnly = false) => {
  const response = await axios.get(`${API}/properties?active_only=${activeOnly}`);
  return response.data;
};

export const getProperty = async (id) => {
  const response = await axios.get(`${API}/properties/${id}`);
  return response.data;
};

export const createProperty = async (data) => {
  const response = await axios.post(`${API}/properties`, data, {
    headers: getAuthHeaders()
  });
  return response.data;
};

export const updateProperty = async (id, data) => {
  const response = await axios.put(`${API}/properties/${id}`, data, {
    headers: getAuthHeaders()
  });
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await axios.delete(`${API}/properties/${id}`, {
    headers: getAuthHeaders()
  });
  return response.data;
};

// Contact Messages
export const getContactMessages = async (unreadOnly = false) => {
  const response = await axios.get(`${API}/contact?unread_only=${unreadOnly}`, {
    headers: getAuthHeaders()
  });
  return response.data;
};

export const createContactMessage = async (data) => {
  const response = await axios.post(`${API}/contact`, data);
  return response.data;
};

export const markMessageRead = async (id) => {
  const response = await axios.put(`${API}/contact/${id}/read`, {}, {
    headers: getAuthHeaders()
  });
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await axios.delete(`${API}/contact/${id}`, {
    headers: getAuthHeaders()
  });
  return response.data;
};

// Testimonials
export const getTestimonials = async (approvedOnly = true) => {
  const response = await axios.get(`${API}/testimonials?approved_only=${approvedOnly}`, {
    headers: getAuthHeaders()
  });
  return response.data;
};

export const approveTestimonial = async (id) => {
  const response = await axios.put(`${API}/testimonials/${id}/approve`, {}, {
    headers: getAuthHeaders()
  });
  return response.data;
};

export const deleteTestimonial = async (id) => {
  const response = await axios.delete(`${API}/testimonials/${id}`, {
    headers: getAuthHeaders()
  });
  return response.data;
};

// Image Upload
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(`${API}/upload`, formData, {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Dashboard Stats
export const getDashboardStats = async () => {
  const response = await axios.get(`${API}/dashboard/stats`, {
    headers: getAuthHeaders()
  });
  return response.data;
};