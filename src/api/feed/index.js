import api from "../index";

const feed = {
  getAll: async (config) => api.get("feeds", config),
  get: async (id, config) => api.get(`feeds/${id}`, config),
  my: async (config) => api.get(`feeds/my`, config),
  create: async (data) => api.post("feeds", data),
  update: async (id, data) => api.patch(`feeds/${id}`, data),
  del: async (id) => api.delete(`feeds/${id}`),
  createComment: async (id, data) => api.post(`feeds/comments/${id}`, data),
  getCommentsByFeed: async (id, config) =>
    api.get(`feeds/comments/${id}`, config),
  getComments: async (config) => api.get("feeds/comments", config),
};
export default feed;
