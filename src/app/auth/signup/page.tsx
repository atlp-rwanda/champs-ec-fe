'use client';
import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputBox from '@/components/InputBox';
import Button from '@/components/Button';
import PopUpModels from '@/components/PopUpModels';
import useSignup from '@/hooks/useSignup';
import { signUpVAlidation } from '@/validations/validationSchema';
import GoogleButton from '@/components/GoogleButton';

const Signup = () => {
  const {
    submit,
    handleShowModal,
    handlemoduleButton,
    error,
    showModal,
    setError,
    loading,
  } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: zodResolver(signUpVAlidation),
  });

  const onSubmit = (data: FormData) => {
    setError('');
    submit(data);
  };
  return (
    <>
      <main
        className="  cover bg-no-repeat bg-cover  pt-10 flex justify-center items-center  flex-col "
        style={{
          backgroundImage: "url('/Background.png')",
        }}
      >
        <div className="max-w-[200px] justify-center items-center ">
          <h1 className="text-white text-[16px] font-bold text-center">
            Welcome!
          </h1>
          <p className="text-[9px] text-center text-white font-light h-10 mt-3">
            Use these awesome forms to login or create new account in your
            project for free.
          </p>
        </div>
        <div className="sm:w-[90%] sm:max-w-[350px]   w-[90%] h-[80%] p-4  shadow-lg bg-white sm:h-[80%] min-h-[590px]">
          {/* Top section of name and google */}
          <div className="w-[100%] h-fit justify-center flex flex-col gap-1 items-center mt-6">
            <h1 className="text-blue-500 font-medium mb-3">Sign Up with</h1>
            <GoogleButton />
            <h1 className="text-black text-[10px] mt-2">Or</h1>
          </div>
          {/* Form section */}
          <div className="flex flex-col justify-center items-center gap-1 mt-4 ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              action=""
              className="w-[90%] flex items-center flex-col"
            >
              <div className="flex justify-between gap-2">
                <InputBox
                  data-testid="fname"
                  nameuse="First Name"
                  type="text"
                  placeholder="Enter First Name"
                  {...register('firstName')}
                  error={errors.firstName?.message as string}
                />
                <InputBox
                data-testid="lname"
                  nameuse="Last Name"
                  // name="lasttName"
                  type="text"
                  placeholder="Enter Last Name"
                  {...register('lasttName')}
                  error={errors.lasttName?.message as string}
                />
              </div>
              <InputBox
              data-testid="email"
                nameuse="Email"
                type="email"
                placeholder="Enter Email"
                {...register('email')}
                error={errors.email?.message as string}
              />
              <InputBox
              data-testid="password"
                nameuse="Password"
                type="password"
                placeholder="Enter Password"
                {...register('password')}
                error={errors.password?.message as string}
              />
              <InputBox
                data-testid="confirmp"
                nameuse="Confirm Password"
                // name="confirmPassword"
                type="Password"
                placeholder="Confirm Password"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message as string}
              />

              <div className="flex  gap-2 w-[100%]">
                <h1 className="font-medium text-red-400 text-[13px] text-center w-[100%]">
                  {error}
                </h1>
              </div>
              <div className="w-full mt-5">
                <Button name="Sign Up" loading={loading} background='blue'/>
              </div>
            </form>

            <div className="w-[90%] mt-0">
              <div className="w-[100%] flex justify-center items-center flex-col mt-5">
                <p className="text-sm mb-0">Already have an account? </p>
                <Link
                  href="/auth/login"
                  className="text-blue-500 text-[13px] font-medium hover:text-blue-700"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* THE MODELS POP-UP FOR THE REMIENDER */}
         {/* <p data-testid="result">But before continuing to log in, make sure you verify your email through the link we sent you !</p> */}
        {showModal && (
          <PopUpModels
            testid="result"
            handleShowModal={handleShowModal}
            handleButton={handlemoduleButton}
            data-testid="result"
            bodyText=" But before continuing to log in, make sure you verify your email
            through the link we sent you !"
            topText="You signed up successfully ✅"
            iconImagelink="/Verified.png"
          />
        )}
      </main>
    </>
  );
};

export default Signup;
