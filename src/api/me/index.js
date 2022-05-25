import api from "../index";

const me = {
  //Получение конкретной сущности "collections"
  me: async (config = {}) => api.post(`auth/me`, config),
};

export default me;
