'use client';
import React, { useEffect, useState } from 'react';
import ShortCard from '@/components/shortCard';

interface Params {
  user: any;
  data: any;
  categories: any;
  users: [];
}
const SellerSummary: React.FC<Params> = ({ user, data, categories, users }) => {
  return (
    <div className="flex justify-between  border-[1px] p-5 sm:w-[80%] w-[90%]">
      <div className="flex flex-col p-3 w-full ">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="font-semibold">Today Summary</h1>
            <p className="pl-2">seller summary</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-4 grid-cols-2  p-2 sm:gap-4 gap-1 w-full">
          {user && user.Role.name === 'seller' ? (
            <>
              <ShortCard
                imagelink="/wishdash.png"
                name="Total whishers"
                number={data?.wishesStats}
                bgcolor="bg-pink-400"
                numbercolor="text-black"
                namecolor="text-black"
              />
              <ShortCard
                imagelink="/orderdash.png"
                name="Expired product"
                number={`${data?.expiredProducts}`}
                bgcolor="bg-green-400"
                numbercolor="text-black"
                namecolor="text-black"
              />

              <ShortCard
                imagelink="/dash1.png"
                name="available Products"
                number={data?.availableProducts}
                bgcolor="bg-gray-400"
                numbercolor="text-black"
                namecolor="text-black"
              />
              <ShortCard
                imagelink="/dash2.png"
                name="stockLevel Stats"
                number={data?.stockLevelStats}
                bgcolor="bg-blue-400"
                numbercolor="text-black"
                namecolor="text-black"
              />
            </>
          ) : (
            <>
              <ShortCard
                imagelink="/wishdash.png"
                name="Categories Available "
                number={`${categories?.length}`}
                bgcolor="bg-pink-400"
                numbercolor="text-black"
                namecolor="text-black"
              />
              <ShortCard
                imagelink="/dash2.png"
                name="All users"
                number={`${users?.length}`}
                bgcolor="bg-blue-400"
                numbercolor="text-black"
                namecolor="text-black"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerSummary;
