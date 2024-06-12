import { NotificationItemType, NotificationType } from '@/types/notification';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const URL = process.env.URL;

interface NotificationState {
  notifications: NotificationItemType[];
  loading: boolean;
  error: string | null;
  unread_notifications: NotificationItemType[];
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
  unread_notifications: [],
};

export const getNotificationsAsync = createAsyncThunk(
  'notifications/get',
  async (_, thunkApi) => {
    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const res = await axios.get(`${URL}/notifications`, config);
      const notificationData: NotificationType = res.data;
      return notificationData.Notification;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkApi.rejectWithValue({ error });
    }
  },
);

export const readSingleNotificationAsync = createAsyncThunk(
  'notifications/read/one',
  async (id: any, thunkApi) => {
    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const res = await axios.patch(`${URL}/notifications/${id}`, {}, config);
      return res.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkApi.rejectWithValue({ error });
    }
  },
);

export const readAllNotificationsAsync = createAsyncThunk(
  'notifications/read/all',
  async (_, thunkApi) => {
    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const res = await axios.patch(`${URL}/notifications`, {}, config);
      return res.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkApi.rejectWithValue({ error });
    }
  },
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getNotificationsAsync.fulfilled,
        (state, action: PayloadAction<NotificationItemType[]>) => {
          state.notifications = action.payload;
          state.loading = false;
        },
      )
      .addCase(getNotificationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(readSingleNotificationAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readSingleNotificationAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(readSingleNotificationAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(readAllNotificationsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readAllNotificationsAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(readAllNotificationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default notificationsSlice.reducer;
