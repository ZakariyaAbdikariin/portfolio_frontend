// axios.ts
import axios from "axios";

// Dynamically set base URL depending on environment
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api" // Local backend during development
    : "https://sakariyeabdikariin.co.uk/api"; // Production backend

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // set true if backend uses cookies/auth
});

// Optional: intercept requests/responses for logging or error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
