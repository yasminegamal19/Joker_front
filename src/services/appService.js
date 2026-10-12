import apiClient from "../lib/apiClient";

export const getAppConfig = async (signal) => {
  const response = await apiClient.get("/app-config", { signal });
  return response.data;
};

// TODO: الـ endpoint ده افتراضي (GET /content/{key} رجّع 404 وقت التجربة).
// اسأل الباك اند عن المسار الصح وشكل الـ response.
export const getContent = async (key, signal) => {
  const response = await apiClient.get(`/content/${key}`, { signal });
  return response.data;
};
