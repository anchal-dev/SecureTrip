// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me')
};

// Alert APIs
export const alertAPI = {
  createSOS: (alertData) => api.post('/alerts/sos', alertData),
  getActiveAlerts: () => api.get('/alerts/active'),
  getTouristAlerts: (touristId) => api.get(`/alerts/tourist/${touristId}`),
  updateAlert: (alertId, updateData) => api.patch(`/alerts/${alertId}`, updateData),
  getStats: () => api.get('/alerts/stats')
};

// Tourist APIs
export const touristAPI = {
  updateLocation: (locationData) => api.post('/tourists/location', locationData),
  getAllTourists: () => api.get('/tourists'),
  getTouristById: (id) => api.get(`/tourists/${id}`),
  updateProfile: (id, profileData) => api.put(`/tourists/${id}`, profileData)
};

export default api;