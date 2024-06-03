'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Button from './Button';

interface Properties {
  topText: string;
  bodyText: string;
  testid?: string;
  iconImagelink: string;
  handleShowModal?: () => void;
  handleButton?: () => void;
}
const PopUpModels: React.FC<Properties> = ({
  handleButton,
  handleShowModal,
  topText,
  bodyText,
  iconImagelink,
  testid,
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="w-full flex justify-center  items-center absolute h-screen top-0 backdrop-filter backdrop-brightness-75 backdrop-blur-md"
      onClick={handleShowModal}
    >
      <div
        className="sm:w-[30%] h-[40%] w-[90%] min-w-[300px] sm:min-h-[300px]  bg-white rounded-sm p-5 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center mb-6">
          <img
            src={iconImagelink}
            alt="icons"
            className=""
            width={50}
            height={50}
          />
        </div>
        <div className="flex justify-center items-center flex-col gap-2">
          <h1 className="font-bold text-blue-900">{topText}</h1>
          <p
            className="mb-6 text-blue-600 text-[13px] text-center px-9"
            data-testid={testid}
          >
            {bodyText}
          </p>
          <Button name="Continue >>" handle={handleButton} background='blue'/>
        </div>
      </div>
    </div>
  );
};
export default PopUpModels;
