import axios from "axios";

// dev: VITE_API_URL=/api/customer (يعدي على proxy بتاع Vite)
// production: لو مفيش .env بيستخدم الرابط الكامل
export const BASE_URL = (
  import.meta.env.VITE_API_URL || "https://api.elgokar.com/api/customer"
).replace(/\/+$/, "");

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {
    /* localStorage مش متاح */
  }
  return config;
});

export default apiClient;
