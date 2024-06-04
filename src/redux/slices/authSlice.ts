"use client"

import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
      console.log(action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
const auth= authSlice.reducer

export default auth
