import { getTokenFromLocalStorage } from "@/utils/localStorage";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
});

axiosClient.interceptors.request.use(function (config) {
  const adminToken = getTokenFromLocalStorage("admin_token");
  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if(error.response.status == 401) {

    }
    return Promise.reject(error.reponse?.data);
  }
);

export default axiosClient;

