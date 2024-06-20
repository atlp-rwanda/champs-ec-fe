'use client';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export const api_base_url = process.env.URL;

const responseBody = <T>(response: AxiosResponse<T>): T => response.data;

const axiosInstance = axios.create({
  baseURL: api_base_url,
});

axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      toast.error('Server Network Error!');
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
    toast.error('Network is Offline!');
    return;
  });
}

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
  get: (url, params) => axiosInstance.get(url, { params }).then(responseBody),
  post: (url, body) => axiosInstance.post(url, body).then(responseBody),
  put: (url, body) => axiosInstance.put(url, body).then(responseBody),
  delete: (url, params) =>
    axiosInstance.delete(url, { params }).then(responseBody),
  patch: (url, body) => axiosInstance.patch(url, body).then(responseBody),
};

export default request;
