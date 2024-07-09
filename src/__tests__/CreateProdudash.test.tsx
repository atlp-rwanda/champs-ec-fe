import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Page from '@/app/dashboard/addproduct/page';
import request from '@/utils/axios';
import { useRouter } from 'next/navigation';

jest.mock('@/utils/axios', () => ({
  get: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock components
jest.mock('@/components/DashNavbar', () => () => (
  <div data-testid="mock-dashnavbar">Mock DashNavbar</div>
));
jest.mock('@/components/headerDash', () => () => (
  <div data-testid="mock-headerdash">Mock HeaderDash</div>
));
jest.mock('@/components/Product/AddProducts', () => () => (
  <div data-testid="mock-addproducts">Mock AddProducts</div>
));

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

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  test('renders data after loading', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('mock-dashnavbar')).toBeInTheDocument();
    });

    expect(screen.getByTestId('mock-headerdash')).toBeInTheDocument();
    expect(screen.getByTestId('mock-addproducts')).toBeInTheDocument();
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
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith('/dashboard/home');
    });
  });
});
