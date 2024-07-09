import { renderHook } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { handleFetchUserCart, handleCartInfoManipulation } from '@/hooks/userCart';
import { ProductType } from '@/types/Product';

// Mocking useDispatch and useQueryClient
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(),
  useQuery: jest.fn(),
}));

// describe('handleFetchUserCart', () => {
//   let mockDispatch: jest.Mock;
//   let mockUseQuery: jest.Mock;
//   let mockQueryClient: jest.Mocked<any>;
//   let axiosMock: MockAdapter;

//   beforeEach(() => {
//     // Clear mocks and setup axios mock adapter
//     jest.clearAllMocks();
//     mockDispatch = jest.fn();
//     mockUseQuery = jest.fn();
//     mockQueryClient = useQueryClient as jest.Mocked<any>;
//     axiosMock = new MockAdapter(axios);
//   });

//   afterEach(() => {
//     axiosMock.restore();
//   });

// //   it('fetches user cart data successfully', async () => {
// //     const mockUserData = { id: '1', name: 'John Doe' };
// //     const mockCartData = { cart: [{ product: '1', quantity: 2 }] };
// //     const mockLocalStorage = jest.spyOn(window.localStorage.__proto__, 'setItem');
// //     mockLocalStorage.mockImplementation(() => {});

// //     localStorage.setItem('profile', JSON.stringify(mockUserData));

// //     // Mock useQuery behavior
// //     mockUseQuery.mockReturnValue({
// //       data: mockCartData,
// //       error: null,
// //       isLoading: false,
// //     });

// //     // Mock useDispatch behavior
// //     const mockedDispatch = useDispatch as unknown as jest.Mock;
// //     mockedDispatch.mockReturnValue(mockDispatch);

// //     // Mock axios request
// //     axiosMock.onGet('/carts').reply(200, mockCartData);

// //     // Execute the hook
// //     renderHook(() => handleFetchUserCart());

// //     // Assertions
// //     expect(mockLocalStorage).toHaveBeenCalledWith('productCart', JSON.stringify(mockCartData.cart));
// //     expect(mockDispatch).toHaveBeenCalled();
// //     expect(mockDispatch).toHaveBeenCalledWith({ type: 'userCart/handleCartCount', payload: mockCartData });
// //   });

// //   it('handles error when fetching user cart data', async () => {
// //     const mockUserData = { id: '1', name: 'John Doe' };
// //     const mockError = { response: { data: { error: 'Error fetching cart data' } } };
// //     const mockLocalStorage = jest.spyOn(window.localStorage.__proto__, 'removeItem');
// //     mockLocalStorage.mockImplementation(() => {});

// //     localStorage.setItem('profile', JSON.stringify(mockUserData));

// //     // Mock useQuery behavior
// //     mockUseQuery.mockReturnValue({
// //       data: null,
// //       error: mockError,
// //       isLoading: false,
// //     });

// //     // Mock useDispatch behavior
// //     const mockedDispatch = useDispatch as unknown as jest.Mock;
// //     mockedDispatch.mockReturnValue(mockDispatch);

// //     // Mock axios request
// //     axiosMock.onGet('/carts').reply(500, mockError.response.data);

// //     // Execute the hook
// //     renderHook(() => handleFetchUserCart());

// //     // Assertions
// //     expect(mockLocalStorage).toHaveBeenCalledWith('productCart');
// //     expect(mockDispatch).toHaveBeenCalled();
// //     expect(mockDispatch).toHaveBeenCalledWith({ type: 'userCart/handleCartCount', payload: mockError.response.data });
// //   });
// });

describe('handleCartInfoManipulation', () => {
  it('manipulates cart information correctly', () => {
    const mockCart: any = {
      product: [{ product: '1', quantity: 2 }],
    };
    const mockProducts: ProductType[] = [
      {
          id: '1', productName: 'Product 1', productPrice: 10, productDescription: 'Description 1', productThumbnail: 'thumb1.jpg',
          productCurrency: '',
          productPictures: [],
          reviews: [],
          related: undefined
      },
      {
          id: '2', productName: 'Product 2', productPrice: 20, productDescription: 'Description 2', productThumbnail: 'thumb2.jpg',
          productCurrency: '',
          productPictures: [],
          reviews: [],
          related: undefined
      },
    ];

    const manipulatedCart = handleCartInfoManipulation(mockCart, mockProducts);

    expect(manipulatedCart).toHaveLength(1);
    expect(manipulatedCart[0].name).toEqual('Product 1');
    expect(manipulatedCart[0].unitPrice).toEqual(10);
    expect(manipulatedCart[0].description).toEqual('Description 1');
    expect(manipulatedCart[0].thumbnail).toEqual('thumb1.jpg');
  });
});
