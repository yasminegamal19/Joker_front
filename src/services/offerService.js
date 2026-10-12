import apiClient from "../lib/apiClient";

export const getOffers = async (signal) => {
  const response = await apiClient.get("/offers", { signal });
  return response.data;
};
