"use client";

import React, { useState } from 'react';
import Dashboard from '@/components/Sidebar';
import ProductPopup from '../../../../components/AddProducts';

const Page = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div className="flex">
      <Dashboard />
      <div className="flex flex-col items-center justify-center flex-grow">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          create Product
        </button>
      </div>
      <ProductPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default Page;