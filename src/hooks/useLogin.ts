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
  const [isOpen, setIsOpen] = useState(false);
  const URL = process.env.URL;
  const router = useRouter();
  const HandleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      ('use server');
      const res = await axios.post(`${URL}/users/login`, {
        email,
        password,
      });
      if (res.status == 201) {
        setLoading(false);

        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('token', res.data.otpToken);
        HandleSellerLogin();
        setErrorMessage('THIS IS A SELLER'); //Here logic for two factor authentication
        return;
      }

      localStorage.setItem('token', res.data.token);
      await router.push('/');
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(`Invalid Email or Password`);
      return;
    }
  };

  const Login = async (data: loginField) => {
    HandleLogin(data.email, data.password);
  };

  const HandleSellerLogin = async () => {
    try {
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    errorMessage,
    Login,
    setErrorMessage,
    loading,
    isOpen,
  };
}

export default useLogin;
