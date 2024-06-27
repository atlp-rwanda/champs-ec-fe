import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Page from '@/app/dashboard/users/page';
import request from '@/utils/axios';
import { useRouter } from 'next/navigation';

const queryClient = new QueryClient();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/components/DashNavbar', () => () => (
  <div data-testid="mock-dashnavbar">Mock DashNavbar</div>
));

jest.mock('@/components/headerDash', () => () => (
  <div data-testid="mock-headernav">Mock DashNavbar</div>
));
describe('render user page on dashboard', () => {
  beforeAll(() => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({
        User: {
          Role: {
            name: 'admin',
          },
          name: 'test User',
        },
      }),
    );
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  test('render the user page', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>,
    );
  });
});
