"use client"
import React, { useState } from 'react';
import Table from '@/components/Table';
import { GreenButton } from '@/components/Button';
import DashboardHeader from '@/components/DashboardHeader';
import ProductPopup from '@/components/Product/AddProducts';
function SellerProductView() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <>
      <div className="w-full flex justify-center overflow-scroll">
        <div className="w-full max-w-[80%] flex flex-col justify-center align-middle">
          <div className="flex justify-between">
            <h2 className="text-xl text-black">Seller products view</h2>
            <div>
              <GreenButton name="New product" />
            </div>
          </div>
          <div className="w-full">
            <Table Role="seller" />
          </div>
        </div>
      </div>
      {isPopupOpen && <ProductPopup isOpen={isPopupOpen} onClose={handleClosePopup} />}
    </>
  );
}
export default SellerProductView;
