import request from '@/utils/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
const URL = process.env.URL;

export interface ISELLEROTP {
  loading: boolean;
  newOtp?: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: ISELLEROTP = {
  newOtp: false,
  loading: false,
  error: '',
  isAuthenticated: false,
};

export const handleOTPVerification = createAsyncThunk(
  'auth/otp',
  async (otp: string) => {
    const otpToken = localStorage.getItem('token') || '';

    try {
      const res = await axios.post(`${URL}/users/otp/${otpToken}`, { otp });
      return res.data.token;
    } catch (error: any) {
      return error.response.data;
    }
  },
);

export const resendOTPCode = createAsyncThunk(
  'auth/resendOTP',
  async (otp: string) => {
    // const otpToken = localStorage.getItem('token') || "";
    try {
      const res = await axios.post(`${URL}/users/login`, {
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password'),
      });

      return res.data.otpToken;
    } catch (error: any) {
      const msg = 'Some thing went wrong please try again';
      return msg;
    }
  },
);

const twoFactorAuthSlice = createSlice({
  name: 'sellerToken',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(handleOTPVerification.pending, (state: ISELLEROTP) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      handleOTPVerification.fulfilled,
      (state: ISELLEROTP, action: PayloadAction<any>) => {
        const result = action.payload;
        state.loading = false;
        if (result) {
          state.error = action.payload;
        }
        if (result.message) {
          state.error = result.message;
        } else {
          state.error = '';
          localStorage.setItem('token', action.payload);
          state.isAuthenticated = true;
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
      },
    );
    builder.addCase(
      handleOTPVerification.rejected,
      (state: ISELLEROTP, action: PayloadAction<any>) => {
        (state.loading = false), (state.error = action.payload);
      },
    );

    builder.addCase(
      resendOTPCode.pending,
      (state: ISELLEROTP, action: PayloadAction<any>) => {
        state.loading = true;
        state.newOtp = true;
        state.isAuthenticated = false;
        state.error = '';
      },
    );

    builder.addCase(
      resendOTPCode.fulfilled,
      (state: ISELLEROTP, action: PayloadAction<any>) => {
        state.loading = false;
        state.newOtp = false;
        state.error = '';
        localStorage.setItem('token', action.payload);
      },
    );
  },
});

//export const {sellerOTP}=twoFactorAuthSlice.actions
export default twoFactorAuthSlice.reducer;
