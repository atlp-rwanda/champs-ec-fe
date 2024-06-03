'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import GlobarPopUp from '@/components/UsablePopUp';
import PopUpModels from '@/components/PopUpModels';
import Button from '@/components/Button';
import InputBox from '@/components/InputBox';
import { Updatepassword } from '@/validations/Updatepassword';
import UpdatePassword from '@/hooks/updatepassword';

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-primaryBlue  rounded-md shadow-md hover:shadow-lg duration-200 cursor-pointer hover:scale-110">
        <p className="text-lg p-4">This is champs e commerce Homepage</p>
      </div>
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

        <button
          className=" w-auto pb-3"
          onClick={() => setShowmodal(!showlModal)}
        >
          change password
        </button>

        <button className="bg-primaryBlue w-[80px] h-[40px]">
          <Link href="/admin" className="text-white">
            Admin
          </Link>
        </button>
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
  );
}
