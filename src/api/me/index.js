import api from "../index";

const me = {
  //Получение конкретной сущности "collections"
  me: async (config = {}) => api.get(`/me`, config),
  update: async (data) => api.patch("/me", data),
};

export default me;
