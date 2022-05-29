import api from "../index";

const tools = {
  upload: async (data) => api.post(`/upload`, data),
};
export default tools;
