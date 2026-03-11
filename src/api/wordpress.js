import api from "./axios";

// Get page by ID
export const getPageById = async () => {
  const response = await api.get(`/pages/14`);
  return response.data;
};

// Get media by ID
export const getMediaById = async (id) => {
  const response = await api.get(`/media/${id}`);
  return response.data;
};
