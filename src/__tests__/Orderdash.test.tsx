import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Page from '@/app/dashboard/orders/page';
import request from '@/utils/axios';
import { useRouter } from 'next/navigation';

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
jest.mock('@/components/BuyerOrdersList', () => () => (
  <div data-testid="mock-dashnavbar">Mock buyer List</div>
));
jest.mock('@/components/headerDash', () => () => (
  <div data-testid="mock-headernav">Mock DashNavbar</div>
));
describe('Page Component', () => {
  beforeEach(() => {
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
});
