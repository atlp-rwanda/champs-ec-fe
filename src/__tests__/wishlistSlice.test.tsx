// userWishlistSlice.test.ts

import { AnyAction } from 'redux';
import { createStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import userWishlistReducer, { handleWishlistCount, userWishlistSlice } from '@/redux/slices/wishlistSlice'; // Adjust the import path as per your project structure

// Mocking axios request module
jest.mock('@/utils/axios', () => ({
  get: jest.fn()
}));

describe('userWishlistSlice', () => {
  let store: any;

  beforeEach(() => {
    store = createStore(userWishlistReducer);
  });
  it('should handle handleWishlistCount reducer', () => {
    const previousState = { wishNumber: 0 };//@ts-ignore
    const newState = userWishlistReducer(previousState, { type: handleWishlistCount.type, payload: 5 });
    expect(newState.wishNumber).toEqual(5);
  });

});
