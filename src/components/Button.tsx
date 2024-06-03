'use client';
import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { IoCloseCircleSharp } from "react-icons/io5"
interface Properties {
  name?: string;
  handle?: () => void;
  loading?: boolean;
  isDisabled?: boolean;
  rotate?: boolean;
  background?: string;
  border?: string;
  btnColor?:string;
}

const Button: React.FC<Properties> = ({ name, handle, loading, isDisabled, rotate, background, btnColor }) => {
  const buttonClassName = ` relative min-h-[40px] w-[100%] bg-${background?background:'primaryBlue'}-600 ${btnColor? btnColor : ''} text-white p-1.5 px-8 border rounded-b-sm rounded-s-sm hover:bg-${background?background:'primaryBlue'}-700`
  return (
    <div>
      <button
        className={buttonClassName } onClick={handle}
        style={{background:background?background:'primaryBlue'}}
      >
        {!loading && name}
        {loading && (
          <div className="border-t-4 border-b-4 border-white rounded-full w-6 h-6 animate-spin m-auto"></div>
        )}
      </button>
    </div>
  );
};

export const BackButton: React.FC<Properties> = ({ handle, isDisabled, rotate }) => {
  return (
    <>
      <button onClick={handle} disabled={isDisabled} className='rounded-[40px] w-[30px] h-[30px] bg-primaryBlue text-white flex justify-center items-center text-[20px]'>
        <IoChevronBack className={rotate ? "rotate-180" : ""} />
      </button>
    </>
  )
}

export const CloseButton: React.FC<Properties> = ({ handle, isDisabled, rotate }) => {
  return (
    <>
      <button onClick={handle} disabled={isDisabled} className='rounded-[40px] w-[30px] h-[30px]  flex justify-center items-center text-[30px] float-right'>
        <IoCloseCircleSharp />
      </button>
    </>
  )
}

export const DisableButton: React.FC<Properties> = ({ name, handle, loading, border, btnColor}) => {
  return (
    <div>
      <button
        className={`relative min-h-[40px] w-[100%] bg-white text-${border}  text-[15px] p-1.5 px-8  border-2 border-${border} rounded-b-sm rounded-s-sm hover:bg-${border}-500` }
        onClick={handle}
      >
        {!loading && name}
        {loading && (
          <div className="border-t-4 border-b-4 border-white rounded-full w-6 h-6 animate-spin m-auto"></div>
        )}
      </button>
    </div>
  );
};
export default Button;
