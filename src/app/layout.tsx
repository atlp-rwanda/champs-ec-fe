import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import ClientProvider from '../app/clientProvider'; // new file to handle client-side provider

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
