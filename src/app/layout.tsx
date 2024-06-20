//import { Inter } from "next/font/google";
import React from 'react';
import './globals.css';
import { Metadata } from 'next';
import ClientProvider from '../app/clientProvider'; // new file to handle client-side provider
import Providers from './providers';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <Providers>
          <ClientProvider>
            <ToastContainer
              position="top-right"
              rtl={false}
              autoClose={4000}
              pauseOnFocusLoss
              theme="light"
              newestOnTop
              pauseOnHover
              transition={Bounce}
            />
            {children}
          </ClientProvider>
        </Providers>
      </body>
    </html>
  );
}
