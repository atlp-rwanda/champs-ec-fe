'use client';
import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
interface Properties {
  name?: string;
  handle?: () => void;
  loading?: boolean;
  isDisabled?: boolean;
  rotate?: boolean;
  background?: string;
  border?: string;
  btnColor?: string;
  className?: string;
}

export const Button: React.FC<Properties> = ({
  name,
  handle,
  loading,
  isDisabled,
  rotate,
  background,
  btnColor,
}) => {
  const buttonClassName = ` relative min-h-[40px] min-w-[100%] bg-${background ? background : 'primaryBlue'}-600 ${btnColor ? btnColor : ''} text-white p-1.5 px-8 border rounded-b-sm rounded-s-sm hover:bg-${background ? background : 'primaryBlue'}-700`;
  return (
    <div>
      <button
        className="bg-blue-600 min-h-[40px] w-full max-w-[100%] text-white px-10 rounded-s-sm hover:bg-blue-700 relative"
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

export const BackButton: React.FC<Properties> = ({
  handle,
  isDisabled,
  rotate,
}) => {
  return (
    <>
      <button
        onClick={handle}
        disabled={isDisabled}
        className="rounded-[40px] w-[30px] h-[30px] bg-primaryBlue text-white flex justify-center items-center text-[20px]"
      >
        <IoChevronBack className={rotate ? 'rotate-180' : ''} />
      </button>
    </>
  );
};

export const CloseButton: React.FC<Properties> = ({
  handle,
  isDisabled,
  rotate,
}) => {
  return (
    <>
      <button
        onClick={handle}
        disabled={isDisabled}
        className="rounded-[40px] w-[30px] h-[30px]  flex justify-center items-center text-[30px] float-right"
      >
        <IoMdClose />
      </button>
    </>
  );
};

export const DisableButton: React.FC<Properties> = ({
  name,
  handle,
  loading,
  border,
  btnColor,
}) => {
  return (
    <div>
      <button
        className={`relative min-h-[40px] w-[100%] bg-white hover:text-white  text-[15px] p-1.5 px-8  border-2 border-${border} rounded-b-sm rounded-s-sm hover:bg-${border}-500 hover:text-white`}
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
export const ReviewButton: React.FC<Properties> = ({
  name,
  handle,
  loading,
  border,
  btnColor,
  className,
}) => {
  return (
    <div>
      <button className={className} onClick={handle}>
        {!loading && name}
        {loading && (
          <div className="border-t-4 border-b-4 border-white rounded-full w-6 h-6 animate-spin m-auto"></div>
        )}
      </button>
    </div>
  );
};
export const BlueBorderButton: React.FC<Properties> = ({
  name,
  handle,
  loading,
  border,
  btnColor,
  className,
}) => {
  return (
    <div>
      <button className={className} onClick={handle}>
        {!loading && name}
        {loading && (
          <div className="border-t-4 border-b-4 border-white rounded-full w-6 h-6 animate-spin m-auto"></div>
        )}
      </button>
    </div>
  );
};
export const DeleteButton: React.FC<Properties> = ({
  name,
  handle,
  loading,
}) => {
  return (
    <div>
      <button
        className="bg-red-500 min-h-[40px] w-full max-w-[100%] text-white px-10 rounded-s-sm hover:bg-white hover:text-red-500 hover:border border-red-500 relative"
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

export const GreenButton: React.FC<Properties> = ({
  name,
  handle,
  loading,
}) => {
  return (
    <div>
      <button
        className="bg-green-600 min-h-[40px] w-full max-w-[100%] text-white px-10 rounded-s-sm hover:bg-green-700 relative"
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
