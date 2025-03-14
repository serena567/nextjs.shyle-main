

import axios from "axios";

const apiUrl = "http://localhost:3000";
const jwtkey = "accessToken";

// Interceptor to attach Authorization header if token is available
axios.interceptors.request.use(
(config) => {
  if (!config.url) {
    return config; // 如果 URL 不存在，直接返回 config
  }
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const accessToken = localStorage.getItem(jwtkey);

    if (allowedOrigins.includes(origin)) {
      config.headers = config.headers || {}; // Ensure headers object exists
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
}
);

// Utility function to create a full URL from the endpoint
export const createUrl = (endpoint: string): string => new URL(endpoint, apiUrl).href;

// Function to check if JWT is stored in localStorage
export const isStoredJwt = () => Boolean(localStorage.getItem(jwtkey));

// Function to set the JWT in localStorage
export const setStoredJwt = (accessToken: string) => {
localStorage.setItem(jwtkey, accessToken);
};

// Exporting axios HTTP methods with proper types
export const get = axios.get;
export const patch = axios.patch;
export const post = axios.post;
export const axiosDelete = axios.delete;
