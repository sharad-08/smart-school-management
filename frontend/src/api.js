import axios from "axios";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, ""),
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.url.endsWith("/login")) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(undefined, (error) => {
  if (error.response?.data?.code === "TEACHER_READ_ONLY") {
    window.dispatchEvent(new Event("teacher-read-only"));
  }
  if (error.response?.status === 401 && !error.config?.url?.endsWith("/login")) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.replace("/login");
  }
  return Promise.reject(error);
});

export const errorMessage = (error) => {
  if (error.response?.status === 503) return "The school database is temporarily unavailable. Please try again.";
  return error.response?.data?.message || error.response?.data?.error || "Could not complete the request. Please try again.";
};

export default api;
