import api from "../index";

const auth = {
  login: async (data) => api.post("auth/login", data),
  register: async (data) => api.post("auth/register", data),
  refresh: async (data) => api.post("auth/jwt/refresh", data),
};
export default auth;
