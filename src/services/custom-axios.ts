import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({});

instance.interceptors.request.use(
  (response) => {
    // Do something before request is sent
    return response;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default instance;
