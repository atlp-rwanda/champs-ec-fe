'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import resetValidation from '@/validations/RecoverValidation';
import { z } from 'zod';

type FormField = z.infer<typeof resetValidation>;

function recover() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const URL = process.env.NEXT_PUBLIC_URL;
  const router = useRouter();

  const handlemoduleButton = () => {
    router.push('/');
   setSuccess(false);
 };

   const recoverAccount = async (email: string) => {
    setLoading(true);


    try {
      
      const res = await axios.post(`${URL}/users/reset-password`, { email});

   
      if (res.status) {
        setLoading(false);
        setSuccess(true)
  
      }
      localStorage.setItem('email', email);
      return;
    } catch (error: any) {
      setLoading(false);
      setSuccess(true)
      setErrorMessage('Invalid Email');
      return;
    }
  };

  const sendEmail = async (data: FormField) => {
    recoverAccount(data.email);
  };

  return {
    errorMessage,
    sendEmail,
    setErrorMessage,
    loading,
    success,
    handlemoduleButton,
    recoverAccount
  };
}

export default recover;
