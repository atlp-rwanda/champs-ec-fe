'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import loginValidation from '@/validations/LoginValidation';
import { z } from 'zod';

type loginField = z.infer<typeof loginValidation>;
function useLogin() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const URL = process.env.NEXT_PUBLIC_URL;
  const router = useRouter();
  const HandleLogin = async (userEmail: string, userPasswd: string) => {
    setLoading(true);
    try {
      const res = await axios.post(`${URL}/users/login`, {
        email: userEmail,
        password: userPasswd,
      });
      if (res.status == 201) {
        setLoading(false);
        setErrorMessage('THIS IS A SELLER'); //Here logic for two factor authentication
        return;
      }
      localStorage.setItem('token', res.data.token);
      await router.push('/');
    } catch (error: any) {
      setLoading(false);
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
        return;
      }
      setErrorMessage(error.response.data.error);
    }
  };
  const Login = async (data: loginField) => {
    try {
      HandleLogin(data.email, data.password);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    errorMessage,
    Login,
    setErrorMessage,
    loading,
  };
}
export default useLogin;
