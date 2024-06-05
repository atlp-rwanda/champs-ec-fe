import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const api_base_url = process.env.URL;

const responseBody = <T>(response: AxiosResponse<T>): T => response.data;

axios.defaults.baseURL = api_base_url;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

interface RequestMethods {
  get: <T>(url: string, params?: Record<string, any>) => Promise<T>;
  post: <T>(url: string, body: any, config?: AxiosRequestConfig) => Promise<T>;
  put: <T>(url: string, body: any, config?: AxiosRequestConfig) => Promise<T>;
  delete: <T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig,
  ) => Promise<T>;
  patch: <T>(url: string, body: any, config?: AxiosRequestConfig) => Promise<T>;
}

const request: RequestMethods = {
  get: (url, params) => axios.get(url, { params }).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url, params) => axios.delete(url, { params }).then(responseBody),
  patch: (url, body) => axios.patch(url, body).then(responseBody),
};

export default request;
