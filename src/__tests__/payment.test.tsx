// src/hooks/usePayments.test.ts
import { render, act } from '@testing-library/react';
import { useState } from 'react';
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

    const TestComponent = () => {
      const { handlePayment } = usePayments();
      return (
        <button onClick={handlePayment}>Pay</button>
      );
    };

    const { getByText } = render(<TestComponent />);

    await act(async () => {
      getByText('Pay').click();
    });

    expect(mockPush).toHaveBeenCalledWith(paymentUrl);
  });

//   it('should set error message on payment failure', async () => {
//     const errorMessage = 'Payment failed';
//     (request.post as jest.Mock).mockRejectedValueOnce({
//       response: {
//         data: {
//           error: errorMessage,
//         },
//       },
//     });

//     const TestComponent = () => {
//       const { handlePayment, error } = usePayments();
//       return (
//         <div>
//           <button onClick={handlePayment}>Pay</button>
//           {error && <span>{error}</span>}
//         </div>
//       );
//     };

//     const { getByText, findByText } = render(<TestComponent />);

//     await act(async () => {
//       getByText('Pay').click();
//     });

//     expect(await findByText(errorMessage)).toBeInTheDocument();
//   });
});
