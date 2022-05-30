import Axios from "axios";
import { getToken } from "../helpers/storage";
// ifconfig -a
const apiUrl = process.env.BASE_URL || "http://localhost:8081/api";
let token = null;
getToken().then((res) => (token = res));
console.log(token, "tokentokentokentoken");

const axiosParams = {
  baseURL: `${apiUrl}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${JSON.parse(token || null)}`,
  },
};

const axiosInstance = Axios.create(axiosParams);

axiosInstance.interceptors.request.use(async (config) => {
  await getToken().then((res) => (token = res));
  config.headers = {
    ...config.headers,
    Authorization: token ? `Bearer ${token}` : null,
  };
  return config;
});

const api = (axios) => {
  return {
    get: (url, config) => axios.get(url, config),
    post: (url, body, config) => axios.post(url, body, config),
    patch: (url, body, config) => axios.patch(url, body, config),
    delete: (url, config) => axios.delete(url, config),
  };
};

export default api(axiosInstance);
export { axiosInstance };
