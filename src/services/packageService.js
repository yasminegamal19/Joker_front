import apiClient from "../lib/apiClient";

export const getPackages = async (signal) => {
  const response = await apiClient.get("/packages", { signal });
  return response.data;
};

export const getAdditionalPackages = async (signal) => {
  const response = await apiClient.get("/packages/additional", { signal });
  return response.data;
};
