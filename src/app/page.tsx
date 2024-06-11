'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GlobarPopUp from '@/components/UsablePopUp';
import PopUpModels from '@/components/PopUpModels';
import { Button } from '@/components/Button';
import InputBox from '@/components/InputBox';
import { Updatepassword } from '@/validations/Updatepassword';
import UpdatePassword from '@/hooks/updatepassword';
import Header from '@/components/Header';
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
    <div className="sm:flex sm:justify-center sm:items-center sm:flex-col">
      <Header />
      <HeroSection />
      <main className="flex   flex-col items-center justify-between ">
        <div className="sm:flex h-[20px] gap-10">
          <div>
            <button
              className=" w-auto"
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
