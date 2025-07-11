import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  withCredentials: true, 
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  console.log(`got token: `, token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use((res) => res,async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
        
      originalRequest._retry = true;
      try {
        console.log("Refreshing token...");
        const res = await axiosInstance.post("/auth/refresh-token");
        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); 
      } catch {
        console.error("Session expired. Please login again.");
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; 
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
