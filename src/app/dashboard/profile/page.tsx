'use client';
import React, { useEffect, useState } from 'react';
import LayoutDashboard from '@/components/LayoutDashboard';
import About from '@/components/profile/About';
import Order from '@/components/profile/Order';
import ProfileHeader from '@/components/profile/ProfileHeader';
import Wishlist from '@/components/profile/wishlist';

function page() {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const categ = async () => {
      const user: any = localStorage.getItem('profile');
      const finalUser = await JSON.parse(user);

      setUser(finalUser?.User);
    };
    categ();
  }, []);

  return (
    <LayoutDashboard pageName="Profile Page" isLoading={!user ? true : false}>
      <ProfileHeader />
      <div className="w-full max-w-7xl px-4 mt-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <About />
          </div>
          <div className="md:col-span-2 mb-4">
            <Wishlist />
          </div>
          <div className="md:col-span-1 flex flex-col gap-4 mb-4">
            <Order />
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}

export default page;
