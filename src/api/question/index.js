import api from "../index";

const question = {
  getAll: async (config) => api.get("questions", config),
  get: async (id, config) => api.get(`questions/${id}`, config),
  create: async (data) => api.post("questions", data),
  update: async (id, data) => api.patch(`questions/${id}`, data),
  del: async (id) => api.delete(`questions/${id}`),
};
export default question;
