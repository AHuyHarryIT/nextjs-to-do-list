import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
// axios.defaults.baseURL = "https://jsonplacfeholder.typicode.com";

const instance = axios.create({});

instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error: AxiosError) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
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

export default instance;
