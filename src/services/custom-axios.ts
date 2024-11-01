import axios, { AxiosError, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers["x-access-token"] = session.accessToken;
    }
    return config;
  },
  (error: AxiosError) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Do something before response is sent
    return response;
  },
  (error: AxiosError) => {
    if (error.code === "ERR_NETWORK") {
      error.message =
        "Network error: Unable to reach the server. Please check your connection.";
    } else if (error.response) {
      switch (error.response.status) {
        case 404:
          error.message = "Resource not found";
          break;
        case 500:
          error.message = "Internal server error";
          break;

        default:
          error.message = "Something went wrong";
          break;
      }
    } else if (error.request) {
      error.message = "No response received from the server";
    } else {
      error.message = "Something went wrong while setting up the request";
    }
    return Promise.reject(error);
  },
);

export const axiosInstanceWithoutToken = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanceWithoutToken.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error: AxiosError) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

axiosInstanceWithoutToken.interceptors.response.use(
  (response: AxiosResponse) => {
    // Do something before response is sent
    return response;
  },
  (error: AxiosError) => {
    if (error.code === "ERR_NETWORK") {
      error.message =
        "Network error: Unable to reach the server. Please check your connection.";
    } else if (error.response) {
      switch (error.response.status) {
        case 404:
          error.message = "Resource not found";
          break;
        case 500:
          error.message = "Internal server error";
          break;

        default:
          error.message = "Something went wrong";
          break;
      }
    } else if (error.request) {
      error.message = "No response received from the server";
    } else {
      error.message = "Something went wrong while setting up the request";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
