// src/app/ClientProvider.tsx

"use client";
import React from 'react';
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
