'use client';
import React, { useEffect } from 'react';

interface Properties {
  handleShowModal: () => void;
  bodyContent: React.ReactNode;
}
const PopUpModel: React.FC<Properties> = ({ handleShowModal, bodyContent }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="w-full flex justify-center items-center absolute h-screen top-0 backdrop-filter backdrop-brightness-75 backdrop-blur-md"
      onClick={handleShowModal}
    >
      <div
        className="sm:w-[30%] h-[40%] w-[90%] min-w-[300px] sm:min-h-[300px] bg-white rounded-sm p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center flex-col gap-2">
          {bodyContent}
        </div>
      </div>
    </div>
  );
};

export default PopUpModel;
