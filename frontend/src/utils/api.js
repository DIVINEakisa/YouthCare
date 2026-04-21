import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "https://youthcare.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

export const chatAPI = {
  sendMessage: (message) => api.post("/chat/send", { message }),
  getChatHistory: () => api.get("/chat/history"),
};

export const cycleTrackerAPI = {
  updateCycleTracker: (data) => api.post("/cycle-tracker/update", data),
  getCycleTracker: () => api.get("/cycle-tracker/get"),
};

export default api;
