import React from 'react';

export const Skeleton = () => {
  return (
    <>
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export const SkeletonProduct = () => {
  const productCards = Array(20).fill(null);

  return (
    <div className="w-full h-[50%] flex">
      <div className="left-0 top-40">
        <SideSkeleton />
      </div>
      <div className="w-3/4 flex flex-col animate-pulse">
        <div className="flex justify-end">
          <div className="w-45 h-5 bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="w-full h-full">
          <ul className="h-full flex flex-col justify-evenly flex-wrap items-center animate-pulse">
            <div className="w-full flex justify-evenly gap-2">
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
            </div>
            <div className="w-full flex justify-evenly gap-2">
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
            </div>
            <div className="w-full flex justify-evenly gap-2">
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
            </div>
            <div className="w-full flex justify-evenly gap-2">
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
              <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2 h-20"></li>
            </div>
          </ul>
        </div>
        <div className="bg-gray-200 rounded-md dark:bg-gray-700 w-96 mb-2 h-10 flex justify-center self-center mt-10"></div>
      </div>
    </div>
  );
};

export const SideSkeleton = () => {
  return (
    <>
      <div className="h-full flex flex-col justify-center items-center animate-pulse">
        
        <div className="w-full max-w-sm borderflex-col items-center justify-center px-5">
          <h2 className="bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></h2>
          
         
          <div className="flex flex-col gap-2">
            <h3 className="bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></h3>
          
          </div>
        </div>
      </div>
    </>
  );
};
