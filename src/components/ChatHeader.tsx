import React from 'react';
import Image from 'next/image';
import { Seller } from '@/types/Product';
import { IoIosArrowBack } from 'react-icons/io';

interface chatHeader {
  firstName: string;
  lastName: string;
  profileImage: string;
  toogleDislay: () => void;
}

const ChatHeader: React.FC<chatHeader> = ({
  firstName,
  lastName,
  profileImage,
  toogleDislay,
}) => {
  let fullName = firstName + ' ' + lastName;
  return (
    <>
      <div className="double-grid border-b">
        <div className="flex justify-center items-center">
          <span className="text-[25px]" onClick={toogleDislay}>
            <IoIosArrowBack />
          </span>
          <Image
            src={profileImage}
            width={50}
            height={50}
            alt="avatar"
            className="rounded-full relative"
          />
        </div>
        <div className="flex flex-col text-left py-3 px-5">
          <h3 className="text-xl font-bold text-blue-400">
            {fullName.length > 30
              ? fullName.substring(0, 30) + '...'
              : fullName}
          </h3>
          <p className="text-gray-500 text-[12px]">last Active</p>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
