// lib/axiosInstance.ts
import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys"; // Import snakecaseKeys package (ensure to install this package)
import { isClient } from "./detectUtils";

// Extend the InternalAxiosRequestConfig interface to include skipCaseConversion
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  skipCaseConversion?: boolean;
  skipRequestCaseConversion?: boolean; // Add an additional flag to skip request data case conversion
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token to headers and convert request data to snake_case
axiosInstance.interceptors.request.use(
  (config: CustomAxiosRequestConfig): CustomAxiosRequestConfig => {
    if (isClient()) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const user = JSON.parse(localStorage.getItem("user")!); // Fetch the token from localStorage
      if (user) {
        config.headers.Authorization = `Token ${user.token}`;
      }
    }

    // Convert request data keys to snake_case unless skipRequestCaseConversion is set
    if (
      !config.skipRequestCaseConversion &&
      config.data &&
      typeof config.data === "object" &&
      config.headers["Content-Type"] === "application/json"
    ) {
      config.data = snakecaseKeys(config.data, { deep: true });
    }

    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.replace("/login");
      //place your reentry code
    }

    return Promise.reject(error);
  },
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
  },
);

export default axiosInstance;
