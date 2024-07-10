//import { Inter } from "next/font/google";
import React from 'react';
import "./globals.css";
import Providers from './providers';
import './globals.css';
import { Metadata } from 'next';
import ClientProvider from '../app/clientProvider';
import ReactQueryProvider from '@/utils/ReactQueryProvider';


//const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: 'Champs E-Commerce',
  description: 'Your favorite marketplace',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ClientProvider>
            {children}
          </ClientProvider>
        </ReactQueryProvider>
      </body>
    </html >
  )
}
