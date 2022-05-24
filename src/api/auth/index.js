import api from "../index";

const auth = {
  login: async (data) => api.post("auth/jwt/login", data),
  refresh: async (data) => api.post("auth/jwt/refresh", data),
};
export default auth;
