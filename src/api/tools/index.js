import api from "../index";

const tools = {
  upload: async (data) => api.post(`/upload`, data),
  get: async (file) => api.get(`/files/${file}`),
};
export default tools;
