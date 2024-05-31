'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('access_token', token);
      router.push('/');
    } else {
      router.push('/auth/login');
    }
  }, [token, router]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="bg-primaryBlue/10 w-20 h-20 rounded-md shadow-sm animate-spin"></div>
    </div>
  );
};

export default Page;
