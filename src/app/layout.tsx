//import { Inter } from "next/font/google";
import React from 'react';
import "./globals.css";
import { Metadata } from "next";
import ClientProvider from '../app/clientProvider'; 
import Providers from './providers';

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Champs E-Commerce",
  description: "Your favorite marketplace",
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
            {children}
          </ClientProvider>
        </Providers>
      </body>
    </html >
  );
}
