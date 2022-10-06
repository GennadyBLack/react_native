import Axios from "axios";
import { getToken } from "../helpers/storage";

const prod = true;

const baseURL = prod ? "http://62.217.178.124:8081" : "http://localhost:8081";
const apiUrl = `${baseURL}/api`;

let token = null;
getToken().then((res) => (token = res));
const axiosParams = {
  baseURL: `${apiUrl}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
if (token && token !== "null") {
  axiosParams.headers.Authorization = `Bearer ${token}`;
}

const axiosInstance = Axios.create(axiosParams);

axiosInstance.interceptors.request.use(async (config) => {
  await getToken().then((res) => (token = res));
  config.headers = {
    ...config.headers,
  };
  if (token && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
  }
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
export { axiosInstance, apiUrl, baseURL };
