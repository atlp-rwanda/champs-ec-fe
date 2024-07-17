'use client';
import passwordValidation from '@/validations/ResetValidation';
// import passwordValidation from '@/validations/resetValidation';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

import { useState } from 'react';
import { z } from 'zod';

type FormField = z.infer<typeof passwordValidation>;
const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const URL = process.env.URL;
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const handlemoduleButton = () => {
    router.push('/auth/login');
    setSuccess(false);
  };

  const HandleReset = async (password: string, confirmPassword: string) => {
    setLoading(true);

    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    console.log(password, confirmPassword);
    try {
      ('use server');
      const response = await axios.patch(
        `${process.env.URL}/users/reset-password/${token}`,
        {
          newPassword: password,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response) {
        console.log('RESPONSE', response);
        setLoading(false);
        setSuccess(true);
      }
    } catch (error: any) {
      console.log('Error', error);
      setLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setErrorMessage('An error occurred while resetting the password.');
      }
      setErrorMessage('Invalid Email');
      return;
    }
  };
  const sendPassword = async (password: string, confirmPassword: string) => {
    HandleReset(password, confirmPassword);
  };

  return {
    errorMessage,
    setErrorMessage,
    loading,
    sendPassword,
    HandleReset,
    success,
    handlemoduleButton,
  };
};
export default ResetPassword;
