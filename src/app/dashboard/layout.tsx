'use client';
import React, { ReactNode } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAppSelector } from '@/redux/store';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // const { loading, data } = useAppSelector((state) => state.profile);
  // const role = data?.Role?.name as string;
  // console.log(data);
  // if (data?.Role?.name !== 'seller') {
  //   console.log('Unauthorised');
  // }
  return (
    <html>
      <body>
        <div className="flex">
          <div className="z-50">
            <DashboardSidebar role="role" />
          </div>
          <div className="w-full z-1 p-0 sm:p-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
