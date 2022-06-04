import api from "../index";

const answer = {
  getAll: async (config) => api.get("answers", config),
  get: async (id, config) => api.get(`answers/${id}`, config),
  create: async (data) => api.post(`/answers`, data),
  update: async (id, data) => api.patch(`answers/${id}`, data),
  del: async (id) => api.delete(`answers/${id}`),
};
export default answer;
