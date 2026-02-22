import axios from "axios";

const API =
  import.meta.env.VITE_API_BASE_URL ||
  "https://home-essentials-backend-szv8.onrender.com";

const api = axios.create({
  baseURL: API,
});

export default api;