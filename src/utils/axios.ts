import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const api_base_url = process.env.URL;
// export const api_base_url = 'http://localhost:5500/api';
// console.log(api_base_url);

const responseBody = <T>(response: AxiosResponse<T>): T => response.data;

axios.defaults.baseURL = api_base_url;

axios.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

interface RequestMethods {
  get: <T>(URL: string, params?: Record<string, any>) => Promise<T>;
  post: <T>(URL: string, body: any, config?: AxiosRequestConfig) => Promise<T>;
  put: <T>(URL: string, body: any, config?: AxiosRequestConfig) => Promise<T>;
  delete: <T>(
    URL: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig,
  ) => Promise<T>;
  patch: <T>(URL: string, body: any, config?: AxiosRequestConfig) => Promise<T>;
}

const request: RequestMethods = {
  get: (URL, params) => axios.get(URL, { params }).then(responseBody),
  post: (URL, body) => axios.post(URL, body).then(responseBody),
  put: (URL, body) => axios.put(URL, body).then(responseBody),
  delete: (URL, params) => axios.delete(URL, { params }).then(responseBody),
  patch: (URL, body) => axios.patch(URL, body).then(responseBody),
};

export default request;
