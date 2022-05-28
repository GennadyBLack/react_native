import api from "../index";

const tools = {
  upload: async (id, data) => api.post(`upload/${id}`, data),
};
export default tools;
