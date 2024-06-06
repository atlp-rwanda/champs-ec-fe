'use client';
import React from 'react';
import { useAppSelector } from '@/redux/store';
import Image from 'next/image';
import Link from 'next/link';

export default function SellerDashboard() {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white rounded-md shadow-lg mx-auto px-10">
        <p className="text-[40px] p-4 font-semibold">Welcome to champs e commerce Seller Dashboard</p>
       
        <p className="text-[24px] p-8 text-center">you are successful logged in  </p> 
        <a href='/' className="w-[150px] float-right bg-primaryBlue  p-2 mb-10 hover:shadow-lg duration-200 cursor-pointer hover:scale-110 text-center text-[#FFF]">Back to index</a>
      </div>
    
    </main>
  );
}
