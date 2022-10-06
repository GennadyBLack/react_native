import api from "../index";

const chat = {
  getAll: async (config) => api.get("chat", config),
  get: async (id, config) => api.get(`chat/${id}`, config),
  my: async (config) => api.get(`chat/my`, config),
  create: async (data) => api.post("chat", data),
  update: async (id, data) => api.patch(`chat/${id}`, data),
  del: async (id) => api.delete(`chat/${id}`),
  //   createComment: async (id, data) => api.post(`chat/comments/${id}`, data),
};
export default chat;
