import {
  createProduct,
  fetchCategories,
  productsSlice,
} from '@/redux/slices/productSlice';

import { configureStore } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const initialState = {
  products: [],
  categories: [],
  status: 'idle',
  error: null,
};

const mock = new MockAdapter(axios);

describe('Products slice tests', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsSlice.reducer,
      },
    });
    mock.reset();
  });

  it('should handle initial state', () => {
    expect(store.getState().products).toEqual(initialState);
  });

  it('should handle fetchCategories.pending', () => {
    store.dispatch({ type: fetchCategories.pending.type });
    expect(store.getState().products.status).toEqual('loading');
  });

  it('should handle fetchCategories.fulfilled', async () => {
    const categories = [{ id: '1', categoryName: 'Electronics' }];
    mock.onGet(`${process.env.URL}/categories`).reply(200, { categories });

    await store.dispatch(fetchCategories());

    expect(store.getState().products.status).toEqual('succeeded');
    expect(store.getState().products.categories).toEqual(categories);
  });

  it('should handle fetchCategories.rejected', async () => {
    const error = 'Failed to fetch categories';
    mock.onGet(`${process.env.URL}/categories`).reply(500, { error });

    await store.dispatch(fetchCategories());

    expect(store.getState().products.status).toEqual('failed');
    expect(store.getState().products.error).toEqual({ error });
  });

  it('should handle createProduct.pending', () => {
    store.dispatch({ type: createProduct.pending.type });
    expect(store.getState().products.status).toEqual('loading');
  });

  it('should handle createProduct.failed', async () => {
    const newProduct = {
      id: '1',
      productName: 'Test Product',
      productCategory: 'Electronics',
      productPrice: 100,
      discount: 10,
      currency: 'USD',
      expireDate: '2023-12-31',
      stockLevel: 10,
      description: 'A test product',
      loading: false,
      productPictures: [],
    };
    mock.onPost(`${process.env.URL}/products`).reply(200, newProduct);

    await store.dispatch(createProduct(newProduct));

    expect(store.getState().products.status).toEqual('failed');
  });

  it('should handle createProduct.rejected', async () => {
    const error = 'Failed to create product';
    const newProduct = {
      productName: 'Test Product',
      productCategory: 'Electronics',
      productPrice: 100,
      discount: 10,
      currency: 'USD',
      expireDate: '2023-12-31',
      stockLevel: 10,
      description: 'A test product',
      productPictures: [],
    };
    mock.onPost(`${process.env.URL}/products`).reply(500, { error });

    await store.dispatch(createProduct(newProduct));

    expect(store.getState().products.status).toEqual('failed');
    expect(store.getState().products.error).toEqual('No token found');
  });
});
