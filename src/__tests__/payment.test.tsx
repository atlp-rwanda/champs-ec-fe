// src/hooks/usePayments.test.ts
import { render, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import request from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { usePayments } from '@/hooks/payment';

jest.mock('@/utils/axios');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('usePayments', () => {
  const mockPush = jest.fn();

  beforeAll(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle payment and navigate to payment URL on success', async () => {
    const paymentUrl = '/payment-success';
    (request.post as jest.Mock).mockResolvedValueOnce({ paymenturl: paymentUrl });

    const queryClient = new QueryClient();

    const TestComponent = () => {
      const { handlePayment } = usePayments();
      return (
        <button onClick={handlePayment}>Pay</button>
      );
    };

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    await act(async () => {
      getByText('Pay').click();
    });

    expect(mockPush).toHaveBeenCalledWith(paymentUrl);
  });
});
