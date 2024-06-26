import notificationsReducer, {
  getNotificationsAsync,
  readSingleNotificationAsync,
  readAllNotificationsAsync,
} from '@/redux/slices/notificationSlice';
import { NotificationItemType } from '@/types/notification';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const initialState = {
  notifications: [] as NotificationItemType[],
  loading: false,
  error: null as string | null,
  unread_notifications: [] as NotificationItemType[],
};

describe('Notification slice tests', () => {
  it('should handle initial state', () => {
    expect(notificationsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should handle getNotificationsAsync.pending', () => {
    const action = { type: getNotificationsAsync.pending.type };
    const state = notificationsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle getNotificationsAsync.fulfilled', () => {
    const notifications = [{ id: 1, message: 'Test notification' }];
    const action = {
      type: getNotificationsAsync.fulfilled.type,
      payload: notifications,
    };
    const state = notificationsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.notifications).toEqual(notifications);
  });

  it('should handle getNotificationsAsync.rejected', () => {
    const error = 'Error fetching notifications';
    const action = {
      type: getNotificationsAsync.rejected.type,
      payload: error,
    };
    const state = notificationsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(error);
  });

  it('should handle readSingleNotificationAsync.pending', () => {
    const action = { type: readSingleNotificationAsync.pending.type };
    const state = notificationsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle readSingleNotificationAsync.fulfilled', () => {
    const action = { type: readSingleNotificationAsync.fulfilled.type };
    const state = notificationsReducer(initialState, action);
    expect(state.loading).toBe(false);
  });

  it('should handle readSingleNotificationAsync.rejected', () => {
    const error = 'Error reading notification';
    const action = {
      type: readSingleNotificationAsync.rejected.type,
      payload: error,
    };
    const state = notificationsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(error);
  });

  it('should handle readAllNotificationsAsync.pending', () => {
    const action = { type: readAllNotificationsAsync.pending.type };
    const state = notificationsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle readAllNotificationsAsync.fulfilled', () => {
    const action = { type: readAllNotificationsAsync.fulfilled.type };
    const state = notificationsReducer(initialState, action);
    expect(state.loading).toBe(false);
  });

  it('should handle readAllNotificationsAsync.rejected', () => {
    const error = 'Error reading all notifications';
    const action = {
      type: readAllNotificationsAsync.rejected.type,
      payload: error,
    };
    const state = notificationsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(error);
  });
});
