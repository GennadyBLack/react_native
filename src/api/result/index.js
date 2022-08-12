import api from "../index";

const result = {
  getAll: async (config) => api.get("results", config),
  get: async (id, config) => api.get(`results/${id}`, config),
  create: async (data) => api.post("results", data),
  update: async (id, data) => api.patch(`results/${id}`, data),
  del: async (id) => api.delete(`results/${id}`),
  clearResults: async () => api.delete(`results`),
};
export default result;
