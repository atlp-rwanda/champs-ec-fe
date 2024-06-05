'use client';
import React, { useEffect } from 'react';
interface Properties {
  handleShowModel?: () => void;
  children: React.ReactNode;
  width?: string;
}
const GlobarPopUp: React.FC<Properties> = ({
  handleShowModel,
  children,
  width,
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div
      className="w-full flex justify-center items-center absolute h-screen top-0 backdrop-filter backdrop-brightness-75 backdrop-blur-md"
      onClick={handleShowModel}
    >
      <div
        className={`${width ? width : 'sm:w-[30%]'} min-w-[300px] sm:min-h-[300px] bg-white rounded-sm p-5`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default GlobarPopUp;
