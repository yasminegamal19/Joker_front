import axios from "axios";
import { UNAUTHORIZED_EVENT, clearToken, getToken } from "./auth";

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
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && getToken()) {
      clearToken();
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }
    return Promise.reject(error);
  },
);

export default apiClient;
