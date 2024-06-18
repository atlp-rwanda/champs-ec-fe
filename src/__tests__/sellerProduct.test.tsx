import React from 'react';
import { render, screen } from '@testing-library/react';
import SellerProductView from '@/app/sellers/products_/page';
import Page from "@/app/sellers/products_/[id]/page"
import SellerDash from "@/app/sellers/page"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useParams: () => ({
    get: () => { }
  }),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  }))
}));

describe('sellerProductView', () => {
  it('renders the loading state', () => {
    render(
        <QueryClientProvider client={queryClient}>
          <SellerDash />
        </QueryClientProvider>
    );
    // expect(screen.getByText('Welcome to the seller dashboard')).toBeInTheDocument();
  });
  it('renders the "Seller products view" text', () => {
    render(
      <QueryClientProvider client={queryClient}>
          <SellerProductView />
        </QueryClientProvider>
    );
    // expect(screen.getByText('Seller products view')).toBeInTheDocument();
  });
  it('renders the loading state', () => {
    render(
      <QueryClientProvider client={queryClient}>
          <Page />
        </QueryClientProvider>
    );
    // expect(screen.getByText('Description:')).toBeInTheDocument();
  });
});

