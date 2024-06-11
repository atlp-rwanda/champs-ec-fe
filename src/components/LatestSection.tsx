import React, { useState, useEffect, useRef } from 'react';
import { LatestData } from '@/utils/LatestData';
import LatestCard from '@/components/LatestCard';

export const LatestSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  ///SCROLL CONTROLLER
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className="flex justify-center items-center flex-col mt-10 w-full">
      <div className="container mb-10 ">
        <h1 className="font-semibold text-2xl sm:ml-[-30px] pb-3">
          All Categories
        </h1>
        <div
          ref={scrollContainerRef}
          className=" flex sm:ml-20 overflow-x-auto space-x-1 hide-scrollbar"
        >
          {LatestData &&
            LatestData.map((el, i) => (
              <LatestCard
                imagelink={el.imagelink}
                name={el.name}
                price={el.price}
                sellername={el.sellername}
                color={el.color}
                key={i.toString()}
              />
            ))}
        </div>
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
