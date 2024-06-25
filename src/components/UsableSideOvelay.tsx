'use client';
import React, { useEffect } from 'react';
interface Properties {
  handleOpenOverlay?: () => void;
  children: React.ReactNode;
  width?: string;
}
const SideBarOverlay: React.FC<Properties> = ({
  handleOpenOverlay,
  children,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="w-full flex justify-end absolute h-screen top-0  z-20"
      onClick={handleOpenOverlay}
    >
      <div
        id="slideover-bg"
        className={`w-full h-full duration-500 ease-out transition-all absolute bg-gray-900 opacity-50`}
      ></div>

      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        id="slideover"
        className={`w-full md:w-3/4 lg:w-3/5 xl:w-2/5 bg-[#F6F6F6] h-full absolute mt-[00px] right-0 py-10 duration-300 ease-out transition-all overflow-y-auto`}
      >
        <div className="absolute w-full  cursor-pointer text-gray-600 sm:mt-[150px] mt-[50px] flex  flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SideBarOverlay;
