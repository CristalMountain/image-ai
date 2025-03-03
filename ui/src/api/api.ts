import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: apiUrl,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      console.error("Logging out...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
