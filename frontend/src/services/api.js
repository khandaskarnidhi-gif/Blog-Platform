import axios from "axios";

// Change this if your backend runs on another port
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach JWT token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;