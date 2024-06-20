import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
//import configureStore from 'redux-mock-store'; // Assuming you are using Redux
import OtpVerify from '../components/2faVerification';
import userEvent from '@testing-library/user-event';
import {
  handleOTPVerification,
  resendOTPCode,
  ISELLEROTP,
} from '../redux/slices/2faAuthenticationSlice'; // replace with your actual slice file
import { configureStore } from '@reduxjs/toolkit';
import twoFactorAuthSlice from '../redux/slices/2faAuthenticationSlice';
import axios from 'axios';
jest.mock('axios');
const URL = process.env.URL;
const store: any = configureStore({
  reducer: {
    sellerOTP: twoFactorAuthSlice,
  },
});
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));
let mockedAxios: any;
beforeEach(() => {
  mockedAxios = new MockAdapter(axios);
  localStorage.clear();
  localStorage.setItem('email', 'ericer@gmail.com');
  localStorage.setItem('password', 'Password123!');
});
describe('Login Tests', () => {
  it('renders OtpVerify component and shows dialog when isOpen is true', () => {
    //const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: document.createElement('dialog') });
    const { getByText } = render(
      <Provider store={store}>
        <OtpVerify isOpen={true} />
      </Provider>,
    );
  });
  // it('should handle OTP verification fulfilled action', async () => {
  //     const {getByTestId}=render(<Provider store={store}><OtpVerify isOpen={true} /></Provider>);
  //     const otpToken = 'token-login';
  //     const result= mockedAxios.onPost(`${URL}/users/otp/${otpToken}`).reply(201, {token:otpToken })
  //     await act(async () => {
  //         await store.dispatch(handleOTPVerification('12345'));
  //           await store.dispatch({
  //             type: handleOTPVerification.fulfilled.type,
  //             payload: otpToken,
  //           })
  //       });
  //     const state:RootState= store.getState();
  //     console.log('state', state);
  //     expect(state.sellerOTP.loading).toBe(false);
  //     expect(state.sellerOTP.newOtp).toBe(false);
  //     expect(localStorage.getItem('token')).toBe(otpToken);
  //   });
  it('should handle OTP verification pending action', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <OtpVerify isOpen={true} />
      </Provider>,
    );
    const otpToken = 'token-login';
    const result = mockedAxios
      .onPost(`${URL}/users/otp/${otpToken}`)
      .reply(201, { token: otpToken });
    await act(async () => {
      await store.dispatch(handleOTPVerification('12345'));
      await store.dispatch({
        type: handleOTPVerification.pending.type,
        payload: otpToken,
      });
    });
    const state: RootState = store.getState();
    expect(state.sellerOTP.loading).toBe(true);
    expect(localStorage.getItem('token')).toBe(null);
  });
  it('should handle OTP verification rejected action', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <OtpVerify isOpen={true} />
      </Provider>,
    );
    const otpToken = 'token-login';
    const result = mockedAxios
      .onPost(`${URL}/users/otp/${otpToken}`)
      .reply(201, { token: otpToken });
    await act(async () => {
      await store.dispatch(handleOTPVerification('12345'));
      await store.dispatch({
        type: handleOTPVerification.rejected.type,
        payload: otpToken,
      });
    });
    const state: RootState = store.getState();
    expect(state.sellerOTP.loading).toBe(false);
    expect(state.sellerOTP.error).toContain(otpToken);
    expect(localStorage.getItem('token')).toBe(null);
  });
  it('should test resend OTP verification pending action', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <OtpVerify isOpen={true} />
      </Provider>,
    );
    const otpToken = 'token-login';
    const result = mockedAxios
      .onPost(`${URL}/users/login`)
      .reply(200, { token: otpToken });
    await act(async () => {
      await store.dispatch(resendOTPCode('12345'));
      await store.dispatch({
        type: resendOTPCode.pending.type,
        payload: otpToken,
      });
    });
    const state = store.getState();
    expect(state.sellerOTP.loading).toBe(true);
    expect(state.sellerOTP.newOtp).toBe(true);
  });
  it('should test resend OTP verification fulfilled action', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <OtpVerify isOpen={true} />
      </Provider>,
    );
    const otpToken = 'token-login';
    const result = mockedAxios
      .onPost(`${URL}/users/login`)
      .reply(200, { token: otpToken });
    await act(async () => {
      await store.dispatch(resendOTPCode('12345'));
      await store.dispatch({
        type: resendOTPCode.fulfilled.type,
        payload: otpToken,
      });
    });
    const state = store.getState();
    expect(state.sellerOTP.loading).toBe(false);
    expect(state.sellerOTP.newOtp).toBe(false);
  });
});






