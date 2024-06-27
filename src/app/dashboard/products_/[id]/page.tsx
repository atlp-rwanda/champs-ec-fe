// BuyerProductView
'use client';
import React, { useEffect, useState } from 'react';
import Singleproduct from '@/components/singleproduct';
import LayoutDashboard from '@/components/LayoutDashboard';

function Page() {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const categ = async () => {
      const user = localStorage.getItem('profile') || 'no';
      const finalUser = JSON.parse(user);
      setUser(finalUser.User);
    };
    categ();
  }, []);

  return (
    <LayoutDashboard
      pageName="Single Product Page"
      isLoading={!user ? true : false}
    >
      <Singleproduct role={user?.Role?.name} />
    </LayoutDashboard>
  );
}

export default Page;
