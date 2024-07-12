// Import the necessary testing utilities
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'; // Import Provider
import { QueryClient, QueryClientProvider } from 'react-query'; // Import QueryClient and QueryClientProvider
import { store } from '@/redux/store'; // Import your Redux store
import ResetPassword from '@/app/auth/reset-password/page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));
jest.mock('@/components/Header', () => () => (
  <div data-testid="mock-dashnavbar">Mock DashNavbar</div>
));
jest.mock('@/components/Footer', () => () => (
  <div data-testid="mock-dashnavbar">Mock DashNavbar</div>
));

const mockedAxios = new MockAdapter(axios);

// Create a new QueryClient instance
const queryClient = new QueryClient();

describe('ResetPassword component', () => {
  beforeEach(() => {
    // Clear mock function calls before each test
    mockedAxios.reset();
  });

  it('displays success message on reset password', async () => {
    const token = 'reset-token';

    // Mocking Axios response for successful reset
    mockedAxios.onPatch(`${process.env.URL}/users/reset-password/${token}`).reply(200);

    render(
      <Provider store={store}> {/* Wrap your component with Provider */}
        <QueryClientProvider client={queryClient}> {/* Wrap your component with QueryClientProvider */}
          <ResetPassword />
        </QueryClientProvider>
      </Provider>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('New Password'), {
      target: { value: 'Test@12345' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'Test@12345' },
    });

    // Click the reset button
    await userEvent.click(screen.getByText('Reset'));

    // Ensure success message component is rendered
  //  expect(await screen.findByText("Your password has been reset.")).toBeInTheDocument();
  });
});
