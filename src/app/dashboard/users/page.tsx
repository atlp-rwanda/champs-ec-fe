'use client';
import React, { use, useEffect, useState } from 'react';
import DashNavbar from '@/components/DashNavbar';
import HeaderDash from '@/components/headerDash';
import UsersPageAdmin from '@/components/UsersAdmin';
import LayoutDashboard from '@/components/LayoutDashboard';

function page() {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const categ = async () => {
      const user = localStorage.getItem('profile') || '';
      const finalUser = JSON.parse(user);

      setUser(finalUser?.User);
      console.log(finalUser);
    };
    categ();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen w-full justify-center items-center flex">
        <div className="border-t-4 border-b-4 border-blue-600 rounded-full w-20 h-20 animate-spin m-auto"></div>
      </div>
    );
  }
  return (
    <LayoutDashboard pageName="Dashboard" isLoading={!user ? true : false}>
      <UsersPageAdmin />
    </LayoutDashboard>
  );
}

export default page;
