import apiClient from "../lib/apiClient";

export const getAppConfig = async (signal) => {
  const response = await apiClient.get("/app-config", { signal });
  return response.data;
};

export const getContent = async (key, signal) => {
  const response = await apiClient.get(`/content/${key}`, { signal });
  return response.data;
};
