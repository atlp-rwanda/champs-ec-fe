// src/hooks/usePayments.ts
import { useState } from 'react';

import request from '@/utils/axios';
import { useRouter } from 'next/navigation';
export const usePayments = () => {

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const router = useRouter();

  const handlePayment = async () => {
  

    try {
      const res: any = await request.post(`/payments`, {});

      router.push(`${res.paymenturl}`);

    } catch (error: any) {
      console.log('error', error);
   
      setError(error.response.data.error);
    }
  };

  return {
    handlePayment,
    success,
    loading,

    error,
  };
};
