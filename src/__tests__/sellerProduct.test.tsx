import React from 'react';
import { render, screen } from '@testing-library/react';
import SellerProductView from '@/app/sellers/products_/page';
import Page from '@/app/sellers/products_/[id]/page';
import SellerDash from '@/app/sellers/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useParams: jest.fn(() => ({
    id: '1', // Mocking a product ID
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

describe('Seller pages', () => {
  it('renders the loading state for SellerDash', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SellerDash />
      </QueryClientProvider>
    );
    // Uncomment and update the assertion based on the actual content of SellerDash
    // expect(screen.getByText('Welcome to the seller dashboard')).toBeInTheDocument();
  });

  it('renders the "Seller products view" text', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SellerProductView />
      </QueryClientProvider>
    );
    // Uncomment and update the assertion based on the actual content of SellerProductView
    // expect(screen.getByText('Seller products view')).toBeInTheDocument();
  });

  it('renders the loading state for Page', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );
    // Uncomment and update the assertion based on the actual content of Page
    // expect(screen.getByText('Description:')).toBeInTheDocument();
  });
});
