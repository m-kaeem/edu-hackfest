import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("hg_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Authentication
export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);

// Batches
export const createBatch = (data) => api.post("/batches", data);
export const getBatches = () => api.get("/batches");
export const getBatchDetail = (id) => api.get(`/batches/${id}`);

// Weather
export const fetchWeather = (district) =>
  api.get(`/weather?district=${district}`);

// Market
export const fetchMarket = (d, c) =>
  api.get(`/market/latest?district=${d}&commodity=${c}`);

export default api;
