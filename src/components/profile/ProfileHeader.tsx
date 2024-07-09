'use client';

import React, { useEffect, useState } from 'react';

import { GreenButton } from '../Button';

import { MessageSquareText } from 'lucide-react';

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
import Header from '@/components/Header';
import { ProductWithFilter } from '@/components/allProducts';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
export interface FormDataType {
  confirmPassword: string;
  newPassword: string;
  oldPassword: string;
}

function ProfileHeader() {
  const onSubmit = (data: FormDataType) => {
    submit(data);
  };
  const [showlModal, setShowmodal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
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
  const { user, loading, error } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const handleshow = () => {
    setShowmodal(!showlModal);
    reset();
  };
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserProfile());
    };

    fetchData();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>No user found</div>;

  const backgroundImageUrl =
    'https://res.cloudinary.com/dv9cz01fi/image/upload/v1719873858/coverImages/aiqbh0c3oiwh2ijb3drb.jpg';

  const router = useRouter();
  const handleEditProfile = () => {
    if (user?.User.Role.name !== 'buyer') {
      router.push(`/dashboard/profile_/${user?.User?.id}`);
    } else {
      router.push('/profile-edit');
    }
  };

  return (
    <>
      <div className="bg-white w-full max-w-7xl mt-4 rounded-lg shadow-md">
        <div
          className="h-32 sm:h-48 md:h-64 w-full bg-cover bg-center rounded-md"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        ></div>

        <div className="flex flex-col sm:flex-row items-center px-4 sm:px-10 py-5">
          <img
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover -mt-12 sm:-mt-16 md:-mt-20"
            src={user.User?.profileImage}
            alt="Profile"
          />

          <div className="flex-grow mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold color:blue">
              {user.User?.firstName} {user.User?.lastName}
            </h1>

            <p className="text-gray-500">{user.User?.Role.name}</p>
          </div>

          <div className="mt-4 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row justify-center items-center">
            <button
              onClick={() => setShowmodal(!showlModal)}
              className="bg-blue-600 hover:bg-blue-700 p-2  text-white"
            >
              Update Password
            </button>
            <GreenButton
              name="Edit Profile"
              className="px-4 bg-green-500"
              handle={handleEditProfile}
            />
          </div>
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
    </>
  );
}

export default ProfileHeader;
