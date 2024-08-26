// lib/axiosInstance.ts
import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import camelcaseKeys from "camelcase-keys";

// Extend the InternalAxiosRequestConfig interface to include skipCaseConversion
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  skipCaseConversion?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Base URL from .env file
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config: CustomAxiosRequestConfig): CustomAxiosRequestConfig => {
    const token = localStorage.getItem("token"); // Fetch the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to change case of the response data
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    const config = response.config as CustomAxiosRequestConfig;

    // Check if the request config has the skipCaseConversion flag
    if (
      !config.skipCaseConversion &&
      response.data &&
      typeof response.data === "object"
    ) {
      // Convert all keys in the response data to camelCase
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
