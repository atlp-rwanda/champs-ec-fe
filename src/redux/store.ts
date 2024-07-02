

import twoFactorAuthSlice from './slices/2faAuthenticationSlice';
import updatePasswordReducer from './slices/UpdatePasswordSlice';
import userCartSlice from './slices/userCartSlice';

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import auth from "./slices/authSlice";
import productsAddReducers from "./slices/productSlice"; 
import { welcomeReducer } from './slices/welcomeSlice';
import UpdateProductSlice from './slices/UpdateProductSlice';



const rootReducer = combineReducers({
  auth: auth,
  productsAddReducers,
  sellerOTP: twoFactorAuthSlice,
  updatePassword: updatePasswordReducer,
  userCartData:userCartSlice,
  UpdateProducts:UpdateProductSlice

});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;