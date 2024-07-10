'use client';
import React, { useEffect, useState } from 'react';
import LayoutDashboard from '@/components/LayoutDashboard';
import UserProfileForm from '@/components/EditProfile';

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
    <LayoutDashboard
      pageName="Edit Profile Page"
      isLoading={!user ? true : false}
    >
      <UserProfileForm />
    </LayoutDashboard>
  );
}

export default page;
