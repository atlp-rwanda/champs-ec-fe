'use client';
import React from 'react';
import { CiBellOn } from 'react-icons/ci';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useQuery } from '@tanstack/react-query';
import request from '@/utils/axios';

interface HeaderInterface {
  pageName: string;
}

interface userData {
  firstName: string;
  profileImage: string;
  Role: {
    name: string;
  };
}

const DashboardHeader: React.FC<HeaderInterface> = ({ pageName }) => {
  const { isLoading, error, data } = useQuery<any>({
    queryKey: ['userProfile'],
    queryFn: () => request.get('/users/profile'),
  });

  const user = data?.User as userData;

  return (
    <div className="w-full sticky top-0 z-50 backdrop-filter backdrop-blur-sm flex justify-between items-center p-5 text-textBlack sm:bg-white bg-primaryBlue">
      <h1 className="sm:text-[36px] text-[20px] font-bold hidden sm:block">
        {pageName}
      </h1>
      <img src="/logo.png" alt="Logo" className="block sm:hidden" />
      <div className="flex gap-4 items-center px-2 sm:px-10 justify-center">
        <div className="bg-primaryGrey w-[50px] h-[30px] sm:h-[10%] flex items-center justify-center border border-transparent rounded-[10px] text-primaryBlue">
          <CiBellOn className="text-[30px] sm:text-[40px]" />
        </div>
        <div className="flex gap-2 w-auto">
          <img
            src={user?.profileImage || '/unknown.jpg'}
            alt="Logo"
            onError={(e) => {
              e.currentTarget.src = '/unknown.jpg';
            }}
            className="cursor-pointer rounded-[10px] w-[40px] sm:w-[60px] h-[40px] sm:h-[60px]"
          />
          <div className="flex flex-col justify-center hidden sm:block">
            <h1 className="font-bold text-[15px] sm:text-[24px] uppercase">
              {user?.firstName || 'username'}
            </h1>
            <h2 className="text-secondaryGrey capitalize">
              {user?.Role?.name || 'Role'}
            </h2>
          </div>
          <GiHamburgerMenu className="block sm:hidden text-[40px] text-white" />
        </div>
      </div>
    </div>
  );
};
export default DashboardHeader;
