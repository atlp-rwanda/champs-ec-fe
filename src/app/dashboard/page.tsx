'use client';
import React, { useEffect, useState } from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import SellerSummary from '@/components/SellerSummary';
import Chartssection from '@/components/chartssection';
import request from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import LayoutDashboard from '@/components/LayoutDashboard';

function Page() {
  const [categories, setcategoris] = useState([]);
  const [users, setUsers] = useState<any>();
  const [user, setUser] = useState<any>();

  const { data, isLoading, error } = useQuery<any>({
    queryKey: ['data'],
    queryFn: async () => {
      noStore();
      let data;
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
  
      const response: any = await request.get(`/stats?start=2023-02-06&end=${formattedDate}`);
      data = response.data;
      console.log("............", data);
      console.log("statics are recorded properly here ...........................");
      return data;
    },
  });
  

  useEffect(() => {
    const categ = async () => {
      const responsecat: any = await request.get('/categories');
      const user = localStorage.getItem('profile') || 'no';
      const finalUser = JSON.parse(user);
      setUser(finalUser.User);
      if (finalUser.User.Role.name === 'admin') {
        const responseUsers: any = await request.get('/users');
        setUsers(responseUsers.users);
      }
      setcategoris(responsecat.categories);
    };
    categ();
  }, []);

  return (
    <LayoutDashboard pageName="Dashboard" isLoading={isLoading}>
      <SellerSummary
        user={user}
        data={data}
        categories={categories}
        users={users}
      />
      <Chartssection
        user={user}
        data={data}
        categories={categories}
        users={users}
      />
    </LayoutDashboard>
  );
}

export default Page;
