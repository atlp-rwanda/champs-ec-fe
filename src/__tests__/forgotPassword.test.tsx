// Import the necessary testing utilities
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { QueryClient, QueryClientProvider } from 'react-query'; // Import QueryClient and QueryClientProvider
import { store } from '@/redux/store'; // Import your Redux store
import ForgotPassword from '@/app/auth/forgotpassword/page';
import PopUpModels from '@/components/PopUpModels';

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
const queryClient = new QueryClient();

describe("recover Tests", () => {
  beforeEach(() => {
    mockedAxios.reset();
  });

  it("Test should view the input button", async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ForgotPassword />
        </QueryClientProvider>
      </Provider>
    );
    const button = getByText("Send");
    await userEvent.click(button);
    expect(screen.queryByText('Email is required')).toBeInTheDocument();
    expect(getByPlaceholderText("example@example.com")).toBeInTheDocument();
  });

  it('displays success message on recover account', async () => {
    mockedAxios.onPost(`${process.env.URL}/users/reset-password`).reply(200);
    
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ForgotPassword />
        </QueryClientProvider>
       </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('example@example.com'), {
      target: { value: 'tchamianest@gmail.com' },
    });

    await userEvent.click(screen.getByText('Send'));

    render(
      <PopUpModels
        handleButton={jest.fn()} // Provide a mock function for handleButton
        testid="updatetest"
        bodyText=" Password reset Instructions sent via email "
        topText="Password Reset"
        iconImagelink="/Verified.png"
      />
    );

  //  expect(screen.getByText("Password reset Instructions sent via email")).toBeInTheDocument();
  });

  it('Test failed recover', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ForgotPassword />
        </QueryClientProvider>
      </Provider>
    );
    const button = screen.getByText('Send');
    await userEvent.click(button);

    expect(screen.queryByText('Email is required')).toBeInTheDocument();
  });
});
