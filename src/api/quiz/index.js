import api from "../index";

const quiz = {
  getAll: async (config) => api.get("quiz", config),
  get: async (id, config) => api.get(`quiz/${id}`, config),
  my: async (config) => api.get(`quiz/my`, config),
  create: async (data) => api.post("quiz", data),
  update: async (id, data) => api.patch(`quiz/${id}`, data),
  del: async (id) => api.delete(`quiz/${id}`),
};
export default quiz;
