'use client';
import React from 'react';
import ShortCard from '@/components/shortCard';

interface Params {
  user: any;
  data: any;
  categories: any;
  users: [];
}

const SellerSummary: React.FC<Params> = ({ user, data, categories, users }) => {
  const calculatePercentage = (part: number, total: number) => {
    return total > 0 ? Math.round((part / total) * 100) : 0;
  };

  const totalProducts = data?.productsStats || 0;
  const availablePercentage = calculatePercentage(data?.availableProducts || 0, totalProducts);
  const expiredPercentage = calculatePercentage(data?.expiredProducts || 0, totalProducts);
  const wishedPercentage = calculatePercentage(data?.wishesStats || 0, totalProducts);

  return (
    <div className="flex justify-between border-[1px] p-5 sm:w-[80%] w-[90%]">
      <div className="flex flex-col p-3 w-full">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="font-semibold">Today Summary</h1>
            <p className="pl-2">seller summary</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-4 grid-cols-2 p-2 sm:gap-4 gap-1 w-full">
          {user && user.Role.name === 'seller' ? (
            <>
              <ShortCard
                imagelink="/dash2.png"
                name="Total Products"
                number={totalProducts}
                bgcolor="bg-blue-400"
                numbercolor="text-black"
                namecolor="text-black"
              />
              <ShortCard
                imagelink="/dash1.png"
                name="Available Products"
                number={`${availablePercentage}% (${data?.availableProducts})`}
                bgcolor="bg-gray-400"
                numbercolor="text-black"
                namecolor="text-black"
              />
              <ShortCard
                imagelink="/wishdash.png"
                name="Wished Products"
                number={`${wishedPercentage}% (${data?.wishesStats})`}
                bgcolor="bg-pink-400"
                numbercolor="text-black"
                namecolor="text-black"
              />
              <ShortCard
                imagelink="/orderdash.png"
                name="Expired Products"
                number={`${expiredPercentage}% (${data?.expiredProducts})`}
                bgcolor="bg-green-400"
                numbercolor="text-black"
                namecolor="text-black"
              />
            </>
          ) : (
            <>
              <ShortCard
                imagelink="/wishdash.png"
                name="Categories Available"
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