import React, { useState, useEffect, useRef } from 'react';
import LatestCard from '@/components/LatestCard';
import Link from 'next/link';
import request from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { unstable_noStore as noStore } from 'next/cache';

export const LatestSection = () => {
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ['products'],
    queryFn: async () => {
      noStore();
      const response: any = await request.get('/products?page=1&limit=8');
      let data;
      if (response.products) {
        data = response.products;
        return data;
      } else if (response.data) {
        const allProduct: any = await request.get(`/products`);
        const filterdeArray = allProduct.products.filter((el1: any) =>
          response.data.some((el: any) => el1.id === el.product.id),
        );
        data = filterdeArray;
      }
      console.log(response.data);
      return data;
    },
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  ///SCROLL CONTROLLER
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -350,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 350,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex justify-center items-center flex-col mt-10 w-full sm:pl-0 px-3">
      <div className="container mb-10 ">
        <h1 className="font-semibold text-2xl sm:ml-[-30px] pb-3">
          Latest Product
        </h1>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div
            ref={scrollContainerRef}
            className=" flex sm:ml-20 overflow-x-auto space-x-1 sm:gap-2 gap-5 hide-scrollbar overflow-hidden"
          >
            {data &&
              data.map((el: any, i: number) => (
                <Link href={`/products/${el.id}`}>
                  <LatestCard
                    imagelink={el.productThumbnail}
                    name={el.productName}
                    price={el.productPrice}
                    sellername={el.sellername}
                    color={el.color}
                    key={i.toString()}
                  />
                </Link>
              ))}
          </div>
        )}
        <div className="flex gap-5 justify-end mt-5 mr-0">
          <div
            onClick={scrollLeft}
            className="text-blue-600 border-2 border-black/40 bg-white px-4 hover:bg-blue-600 hover:text-white hover:cursor-pointer active:bg-blue-300 hover:border-white"
          >
            ⮜
          </div>
          <div
            onClick={scrollRight}
            className="text-blue-600 border-2 border-black/40 bg-white px-4 hover:bg-blue-600 hover:text-white hover:cursor-pointer active:bg-blue-300 hover:border-white"
          >
            ⮞
          </div>
        </div>
      </div>
    </div>
  );
};
