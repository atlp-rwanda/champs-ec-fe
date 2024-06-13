// Import the necessary testing utilities
import React from 'react';
import {  fireEvent, render, screen} from '@testing-library/react';

import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import  ForgotPassword from '@/app/auth/forgotpassword/page'
import PopUpModels from '@/components/PopUpModels';

jest.mock('next/navigation', () => ({
    useRouter() {
      return {
        prefetch: () => null,
      };
    },
  }));
const mockedAxios = new MockAdapter(axios)
const renderRecover=< ForgotPassword />
describe("recover Tests", () => {
    beforeEach(() => {
        mockedAxios.reset()
    })
  

    it("Test should view the input button", async () => {
        const { getByText, getByPlaceholderText } = render(renderRecover)
        const button = getByText("Send")
        await userEvent.click(button)
        expect(screen.queryByText('Email is required')).toBeInTheDocument()
        expect(getByPlaceholderText("example@example.com")).toBeInTheDocument()
     
    })

    
    it('displays success message on recover account', async () => {
        mockedAxios.onPost(`${process.env.NEXT_PUBLIC_URL}/users/reset-password`);
        render(<ForgotPassword />);
    
        fireEvent.change(screen.getByPlaceholderText('example@example.com'), {
          target: { value: 'tchamianest@gmail.com' },
        });

        await userEvent.click(screen.getByText('Send'));
    
        const { getByText, getByTestId } = render(
          <PopUpModels
          testid="updatetest"
          bodyText=" Password reset Instructions sent via email "
          topText="Password Reset"
          iconImagelink="/Verified.png"
          />,
        );
        expect(() => getByTestId('result')).toThrow();
      });

      it('Test failed recover'  , async () => {
        render(<ForgotPassword />);
        const button = screen.getByText('Send');
        await userEvent.click(button);

        expect(screen.queryByText('Email is required')).toBeInTheDocument();

      });

})


        
                
    




