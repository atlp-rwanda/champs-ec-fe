import userCartSlice, {
  handleCartCount,
  handleChangeCartQuantity,
  handleRemoveAllCart,
  handleRemoveItemInCart,
  handleUserAddCart,
} from '@/redux/slices/userCartSlice';
import { configureStore } from '@reduxjs/toolkit';
import { act } from '@testing-library/react';
import axios from 'axios';
import { showToast } from '@/helpers/toast';
import MockAdapter from 'axios-mock-adapter';
import request from '@/utils/axios';
jest.mock('@/utils/axios');
jest.mock('@/helpers/toast');
const URL = process.env.URL;
const mockedRequest = request as jest.Mocked<typeof request>;

// Mock localStorage

const store: any = configureStore({
  reducer: {
    cartReducer: userCartSlice,
  },
});
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

describe('userCartSlice', () => {
  let mockedAxios: MockAdapter;
  beforeEach(() => {
    mockedAxios = new MockAdapter(axios);
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  const productPayload = {
    productId: 'test-product-id',
    productPrice: 100,
  };

  it('should add a new product to the cart when the cart is initially empty', async () => {
    const payload = {
      productId: 'product1',
      productPrice: 100,
    };

    (request.post as jest.Mock).mockResolvedValue({ data: 'success' });

    const thunk = handleUserAddCart(payload);
    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await thunk(dispatch, getState, undefined);

    expect(request.post).toHaveBeenCalledWith('/carts', [
      { productId: 'product1', Quantity: 1 },
    ]);
    expect(result.payload).toEqual({ data: 'success' });
  });

  it('should add a new product to an existing cart', async () => {
    const initialState = {
      loading: false,
      allProduct: [],
      cart: { userId: '', product: [] },
      productInCart: [],
      error: null,
    };

    const payload = {
      productId: 'product2',
      productPrice: 150,
    };

    localStorage.setItem(
      'productCart',
      JSON.stringify({
        userId: 'user1',
        product: [{ product: 'product1', quantity: 1, totalPrice: 100 }],
      }),
    );

    (request.put as jest.Mock).mockResolvedValue({ data: 'success' });

    const thunk = handleUserAddCart(payload);
    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await thunk(dispatch, getState, undefined);

    expect(request.put).toHaveBeenCalledWith('/carts', [
      { productId: 'product1', Quantity: 1 },
      { productId: 'product2', Quantity: 1 },
    ]);
    expect(result.payload).toEqual({ data: 'success' });

    // Dispatch the handleRemoveItemInCart action
    const result2 = await store.dispatch(
      handleUserAddCart({ productId: 'product2', quantity: 1 }),
    );
    await handleUserAddCart({ productId: 'product2', quantity: 1 })(
      dispatch,
      () => initialState,
      undefined,
    );

    // Assertions
    const actions = dispatch.mock.calls.map((call) => call[0]);
    expect(result2.payload).toEqual({ data: 'success' });
    expect(actions[0].type).toBe(handleUserAddCart.pending.type);
    expect(actions[1].type).toBe(handleUserAddCart.fulfilled.type);
  });

  it('should handle product already exists in the cart', async () => {
    const payload = {
      productId: 'product1',
      productPrice: 100,
    };

    localStorage.setItem(
      'productCart',
      JSON.stringify({
        userId: 'user1',
        product: [{ product: 'product1', quantity: 1, totalPrice: 100 }],
      }),
    );

    const thunk = handleUserAddCart(payload);
    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await thunk(dispatch, getState, undefined);
  });

  it('should handle errors during request', async () => {
    const payload = {
      productId: 'product1',
      productPrice: 100,
    };

    localStorage.setItem(
      'productCart',
      JSON.stringify({
        userId: 'user1',
        product: [{ product: 'product2', quantity: 1, totalPrice: 150 }],
      }),
    );

    (request.put as jest.Mock).mockRejectedValue({
      response: { data: { error: 'Network error' } },
    });

    const thunk = handleUserAddCart(payload);
    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await thunk(dispatch, getState, undefined);

    expect(showToast).toHaveBeenCalledWith('Network error', 'error');
    // expect(result.payload).toEqual('Network error');
  });

  //-------------------------- test handle cart number update =================================================================

  it('should update the quantity of a product in the cart successfully', async () => {
    const initialState = {
      loading: false,
      allProduct: [],
      cart: { userId: '', product: [] },
      productInCart: [],
      error: null,
    };

    const payload = {
      productId: 'product1',
      quantity: 3,
    };

    localStorage.setItem(
      'productCart',
      JSON.stringify({
        userId: 'user1',
        product: [{ product: 'product1', quantity: 1 }],
      }),
    );

    (request.put as jest.Mock).mockResolvedValue({ data: 'success' });

    const thunk = handleChangeCartQuantity(payload);
    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await thunk(dispatch, getState, undefined);

    const expectedItems = [{ productId: 'product1', Quantity: 3 }];

    expect(request.put).toHaveBeenCalledWith('/carts', expectedItems);
    expect(result.payload).toEqual({ data: 'success' });
    // Dispatch the handleRemoveItemInCart action
    const result2 = await store.dispatch(
      handleChangeCartQuantity({ productId: 'product2', quantity: 1 }),
    );
    await handleChangeCartQuantity({ productId: 'product2', quantity: 1 })(
      dispatch,
      () => initialState,
      undefined,
    );

    // Assertions
    const actions = dispatch.mock.calls.map((call) => call[0]);
    expect(result2.payload).toEqual({ data: 'success' });
    expect(actions[0].type).toBe(handleChangeCartQuantity.pending.type);
    expect(actions[1].type).toBe(handleChangeCartQuantity.fulfilled.type);
  });

  it('should handle errors during the request', async () => {
    const payload = {
      productId: 'product1',
      quantity: 3,
    };

    localStorage.setItem(
      'productCart',
      JSON.stringify({
        userId: 'user1',
        product: [{ product: 'product1', quantity: 1 }],
      }),
    );

    const errorResponse = { response: { data: { error: 'Network error' } } };
    (request.put as jest.Mock).mockRejectedValue(errorResponse);

    const thunk = handleChangeCartQuantity(payload);
    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await thunk(dispatch, getState, undefined);

    expect(request.put).toHaveBeenCalledWith('/carts', [
      { productId: 'product1', Quantity: 3 },
    ]);
    expect(result.payload).toEqual(errorResponse.response.data);
    // expect(result.error.message).toBe('Rejected');
  });

  //-------------------------- test handle  delete a single cart item =================================================================

  it('should remove a product from the cart successfully', async () => {
    const initialState = {
      loading: false,
      allProduct: [],
      cart: { userId: '', product: [] },
      productInCart: [],
      error: null,
    };
    const productId = 'product1';

    // Mock localStorage data
    localStorage.setItem(
      'productCart',
      JSON.stringify({
        userId: 'user1',
        product: [
          { product: 'product1', quantity: 2 },
          { product: 'product2', quantity: 1 },
        ],
      }),
    );

    // Mock Axios response for the PUT request
    const expectedItems = [{ productId: 'product2', Quantity: 1 }];

    mockedRequest.put.mockResolvedValue({ data: 'success' });
    const dispatch = jest.fn();
    // Dispatch the handleRemoveItemInCart action
    const result = await store.dispatch(handleRemoveItemInCart(productId));
    await handleRemoveItemInCart(productId)(
      dispatch,
      () => initialState,
      undefined,
    );

    // Assertions
    expect(mockedRequest.put).toHaveBeenCalledWith('/carts', expectedItems);
    const actions = dispatch.mock.calls.map((call) => call[0]);
    console.log(
      '1111111111111111111111111111111111111111111111111111111111111111111111111111111',
      result,
    );
    expect(result.payload).toEqual({ data: 'success' });
    expect(actions[0].type).toBe(handleRemoveItemInCart.pending.type);
    expect(actions[1].type).toBe(handleRemoveItemInCart.rejected.type);
  });

  //-------------------------- test handle  delete a single cart item =================================================================

  it('should remove all product from the cart successfully', async () => {
    const initialState = {
      loading: false,
      allProduct: [],
      cart: { userId: '', product: [] },
      productInCart: [],
      error: null,
    };

    // Mock localStorage data
    localStorage.setItem(
      'productCart',
      JSON.stringify({
        userId: 'user1',
        product: [
          { product: 'product1', quantity: 2 },
          { product: 'product2', quantity: 1 },
        ],
      }),
    );

    // Mock Axios response for the PUT request
    const expectedItems: any = [];

    mockedRequest.put.mockResolvedValue({ data: 'success' });
    const dispatch = jest.fn();
    // Dispatch the handleRemoveItemInCart action
    const result = await store.dispatch(handleRemoveAllCart());
    await handleRemoveAllCart()(dispatch, () => initialState, undefined);

    // Assertions
    expect(mockedRequest.put).toHaveBeenCalledWith('/carts', expectedItems);
    const actions = dispatch.mock.calls.map((call) => call[0]);
    expect(result.payload).toEqual({ data: 'success' });
    expect(actions[0].type).toBe(handleRemoveAllCart.pending.type);
    expect(actions[1].type).toBe(handleRemoveAllCart.fulfilled.type);
  });

  it('should update the cart and save to localStorage when result.cart is provided', () => {
    const actionPayload = {
      cart: {
        userId: 'user1',
        product: [{ productId: 'product1', quantity: 2 }],
      },
    };

    store.dispatch(handleCartCount(actionPayload));
    const state: RootState = store.getState();
    //const newState = userCartReducer(initialState, action);

    expect(state.cartReducer.cart).toEqual(actionPayload.cart);
    expect(state.cartReducer.error).toBe('');
    expect(localStorage.getItem('productCart')).toBe(
      JSON.stringify(actionPayload.cart),
    );
  });

  it('should update the error and clear the cart when result.cart is not provided', () => {
    const actionPayload = {
      error: 'Error occurred',
    };

    store.dispatch(handleCartCount(actionPayload));
    const state: RootState = store.getState();
    expect(state.cartReducer.error).toBe(actionPayload.error);
    expect(state.cartReducer.cart).toEqual({ userId: '', product: [] });
    expect(localStorage.getItem('productCart')).toBe(null);
  });
});
