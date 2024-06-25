// src/app/ClientProvider.tsx

"use client";
import React from 'react';
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer />
    </Provider>
  );
}