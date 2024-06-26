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