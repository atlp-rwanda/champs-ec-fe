import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { welcomeReducer } from './slices/welcomeSlice';
import twoFactorAuthSlice from './slices/2faAuthenticationSlice';
import updatePasswordReducer from './slices/UpdatePasswordSlice';

export const store = configureStore({
  reducer: {
    auth: welcomeReducer,
    updatePassword: updatePasswordReducer,
    sellerOTP: twoFactorAuthSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
