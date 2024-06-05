import React, { act } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '@/app/auth/login/page';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import OtpVerify from '../components/2faVerification'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '@/redux/store';


jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));



const mockedAxios = new MockAdapter(axios)
const renderLogin=<Provider store={store}><Login /></Provider>
describe("Login Tests", () => {
    beforeEach(() => {
        mockedAxios.reset()
    })
    const URL = process.env.NEXT_PUBLIC_URL

    it("Test should view the input button", async () => {
        const { getByText, getByPlaceholderText } = render(renderLogin)
        const button = getByText("Log in")
        await userEvent.click(button)
        expect(screen.queryByText('Email is required')).toBeInTheDocument()
        expect(screen.queryByText('Password is required')).toBeInTheDocument()
        expect(getByPlaceholderText("Enter Email")).toBeInTheDocument()
        expect(getByPlaceholderText("Enter Password")).toBeInTheDocument()
    })

    it("Test Pass login", async () => {
        const { getByPlaceholderText, getByText } = render(renderLogin)
        const token = 'token-login';
        mockedAxios.onPost(`${URL}/users/login`).reply(200, { token: token })
        await act(() => {
            fireEvent.change(getByPlaceholderText('Enter Email'), { target: { value: 'user@gmail.com' } })
            fireEvent.change(getByPlaceholderText('Enter Password'), { target: { value: 'User@12345' } })
        })
        const button = getByText("Log in")
        await userEvent.click(button)
        expect(localStorage.getItem('token')).toBe(token);
    })

    it("Test Pass login seller ", async () => {
        const { getByPlaceholderText, findByText, getByText } = render(renderLogin)
        mockedAxios.onPost(`${URL}/users/login`).reply(201, { message: "THIS IS A SELLER" })
        await act(() => {
            fireEvent.change(getByPlaceholderText('Enter Email'), { target: { value: 'user@gmail.com' } })
            fireEvent.change(getByPlaceholderText('Enter Password'), { target: { value: 'User@12345' } })
        })
        const button = getByText("Log in")
        await userEvent.click(button)
        expect(localStorage.getItem('email')).toBe('user@gmail.com');

        
                
    })

    // it("Test Failed login", async () => {
    //     const { findByText, getByPlaceholderText, getByText } = render(renderLogin)
    //     mockedAxios.onPost(`${URL}/users/login`).reply(400, { message: 'Invalid username' })
    //     await act(() => {
    //         fireEvent.change(getByPlaceholderText('Enter Email'), { target: { value: 'user@gmail.com' } })
    //         fireEvent.change(getByPlaceholderText('Enter Password'), { target: { value: 'User@12345' } })
    //     })
    //     const button = getByText("Log in")
    //     await userEvent.click(button)
    //     const errorMessage = await findByText('Invalid username');
    //     expect(errorMessage).toBeInTheDocument();
    // })



  it('Test Failed login', async () => {
    const { findByText, getByPlaceholderText, getByText } = render(renderLogin);
    mockedAxios
      .onPost(`${URL}/users/login`)
      .reply(400, { message: 'Invalid username' });
    await act(() => {
      fireEvent.change(getByPlaceholderText('Enter Email'), {
        target: { value: 'user@gmail.com' },
      });
      fireEvent.change(getByPlaceholderText('Enter Password'), {
        target: { value: 'User@12345' },
      });
    });
    const button = getByText('Log in');
    await userEvent.click(button);
    const errorMessage = await findByText('Invalid Email Or Password');
    expect(errorMessage).toBeInTheDocument();
  });
});
