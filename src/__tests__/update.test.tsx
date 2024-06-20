import { configureStore } from '@reduxjs/toolkit';
import axiosMockAdapter from 'axios-mock-adapter';
import UpdateProductsSlice, { fetchCategories,  IUpdateProductInput } from '@/redux/slices/UpdateProductSlice';
import axios from 'axios';
import { AppDispatch, RootState } from '@/redux/store';

const mock = new axiosMockAdapter(axios);


describe('UpdateProductsSlice', () => {
  let store: ReturnType<typeof configureStore>;
  let dispatch: AppDispatch;

  beforeEach(() => {
    store = configureStore({
      reducer: {
       UpdateProducts : UpdateProductsSlice,
      },
    });
    dispatch = store.dispatch as AppDispatch;
  });

  afterEach(() => {
    mock.reset();
    localStorage.clear();
  });


  it('should handle fetchCategories success', async () => {
    const categories = [{ id: '1', categoryName: 'Category 1' }];
    mock.onGet('/categories/').reply(200, { categories });

    await dispatch(fetchCategories());

    const state :any= store.getState();
    expect(state.UpdateProducts.status).toBe('idle');
  // expect(state.UpdateProducts.categories).toEqual(categories);
    expect(state.UpdateProducts.error).toBeNull();
    // Assuming you store categories in state (update initialState and extraReducers accordingly)
   
  });

  // it('should handle fetchCategories failure', async () => {
  //   mock.onGet('/categories/').reply(500, { error: 'Error fetching categories' });

  //   await dispatch(fetchCategories());

  //   const state :any= store.getState();
  //   expect(state.UpdateProducts.status).toBe('failed');
  //   expect(state.UpdateProducts.error).toBe('Error fetching categories');
  // });

//   it('should handle updateProduct success', async () => {
//     const productData: IUpdateProductInput = {
//       id: '1',
//       productName: 'Test Product',
//       productCategory: 'Test Category',
//       productPrice: 100,
//       discount: 10,
//       currency: 'USD',
//       expireDate: '2024-12-31',
//       stockLevel: 50,
//       description: 'Test Description',
//       productPictures: [new File([''], 'test.png')],
//     };

//     const updatedProduct = { ...productData };
//     mock.onPut(`/products/${productData.id}`).reply(200, updatedProduct);

//     localStorage.setItem('token', 'data-token');

//     await dispatch(updateProduct(productData));

//     const state :any= store.getState();
//     expect(state.UpdateProducts.status).toBe('succeeded');
//     expect(state.UpdateProducts.error).toBeNull();
//     expect(state.UpdateProducts.products[0]).toEqual(updatedProduct);
//   });

//   it('should handle updateProduct failure', async () => {
//     const productData: IUpdateProductInput = {
//       id: '1',
//       productName: 'Test Product',
//       productCategory: 'Test Category',
//       productPrice: 100,
//       discount: 10,
//       currency: 'USD',
//       expireDate: '2024-12-31',
//       stockLevel: 50,
//       description: 'Test Description',
//       productPictures: [new File([''], 'test.png')],
//     };

//     mock.onPut(`/products/${productData.id}`).reply(500, { error: 'Error updating product' });

//     localStorage.setItem('token', 'data-token');

//     await dispatch(updateProduct(productData));

//     const state :any= store.getState();
    
//     expect(state.UpdateProducts.status).toBe('failed');
//     expect(state.UpdateProducts.error).toBe('Error updating product');
//   });
 });
