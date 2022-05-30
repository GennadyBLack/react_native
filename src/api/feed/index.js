import api from "../index";

const feed = {
  getAll: async (config) => api.get("feeds", config),
  get: async (id, config) => api.get(`feeds/${id}`, config),
  my: async (config) => api.get(`feeds/my`, config),
  create: async (data) => api.post("feeds", data),
  update: async (id, data) => api.patch(`feeds/${id}`, data),
  del: async (id) => api.delete(`feeds/${id}`),
};
export default feed;
