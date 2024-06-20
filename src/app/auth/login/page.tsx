'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import Button from '@/components/Button';
import InputBox from '@/components/InputBox';
import loginValidation from '@/validations/LoginValidation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useLogin from '@/hooks/useLogin';
import OtpVerify from '@/components/2faVerification';
import GoogleButton from '@/components/GoogleButton';
import { useRouter } from 'next/navigation';

type loginField = z.infer<typeof loginValidation>;

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, []);
  // show try anoter method
  const { Login, errorMessage, setErrorMessage, loading, isOpen } = useLogin();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<loginField>({
    resolver: zodResolver(loginValidation),
  });

  const onSubmit: SubmitHandler<loginField> = (data) => {
    setErrorMessage('');
    Login(data);
  };

  return (
    <>
      <main
        className="h-screen w-screen  bg-no-repeat bg-cover flex justify-center items-center  flex-col "
        style={{
          backgroundImage: "url('/Background.png')",
        }}
      >
        <div className="max-w-[200px] justify-center items-center mb-5 ">
          <h1 className="text-white text-[16px] font-bold text-center">
            Welcome!
          </h1>
          <p className="text-[9px] text-center text-white font-light h-10 mt-3">
            Use these awesome forms to login or create new account in your
            project for free.
          </p>
        </div>
        <div className="sm:w-[90%] sm:max-w-[350px] w-[90%] p-4  shadow-lg bg-white pb-10">
          <div className="w-[100%] justify-center flex flex-col gap-1 items-center mt-6">
            <h1 className="text-blue-500 font-medium mb-3">Log In with</h1>
            <GoogleButton />
            <h1 className="text-black text-[10px] mt-2">OR</h1>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 mt-4 ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[90%] flex items-center flex-col"
            >
              <InputBox
                nameuse="Email"
                type="text"
                placeholder="Enter Email"
                {...register('email')}
                error={errors.email?.message as string}
              />
              <InputBox
                nameuse="Password"
                type="password"
                placeholder="Enter Password"
                {...register('password')}
                error={errors.password?.message as string}
              />
              <div className=" gap-2 w-[100%]">
                <h1 className="font-medium text-warningRed text-[13px] w-[100%]">
                  {errorMessage}
                </h1>
              </div>
              <div className="w-[100%] mt-5">
                <Button name="Log in" loading={loading} />
              </div>
            </form>
            <div className="w-[90%] mt-3">
              <div className="w-[100%] flex  items-center justify-between mt-5">
                <Link
                  href="/auth/forgotpassword"
                  className="text-[13px] mb-4 text-blue-500"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="w-[100%] flex justify-left items-center gap-2">
                <p className="text-[13px] mb-0">Do you have an account? </p>
                <Link
                  href="/auth/signup"
                  className="text-blue-500 text-[13px] font-medium hover:text-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <OtpVerify isOpen={isOpen} />
    </>
  );
}
