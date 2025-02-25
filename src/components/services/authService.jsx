import http from "./httpService";
import SnackbarUtils from "./../../utils/SnackbarUtils";

export async function loginWithGoogle() {
  try {
    // Redirect to backend's Google OAuth endpoint
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`;
  } catch (error) {
    SnackbarUtils.error("Google authentication failed!", error);
    return Promise.reject(error);
  }
}

let isRefreshing = false;
let refreshPromise = null;

export async function refreshToken() {
  if (isRefreshing && refreshPromise) {
    // If a refresh is already in progress, return the same promise
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const storedRefreshToken = localStorage.getItem("refresh_token");
      if (!storedRefreshToken) throw new Error("No refresh token available");

      const response = await http.post("/auth/refresh-token", {
        refreshToken: storedRefreshToken,
      });
      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem("access_token", user.accessToken);
        localStorage.setItem("refresh_token", user.refreshToken);
        return user.accessToken;
      }
      throw new Error("Failed to refresh token");
    } catch (ex) {
      console.error("Refresh token failed", ex);
      logout();
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();
  return refreshPromise;
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login"; // Redirect to login page
}

const exportObject = {
  loginWithGoogle,
  logout,
  refreshToken,
};

export default exportObject;
