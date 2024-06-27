import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Page from '@/app/dashboard/page';
import request from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

jest.mock('@/utils/axios', () => ({
  get: jest.fn(),
}));

jest.mock('next/cache', () => ({
  unstable_noStore: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const queryClient = new QueryClient();
jest.mock('@/components/DashNavbar', () => () => (
  <div data-testid="mock-dashnavbar">Mock DashNavbar</div>
));
jest.mock('@/components/headerDash', () => () => (
  <div data-testid="mock-headernav">Mock DashNavbar</div>
));
describe('Page Component', () => {
  beforeEach(() => {
    (request.get as jest.Mock).mockImplementation((url) => {
      if (url.includes('/stats')) {
        return Promise.resolve({
          data: {
            stats: {},
          },
        });
      }
      if (url.includes('/categories')) {
        return Promise.resolve({
          categories: [
            { id: 1, name: 'Category 1' },
            { id: 2, name: 'Category 2' },
          ],
        });
      }
      if (url.includes('/users')) {
        return Promise.resolve({
          users: [
            { id: 1, name: 'User 1', role: 'admin' },
            { id: 2, name: 'User 2', role: 'seller' },
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

  test('renders loading state initially', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>,
    );
  });

  test('renders data after loading', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>,
    );
  });
});
