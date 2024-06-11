import React from 'react';
import CountdownTimer from '@/components/ContDown';

export const HomeAds = () => {
  return (
    <div className="w-full sm:flex sm:justify-center sm:items-center sm:flex-col mt-10 ">
      <div
        className="w-full min-h-[100px] sm:w-[90%] relative max-w-[1620px] mt-10 shadow-md  bg-no-repeat bg-cover "
        style={{
          backgroundImage: `url("Grouped.png")`,
        }}
      >
        <div className=" sm:mt-20 mb-10  sm:flex sm:gap-[40%]  items-center content-center w-100">
          <div className="sm:ml-10 ml-2  mt-">
            <p className="text-green-400 hidden sm:block md:block ">
              Special Offer
            </p>
            <h1 className="font-bold sm:text-4xl text-xsm sm:mt-0  text-white mt-10">
              BLACK FRIDAY
            </h1>
          </div>
          <div className="sm:ml-0 ml-2">
            <h1 className="font-bold sm:text-2xl hidden sm:block md:block  text-white">
              Time Remain 🕝
            </h1>
            <CountdownTimer initialSeconds={300000} />
          </div>
        </div>
      </div>
    </div>
  );
};
