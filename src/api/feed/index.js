import api from "../index";

const feed = {
  getAll: async (data) => api.get("feeds", data),
  get: async (id, config) => api.get(`feeds/${id}`, config),
  create: async (data) => api.post("feeds", data),
  update: async (id, data) => api.path(`feeds/${id}`, data),
  del: async (id) => api.delete(`feeds/${id}`),
};
export default feed;
