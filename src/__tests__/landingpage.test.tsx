import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Page from '@/app/products/page';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));
jest.mock('axios');
jest.mock('@/components/Header', () => () => <div>Header Mock</div>);
jest.mock('@/components/Footer', () => () => <div>Footer Mock</div>);
jest.mock('@/components/ProductList', () => () => <div>ProductList Mock</div>);
jest.mock('@/components/Side', () => () => <div>Side Mock</div>);

describe('Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header, footer, side, and product list components', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(''));
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });

    render(<Page />);

    expect(screen.getByText('Header Mock')).toBeInTheDocument();
    expect(screen.getByText('Footer Mock')).toBeInTheDocument();
    expect(screen.getByText('Side Mock')).toBeInTheDocument();
    expect(screen.getByText('ProductList Mock')).toBeInTheDocument();
    expect(screen.getByText('All Products')).toBeInTheDocument();
  });

  it('fetches search results on mount and passes them to ProductList', async () => {
    const searchResults = [
      { id: '1', productName: 'Product 1', productDescription: 'Description 1', productPrice: 100, productThumbnail: 'image1.jpg', reviews: [] },
      { id: '2', productName: 'Product 2', productDescription: 'Description 2', productPrice: 200, productThumbnail: 'image2.jpg', reviews: [] },
    ];

    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('query=example'));
    (axios.get as jest.Mock).mockResolvedValue({ data: searchResults });

    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('ProductList Mock')).toBeInTheDocument();
    });
  });

  it('handles errors when fetching search results', async () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('query=example'));
    (axios.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('All Products')).toBeInTheDocument();
    });

  
    
  });

  it('renders the product sorting dropdown', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(''));
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });

    render(<Page />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.getByText('Recent')).toBeInTheDocument();
    expect(screen.getByText('Clothes')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });
});
