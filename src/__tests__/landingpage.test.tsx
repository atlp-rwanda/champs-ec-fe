import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '@/app/products/page';
import * as nextNavigation from 'next/navigation';
import request from '@/utils/axios';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@/utils/axios', () => ({
  get: jest.fn(),
}));

jest.mock('@/components/Side', () => () => <div>Side Component</div>);
jest.mock('@/components/Header', () => () => <div>Header Component</div>);
jest.mock('@/components/Footer', () => () => <div>Footer Component</div>);
jest.mock('@/components/ProductList', () => ({ searchResults }: { searchResults: any[] }) => (
  <div>Product List with {searchResults.length} results</div>
));

describe('Page Component', () => {
  it('renders without crashing and fetches search results', async () => {
    const mockSearchParams = {
      toString: jest.fn().mockReturnValue(''),
    };
    const mockResponse = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

    (nextNavigation.useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (request.get as jest.Mock).mockResolvedValue(mockResponse);

    render(<Page />);

    // Wait for search results to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText('Header Component')).toBeInTheDocument();
      expect(screen.getByText('Footer Component')).toBeInTheDocument();
      expect(screen.getByText('Product List with 2 results')).toBeInTheDocument();
      expect(screen.getByText('Side Component')).toBeInTheDocument();
    });

  });

  it('handles error in fetching search results', async () => {
    const mockSearchParams = {
      toString: jest.fn().mockReturnValue(''),
    };
    const mockError = new Error('Network Error');

    (nextNavigation.useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (request.get as jest.Mock).mockRejectedValue(mockError);

    render(<Page />);

    // Wait for error handling
    await waitFor(() => {
      expect(screen.getByText('Header Component')).toBeInTheDocument();
      expect(screen.getByText('Footer Component')).toBeInTheDocument();
      expect(screen.getByText('Product List with 0 results')).toBeInTheDocument();
      expect(screen.getByText('Side Component')).toBeInTheDocument();
    });


  });
});
