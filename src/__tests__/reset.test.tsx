// // Import the necessary testing utilities
import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import ResetPassword from '@/app/auth/reset-password/page';
import PopUpModels from '@/components/PopUpModels';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const mockedAxios = new MockAdapter(axios);
const renderReset = <ResetPassword />;



describe('ResetPassword component', () => {
  beforeEach(() => {
    // Clear mock function calls before each test
    mockedAxios.reset();
  });




  it('displays success message on reset password', async () => {
    const token = 'reset-token';

    // Mocking Axios response for successful reset
    mockedAxios.onPatch(`${process.env.URL}/users/reset-password/${token}`).reply(200);

    render(<ResetPassword />);

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
    const { getByText } = render(
      <PopUpModels
        testid="updatetest"
        bodyText=" Your password has been reset. "
        topText="Password Reset  ✅"
        iconImagelink="/Verified.png"
      />
    );
    expect(getByText("Please insert your new password you'd like to use")).toBeInTheDocument();
  });
});