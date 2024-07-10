'use client';

import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getUserProfile } from '@/redux/slices/profileSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import GlobarPopUp from '@/components/UsablePopUp';
import { Button } from '@/components/Button';
import InputBox from '@/components/InputBox';
import PopUpModels from '@/components/PopUpModels';
import { Updatepassword } from '@/validations/Updatepassword';
import UpdatePassword from '@/hooks/updatepassword';

import { useForm } from 'react-hook-form';
export interface FormDataType {
  confirmPassword: string;
  newPassword: string;
  oldPassword: string;
}

interface Properities {
  handleshow: () => void;
  showlModal: boolean;
}

const UpdatePasswords: React.FC<Properities> = ({ handleshow, showlModal }) => {
  let { submit, erro, loadings, success, handlemoduleButton } =
    UpdatePassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataType>({
    resolver: zodResolver(Updatepassword),
  });
  const onSubmit = (data: FormDataType) => {
    const result = submit(data);
    // if (result) {
    //   reset();
    // }
  };

  return (
    <div>
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
              <h1 className="text-red-400"> {erro}</h1>
              <div className="w-full mt-5">
                <Button name="Save" loading={loadings} />
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
    </div>
  );
};

export default UpdatePasswords;
