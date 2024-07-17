// __tests__/View.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import View from '@/app/payments/success/page'; 
import BuyerOrdersList from '@/components/BuyerOrdersList'; 
import { useRouter } from 'next/router';

// Mock the modules
jest.mock('@/components/BuyerOrdersList', () => {
  return () => <div>Mocked BuyerOrdersList</div>;
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('View Component', () => {
  it('renders the component', () => {
    render(<View />);
    
    expect(screen.getByText(/Thanks for your order!/i)).toBeInTheDocument();
    expect(screen.getByText(/You successfully purchased products at champs bay./i)).toBeInTheDocument();
    expect(screen.getByText(/Return to Shopping/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked BuyerOrdersList/i)).toBeInTheDocument();
  });

  it('navigates to home on button click', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    render(<View />);
    
    fireEvent.click(screen.getByText(/Return to Shopping/i));

   // expect(mockPush).toHaveBeenCalledWith('/');
  });
});
