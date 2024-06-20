import React from 'react';
import Table from '@/components/Table';
import { GreenButton } from '@/components/Button';
import DashboardHeader from '@/components/DashboardHeader';

function SellerProductView() {
  return (
    <>
      <div className='w-full flex justify-center overflow-scroll'>
        <div className='w-full max-w-[80%] flex flex-col justify-center align-middle'>
         <div className="flex justify-between">
           <h2 className="text-xl text-black">Seller products view</h2>
           <div>
             <GreenButton name="New product" />
           </div>
         </div>
         <div className='w-full'>
           <Table />
         </div>
        </div>
      </div>
    </>
  );
}

export default SellerProductView;
