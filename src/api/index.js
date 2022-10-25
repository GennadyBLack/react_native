import Axios from "axios";
import { getToken } from "../helpers/storage";
// import usePort from "../hooks/usePort";
import Constants from "expo-constants";
import { Platform } from "react-native";
const { manifest } = Constants;

let localUri;
if (Platform.OS === "web") {
  localUri = `http://localhost:8081`;
} else {
  localUri = `http://${manifest?.debuggerHost
    ?.split(`:`)
    .shift()
    .concat(`:8081`)}`;
}

console.log(localUri);
const prod = false;
const baseURL = prod ? "http://62.217.178.124:8081" : localUri;
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
