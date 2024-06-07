'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const GoogleAuthPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') || null;

  useEffect(() => {
    if (token != null) {
      localStorage.setItem('token', `Bearer ${token}`);
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

const SuspendedGoogleAuthPage: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <GoogleAuthPage />
  </Suspense>
);

export default SuspendedGoogleAuthPage;
