import api from "../index";

const agents = {
  //Получение конкретной сущности "collections"
  get: async (id, config) => api.get(`/users/${id}`, config),

  delete: async (id) => api.delete(`/users/${id}`),

  update: async (id, data) => api.patch(`/users/${id}`, data),

  getAll: async (config) => api.get(`/users`, config),

  create: async (data) => api.post(`/users`, data),

  register: async (data) => api.post(`registration/agent`, data),
};
export default agents;
