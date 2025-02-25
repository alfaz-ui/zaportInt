import axios from "axios";
import authService from "./authService";

// Set base URL
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

// Request Interceptor - Attach Token
axios.interceptors.request.use((config) => {
  console.log("api call started");
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedRequestsQueue = [];

// Response Interceptor - Handle Unauthorized Errors
axios.interceptors.response.use(
  (response) => response, // Return response if successful
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // If already refreshing, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh token
        const newToken = await authService.refreshToken();

        if (!newToken) {
          throw new Error("Failed to refresh token");
        }

        // Update default header with new token
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        // Resolve all queued requests with the new token
        failedRequestsQueue.forEach((req) => req.resolve(newToken));
        failedRequestsQueue = [];

        // Retry the original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Reject all queued requests
        failedRequestsQueue.forEach((req) => req.reject(refreshError));
        failedRequestsQueue = [];

        // Logout on refresh failure
        authService.logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
