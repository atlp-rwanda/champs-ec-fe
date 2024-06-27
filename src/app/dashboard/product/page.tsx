'use client';
import React, { useEffect, useState } from 'react';
import ProductsTable from '@/components/Table';
import { useRouter } from 'next/navigation';
import LayoutDashboard from '@/components/LayoutDashboard';

function page() {
  const [user, setUser] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    const categ = async () => {
      const user = localStorage.getItem('profile') || 'no';
      const finalUser = JSON.parse(user);

      setUser(finalUser.User);
    };
    categ();
  }, []);


  return (
    <LayoutDashboard pageName="Product Page" isLoading={!user ? true : false}>
      <ProductsTable Role={user?.Role?.name} />
    </LayoutDashboard>
  );
}

export default page;
