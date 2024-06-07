import request from './axios';

// axios request example usage
const User = {
  list: () => request.get('/users'),
  create: (data: object) => request.post('/users', data),
};

const Product = {
  list: () => request.get('/products'),
  create: (data: object) => request.post('/products', data),
};

export const getUsers = () => User.list();
export const createUser = (data: object) => User.create(data);

export const getProducts = () => Product.list();
export const createProduct = (data: object) => Product.create(data);
