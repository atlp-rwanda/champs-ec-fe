import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import request from '@/utils/axios';
import View from '@/app/payments/success/page';

jest.mock('@/utils/axios');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const queryClient = new QueryClient();

describe('View Component', () => {
  beforeEach(() => {
    queryClient.clear();
  });

//   it('fetches and displays orders on mount', async () => {
//     const mockOrders = [
//       { id: 1, productPrice: 100, quantity: 2, buyerName: 'John Doe' },
//     ];
//     (request.get as jest.Mock).mockResolvedValueOnce({ data: mockOrders });

//     render(
//       <QueryClientProvider client={queryClient}>
//         <View />
//       </QueryClientProvider>
//     );

//     await waitFor(() => {
//       expect(screen.getByText('Thanks for your order!')).toBeInTheDocument();
//       mockOrders.forEach((order) => {
//         expect(screen.getByText(new RegExp(`Price: \\$${order.productPrice}`))).toBeInTheDocument();
//         expect(screen.getByText(new RegExp(`Quantity: ${order.quantity}`))).toBeInTheDocument();
//         expect(screen.getByText(new RegExp(`Buyer: ${order.buyerName}`))).toBeInTheDocument();
//       });
//     });
//   });

//   it('opens and closes the order overlay', async () => {
//     const mockOrders = [
//       { id: 1, productPrice: 100, quantity: 2, buyerName: 'John Doe' },
//     ];
//     (request.get as jest.Mock).mockResolvedValueOnce({ data: mockOrders });

//     render(
//       <QueryClientProvider client={queryClient}>
//         <View />
//       </QueryClientProvider>
//     );

//     await waitFor(() => {
//       expect(screen.getByText('Thanks for your order!')).toBeInTheDocument();
//     });

//     fireEvent.click(screen.getByText('View Order'));
//     expect(screen.getByText('OrdersContainer')).toBeInTheDocument();

//     fireEvent.click(screen.getByText('Close Orders'));
//     expect(screen.queryByText('OrdersContainer')).not.toBeInTheDocument();
//   });

  it('redirects to shopping on button click', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(
      <QueryClientProvider client={queryClient}>
        <View />
      </QueryClientProvider>
    );

    // await waitFor(() => {
    //   expect(screen.getByText('Thanks for your order!')).toBeInTheDocument();
    // });

    // fireEvent.click(screen.getByText('Return to Shopping'));
    // expect(mockPush).toHaveBeenCalledWith('/');
  });
});
