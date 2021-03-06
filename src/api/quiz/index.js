import api from "../index";

const quiz = {
  getAll: async (config) => api.get("quiz", config),
  get: async (id, config) => api.get(`quiz/${id}`, config),
  my: async (config) => api.get(`quiz/my`, config),
  create: async (data) => {
    console.log("HEREEEE");
    return api.post("quiz", data);
  },
  update: async (id, data) => api.patch(`quiz/${id}`, data),
  del: async (id) => api.delete(`quiz/${id}`),
  start: async (id) => api.post(`quiz/${id}/start`),
};
export default quiz;
