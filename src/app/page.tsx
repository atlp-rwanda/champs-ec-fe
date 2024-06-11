'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import GlobarPopUp from '@/components/UsablePopUp';
import PopUpModels from '@/components/PopUpModels';
import Button from '@/components/Button';
import InputBox from '@/components/InputBox';
import { Updatepassword } from '@/validations/Updatepassword';
import UpdatePassword from '@/hooks/updatepassword';
import HeroSection from '@/components/HeroSection';
import { LatestSection } from '@/components/LatestSection';
import Footer from '@/components/Footer';

import { HomeAds } from '@/components/HomeAds';

import { ProductWithFilter } from '@/components/allProducts';

export interface FormDataType {
  confirmPassword: string;
  newPassword: string;
  oldPassword: string;
}

export default function Home() {
  const [showlModal, setShowmodal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataType>({
    resolver: zodResolver(Updatepassword),
  });

  const onSubmit = (data: FormDataType) => {
    submit(data);
  };

  //Hooks
  let { submit, error, loading, success, handlemoduleButton } =
    UpdatePassword();
  const handleshow = () => {
    setShowmodal(!showlModal);
    reset();
  };

  return (
    <div className="sm:flex sm:justify-center sm:items-center sm:flex-col mt-10 ">
      <HeroSection />
      <main className="flex mb-10  flex-col items-center justify-between ">
        <div className="flex h-[20px] gap-10">
          <button className="bg-primaryBlue w-[80px] h-[40px]">
            <Link href="/auth/login" className="text-white">
              {' '}
              Login
            </Link>
          </button>
          <button className="bg-primaryBlue w-[80px] h-[40px]">
            <Link href="/auth/signup" className="text-white">
              {' '}
              Signup
            </Link>
          </button>
          <button className="bg-primaryBlue w-[80px] h-[40px]">
            <Link href="/admin" className="text-white">
              Admin
            </Link>
          </button>
          <div>
            <button
              className=" w-auto pb-3"
              onClick={() => setShowmodal(!showlModal)}
            >
              change password
            </button>
          </div>
        </div>
        {showlModal && (
          <GlobarPopUp handleShowModel={handleshow}>
            <div className="flex justify-center flex-col  mx-6 py-20">
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <InputBox
                  type="password"
                  nameuse="Old Password"
                  placeholder="Old Password"
                  {...register('oldPassword')}
                  error={errors.oldPassword?.message as string}
                />
                <InputBox
                  type="password"
                  nameuse="New Password"
                  placeholder="New Password"
                  {...register('newPassword')}
                  error={errors.newPassword?.message as string}
                />
                <InputBox
                  type="Password"
                  nameuse="Confirm Password"
                  placeholder="Confirm Password"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message as string}
                />
                <h1 className="text-red-400"> {error}</h1>
                <div className="w-full mt-5">
                  <Button name="Save" loading={loading} />
                </div>
              </form>
            </div>
          </GlobarPopUp>
        )}
        {success && (
          <PopUpModels
            handleButton={handlemoduleButton}
            testid="updatetest"
            bodyText=" Your password has been updated successfully. Next time, please remember to use the updated version !"
            topText="Password Updated  ✅"
            iconImagelink="/Verified.png"
          />
        )}
      </main>

      {/* The Image adds */}
      <HomeAds />
      {/* LAtest Product */}
      <LatestSection />
      {/* Product with Filter  */}
      <ProductWithFilter />
      {/* Ads with button  */}
      <div className="w-full  p-10 rounded-md sm:w-[90%] flex max-w-[1620px] mt-10 shadow-md px-10  content-center mb-20  bg-green-400 justify-center items-center">
        <div className="sm:w-[80%] w-full flex justify-between items-center ">
          <p className="font-semibold text-black/80 w-[50%]  sm:text-3xl">
            Get 25% off with our sponsor promo code
          </p>

          <button className="bg-white h-11 text-secondaryBlue border-secondaryBlue border-2 px-4 justify-center items-center flex hover:bg-secondaryBlue hover:text-white">
            Shop Now
          </button>
        </div>
      </div>
      {/* Footer Sections  */}
      <Footer />
    </div>
  );
}
