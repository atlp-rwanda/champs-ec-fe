'use client';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import request from '@/utils/axios';

interface UserProfile {
  loading: boolean;
  data: any;
  error: string | null;
}

const initialState: UserProfile = {
  data: [],
  loading: false,
  error: null,
};

export const getUserProfile = createAsyncThunk('UserProfile', async () => {
  try {
    const response = request.get('/users/profile');
    return response;
  } catch (error: any) {
    return error;
  }
});

const UserProfile = createSlice({
  name: 'UserProfile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserProfile.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.User;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default UserProfile.reducer;
