'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SellerOrderList from '@/components/sellerOrder';
import LayoutDashboard from '@/components/LayoutDashboard';
function page() {
  const [user, setUser] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    const categ = async () => {
      const user: any = localStorage.getItem('profile');
      const finalUser = JSON.parse(user);

      setUser(finalUser.User);
    };
    categ();
  }, []);

  return (
    <LayoutDashboard pageName="Orders Page" isLoading={!user ? true : false}>
      <SellerOrderList />
    </LayoutDashboard>
  );
}

export default page;
