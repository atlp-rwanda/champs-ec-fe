import { showToast } from '@/helpers/toast';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const api_base_url = process.env.URL;

const responseBody = <T>(response: AxiosResponse<T>): T => response.data;

const axiosInstance = axios.create({
  baseURL: api_base_url,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      showToast('Server Network Error!', 'error');
    }
    if (error.response.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  },
);

if (typeof window !== 'undefined') {
  window.addEventListener('offline', () => {
    showToast('Network is offline!', 'error');
    return;
  });
}
interface RequestMethods {
  get: <T>(URL: string, params?: Record<string, any>) => Promise<T>;
  post: <T>(URL: string, body: any, config?: AxiosRequestConfig) => Promise<T>;
  put: <T>(URL: string, body: any, config?: AxiosRequestConfig) => Promise<T>;
  delete: <T>(
    URL: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig,
  ) => Promise<T>;
  patch: <T>(
    URL: string,
    body?: any,
    params?: any,
    config?: AxiosRequestConfig,
  ) => Promise<T>;
}

const request: RequestMethods = {
  get: (url, params) => axiosInstance.get(url, { params }).then(responseBody),
  post: (url, body) => axiosInstance.post(url, body).then(responseBody),
  put: (url, body) => axiosInstance.put(url, body).then(responseBody),
  delete: (url, params) =>
    axiosInstance.delete(url, { params }).then(responseBody),
  patch: (url, body, params) =>
    axios.patch(url, body, params).then(responseBody),
};

export default request;
