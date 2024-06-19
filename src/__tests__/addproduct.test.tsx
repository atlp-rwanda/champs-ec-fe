import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import ProductPopup from '@/components/AddProducts';
import { configureStore } from '@reduxjs/toolkit';
import productsAddReducers from '@/redux/slices/productSlice';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import Page from '@/components/ProductsAdmin';

// Mock the useRouter function from next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const mock = new MockAdapter(axios);
mock.onGet('/api/categories').reply(200, [{ id: 1, name: 'furniture' }]);

// Setting up the store
const store = configureStore({
  reducer: {
    productsAddReducers,
  },
});

describe('Creating Products Test', () => {
  it('renders the product popup', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <ProductPopup isOpen={true} onClose={() => {}} />
        </Provider>
      );
    });

    expect(screen.getByText('Add New Product')).toBeInTheDocument();
  });

  it('renders the product creation page', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Page />
        </Provider>
      );
    });

    const button = screen.getByText('create Product');
    expect(button).toBeInTheDocument();

    await act(async () => {
      userEvent.click(button);
    });

    expect(screen.findByText('Add New Product')).toBeDefined();
  });

  })