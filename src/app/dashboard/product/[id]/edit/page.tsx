'use client';
import React, { useEffect, useState } from 'react';
import request from '@/utils/axios';
import ProductPopup from '@/components/Product/editProduct';
import { useRouter, useParams } from 'next/navigation';
import LayoutDashboard from '@/components/LayoutDashboard';
import axios, { AxiosResponse } from 'axios';

function page() {
  const [user, setUser] = useState<any>();
  const [product, setProduct] = useState();
  const router = useRouter();
  const { id } = useParams();

  const productId: any = id;

  useEffect(() => {
    const categ = async () => {
      const responsecat: any = await request.get(`/products/${productId}`);
      const user = localStorage.getItem('profile') || 'no';
      const finalUser = JSON.parse(user);
      setProduct(responsecat.product);

      setUser(finalUser.User);
      if (finalUser?.User?.Role.name !== 'seller') {
        router.push('/dashboard');
      }
    };
    categ();
  }, []);

  return (
    <LayoutDashboard pageName="Update Product" isLoading={!user ? true : false}>
      <ProductPopup
        product={product}
        isOpen={true}
        onClose={() => console.log('nothing')}
      />
      ;
    </LayoutDashboard>
  );
}

export default page;
