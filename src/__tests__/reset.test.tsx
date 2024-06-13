// Import the necessary testing utilities
import React  from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import ResetPassword from '@/app/auth/reset-password/page'
import PopUpModels from '@/components/PopUpModels';

jest.mock('next/navigation', () => ({
    useRouter() {
      return {
        prefetch: () => null,
      };
    },
  }));
const mockedAxios = new MockAdapter(axios)
const renderReset=<ResetPassword />
describe("Reset Tests", () => {
    beforeEach(() => {
        mockedAxios.reset()
    })
  

    it("Test should view the input button", async () => {
        const { getByText, getByPlaceholderText } = render(renderReset)
        const button = getByText("Reset")
        await userEvent.click(button)
        expect(screen.queryByText('Password is required')).toBeInTheDocument()
        expect(screen.queryByText('Confirm Password is required')).toBeInTheDocument()
        expect(getByPlaceholderText("New Password")).toBeInTheDocument()
        expect(getByPlaceholderText("Confirm Password")).toBeInTheDocument()
    })

    // it('displays success message on reset password', async () => {
    //     const token='reset-token'
    //     console.log()
    //     mockedAxios
    //         .onPatch(`${process.env.NEXT_PUBLIC_URL}/users/reset-password/${token}`)
    //         .reply(200);

    //     render(renderReset);

    //     fireEvent.change(screen.getByPlaceholderText('New Password'), {
    //         target: { value: 'Test@12345' },
    //     });
    //     fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
    //         target: { value: 'Test@12345' },
    //     });

    //     await userEvent.click(screen.getByText('Reset'));

    //             const { getByText, getByTestId } = render(
    //       <PopUpModels
    //       testid="updatetest"
    //       bodyText=" Your password has been reset. "
    //       topText="Password Reset  ✅"
    //       iconImagelink="/Verified.png"
    //       />,
    //     );
    //     expect(() => getByTestId('result')).toThrow();
    // });
})


        
                
    

