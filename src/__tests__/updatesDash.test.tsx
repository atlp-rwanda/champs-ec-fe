import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Page from '@/app/dashboard/product/[id]/edit/page';
import request from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

jest.mock('@/utils/axios', () => ({
  get: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

// Mock components
jest.mock('@/components/DashNavbar', () => () => (
  <div data-testid="mock-dashnavbar">Mock DashNavbar</div>
));
jest.mock('@/components/headerDash', () => () => (
  <div data-testid="mock-headerdash">Mock HeaderDash</div>
));
jest.mock('@/components/Product/AddProducts', () => () => (
  <div data-testid="mock-AddProducts">Mock AddProducts</div>
));

const mockProduct = {
  productCategory: 'Electronics',
  productCurrency: 'USD',
  productDescription: 'A sample product',
  productDiscount: 10,
};
const queryClient = new QueryClient();

describe('Page Component', () => {
  beforeEach(() => {
    (request.get as jest.Mock).mockImplementation((url) => {
      if (url.includes('/categories')) {
        return Promise.resolve({
          data: [
            { id: 1, name: 'Category 1' },
            { id: 2, name: 'Category 2' },
          ],
        });
      }
      return Promise.resolve({ data: [] });
    });

    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({
        User: {
          Role: {
            name: 'admin',
          },
          name: 'Test User',
        },
      }),
    );
    const { useParams } = jest.requireMock('next/navigation');
    useParams.mockReturnValue({ id: '123' });

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  test('renders data after loading', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Page />
        </QueryClientProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('mock-dashnavbar')).toBeInTheDocument();
    });

    expect(screen.getByTestId('mock-headerdash')).toBeInTheDocument();
  });

  test('redirects to /dashboard/home if user is not a seller', async () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({
        User: {
          Role: {
            name: 'admin',
          },
          name: 'Test User',
        },
      }),
    );

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Page />
        </QueryClientProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith('/dashboard');
    });
  });
});
