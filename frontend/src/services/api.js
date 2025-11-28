import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const batches = {
  create: (data) => api.post('/batches', data),
  getAll: () => api.get('/batches'),
  getById: (id) => api.get(`/batches/${id}`),
};

export const weather = {
  get: (district) => api.get(`/weather?district=${district}`),
};

export const market = {
  getLatest: (district, commodity) => 
    api.get(`/market/latest?district=${district}&commodity=${commodity}`),
};

export default api;