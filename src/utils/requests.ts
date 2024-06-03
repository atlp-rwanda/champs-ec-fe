import { ProductType } from '@/types/Product';
import request from './axios';

// axios request example usage
type ProductAPIType = {
  list: () => Promise<ProductType[]>;
  single: (id: number) => Promise<ProductType>;
  create: (data: object) => Promise<ProductType>;
};

const User = {
  list: () => request.get('/users'),
  create: (data: object) => request.post('/users', data),
};

export const Product = {
  list: () => request.get('/products'),
  list_range: (page: number, limit: number) =>
    request.get(`/products?page=${page}&limit=${limit}`),
  single: (id: string) => request.get(`/products/${id}`),
  create: (data: object) => request.post('/products', data),
};

export const getUsers = () => User.list();
export const createUser = (data: object) => User.create(data);

export const getProducts = () => Product.list();
export const createProduct = (data: object) => Product.create(data);