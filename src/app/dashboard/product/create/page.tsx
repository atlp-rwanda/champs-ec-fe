'use client';
import React, { useEffect, useState } from 'react';
import request from '@/utils/axios';
import ProductPopup from '@/components/Product/AddProducts';
import { useRouter } from 'next/navigation';
import LayoutDashboard from '@/components/LayoutDashboard';

function page() {
  const [user, setUser] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    const categ = async () => {
      const responsecat = await request.get('/categories');
      const user = localStorage.getItem('profile') || 'no';
      const finalUser = JSON.parse(user);

      setUser(finalUser.User);
      if (finalUser?.User?.Role.name !== 'seller') {
        router.push('/dashboard/home');
      }
    };
    categ();
  }, []);

  return (
    <LayoutDashboard pageName="Create Product" isLoading={!user ? true : false}>
      <ProductPopup isOpen={true} onClose={() => console.log('nothing')} />;
    </LayoutDashboard>
  );
}

export default page;
