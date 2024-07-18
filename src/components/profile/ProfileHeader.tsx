'use client';
import React, { useEffect } from 'react';
import { GreenButton } from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getUserProfile } from '@/redux/slices/profileSlice';
import { useRouter } from 'next/navigation';
function ProfileHeaderSkeleton() {
  return (
    <div className="bg-white w-full max-w-7xl mt-4 rounded-lg shadow-md animate-pulse">
      <div className="h-32 sm:h-48 md:h-64 w-full bg-gray-200 rounded-md"></div>
      <div className="flex flex-col sm:flex-row items-center px-4 sm:px-10 py-5">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 border-4 border-white -mt-12 sm:-mt-16 md:-mt-20"></div>
        <div className="flex-grow mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="mt-4 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row justify-center items-center">
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
}
function ProfileHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.userProfile,
  );
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserProfile());
    };
    fetchData();
  }, [dispatch]);
  const router = useRouter();
  const handleEditProfile = () => {
    if (user?.User.Role.name !== 'buyer') {
      router.push(`/dashboard/profile/${user?.User?.id}`);
    } else {
      router.push('/profile-edit');
    }
  };
  if (loading || !user) {
    return <ProfileHeaderSkeleton />;
  }
  const backgroundImageUrl =
    'https://res.cloudinary.com/dv9cz01fi/image/upload/v1719873858/coverImages/aiqbh0c3oiwh2ijb3drb.jpg';
  return (
    <div className="bg-white w-full max-w-7xl mt-4 rounded-lg shadow-md">
      <div
        className="h-32 sm:h-48 md:h-64 w-full bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      ></div>
      <div className="flex flex-col sm:flex-row items-center px-4 sm:px-10 py-5">
        <img
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover -mt-12 sm:-mt-16 md:-mt-20"
          src={user.User?.profileImage || '/unknown.jpg'}
          alt="Profile"
          onError={(e) => {
            e.currentTarget.src = '/unknown.jpg';
          }}
        />
        <div className="flex-grow mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold color:blue">
            {user.User?.firstName} {user.User?.lastName}
          </h1>
          <p className="text-gray-500">{user.User?.Role.name}</p>
        </div>
        <div className="mt-4 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row justify-center items-center">
          <GreenButton
            name="Edit Profile"
            className="px-4 bg-green-500"
            handle={handleEditProfile}
          />
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;
