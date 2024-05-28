'use client';
import React from 'react';
import { useAppSelector } from '@/redux/store';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  // const authState = useAppSelector((state) => state.auth.message);
  // console.log(authState);
  // console.log('.......................................................');
  // console.log('Testing Redux implementation...');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-primaryBlue  rounded-md shadow-md hover:shadow-lg duration-200 cursor-pointer hover:scale-110">
        <p className="text-lg p-4">This is champs e commerce Homepage</p>
      </div>
      <div className="flex h-[20px] gap-10">
        <button className="bg-primaryBlue w-[80px] h-[40px]">
          <Link href="/auth/login" className="text-white">
            {' '}
            Login
          </Link>
        </button>
        <button className="bg-primaryBlue w-[80px] h-[40px]">
          <Link href="/auth/signup" className="text-white">
            {' '}
            Signup
          </Link>
        </button>
      </div>
    </main>
  );
}
