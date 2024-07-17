'use client';
import React from 'react';
import Link from 'next/link';
import BuyerOrdersList from '@/components/BuyerOrdersList';


const View: React.FC = () => {
 
  return (
    <>
    
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
   
        <div className="mx-auto max-w-2xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
            Thanks for your order!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
            You successfully purchased products at champs bay.
          </p>
          <div className="space-y-4 sm:space-y-2">
            <div className="order-details">
              <BuyerOrdersList/>
   
            </div>

            <div className="flex items-center space-x-4">
       
  
              <Link href='/'>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 my-5"
              
              >
                Return to Shopping
              </button>
              </Link>
            </div>
          </div>
        </div>
  
      </section>
 
   
      

    </>
    )
};

export default View;
