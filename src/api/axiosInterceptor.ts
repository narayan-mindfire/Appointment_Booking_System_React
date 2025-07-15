import axios from "axios";
import { loadData, removeData, saveData } from "../storage/app.storage";
const axiosInstance = axios.create({
  // baseURL: process.env.VITE_BASE_URL,
  baseURL: "http://localhost:5001/api/v1",
  withCredentials: true, 
});

axiosInstance.interceptors.request.use((config) => {
  const token = loadData("token", null);
  console.log("called")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        const newAccessToken = res.data.accessToken;

        if (newAccessToken) {
          console.log("got new access token")
          saveData("token", newAccessToken);
          return axiosInstance(originalRequest); 
        }
      } catch (refreshError) {
        console.error("Session expired. Please login again.", refreshError);
        removeData("token")
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
