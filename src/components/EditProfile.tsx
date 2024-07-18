'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getUserProfile, updateUserProfile } from '@/redux/slices/profileSlice';
import { toast } from 'react-toastify';
import { showToast } from '@/helpers/toast';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import updateSchema from '@/validations/userProfileSchema';
import { useRouter } from 'next/navigation';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputBox from '@/components/InputBox';
import UpdatePasswords from '@/components/updatepassword';

type FormSchemaType = z.infer<typeof updateSchema>;
const UserProfileForm: React.FC = () => {
  const route = useRouter();
  const [showlModal, setShowmodal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const handleshow = () => {
    setShowmodal(!showlModal);
  };
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      birthDate: '',
      preferredLanguage: '',
      whereYouLive: '',
      preferredCurrency: 'RWf',
      billingAddress: '',
    },
  });
  const watchedValues = useWatch({ control });
  const [profileImage, setProfileImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  useEffect(() => {
    if (user && user.User) {
      setValue('firstName', user.User.firstName || '');
      setValue('lastName', user.User.lastName || '');
      setValue('phone', user.User.phone || '');
      setValue('birthDate', user.User.birthDate || '');
      setValue('preferredLanguage', user.User.preferredLanguage || '');
      setValue('whereYouLive', user.User.whereYouLive || '');
      setValue('preferredCurrency', user.User.preferredCurrency || '');
      setValue('billingAddress', user.User.billingAddress || '');
      setProfileImage(user.User.profileImage || '');
    }
  }, [user, setValue]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target?.files?.length === 1) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  const getExistingImage = async (): Promise<File | null> => {
    if (!user?.User?.profileImage) return null;
    try {
      const response = await fetch(user.User.profileImage);
      const blob = await response.blob();
      return new File([blob], 'profile_image.jpg', { type: blob.type });
    } catch (error) {
      console.error('Error fetching existing image:', error);
      return null;
    }
  };
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const formDataToSend = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formDataToSend.append(key, value as string);
    });
    let imageToUpload: File | null = null;
    if (imageFile) {
      imageToUpload = imageFile;
    } else {
      imageToUpload = await getExistingImage();
    }
    if (imageToUpload) {
      formDataToSend.append('profileImage', imageToUpload);
    }
    try {
      setIsLoading(true);
      const response = await dispatch(updateUserProfile(formDataToSend));
      setIsLoading(false);
      if (updateUserProfile.fulfilled.match(response)) {
        const currentProfile = JSON.parse(
          localStorage.getItem('profile') || '{}',
        );
        if (response.payload && response.payload.User) {
          currentProfile.User = response.payload.User;
          localStorage.setItem('profile', JSON.stringify(currentProfile));
        }
        toast.success('Profile updated successfully');
        route.push('/profile');
      } else if (updateUserProfile.rejected.match(response)) {
        const errorMessage: any =
          response.payload &&
          typeof response.payload === 'object' &&
          'message' in response.payload
            ? response.payload.message
            : 'Profile update failed. Please try again.';
        toast.error(errorMessage);
      } else {
        throw new Error('Unexpected response from updateUserProfile');
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(`Failed to update profile: ${errorMessage}`);
    }
  };
  if (error) {
    console.error('Error fetching user data:', error);
    showToast(
      typeof error === 'string' ? error : JSON.stringify(error),
      'error',
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen w-full justify-center items-center flex">
        <div className="border-t-4 border-b-4 border-blue-600 rounded-full w-20 h-20 animate-spin m-auto"></div>
      </div>
    );
  }
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear() - 10;
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  function convertToNormalDate(isoTimestamp: any) {
    const date = new Date(isoTimestamp);
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  function formatDate(dateString: string) {
    // Parse the date string into a Date object
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }
  return (
    <div className="flex flex-col min-h-screen  w-full">
      <main className="flex-grow p-4 sm:p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row">
            <aside className="w-full md:w-1/4 p-6 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="flex flex-col items-center md:items-start">
                <div className="relative mb-4 w-32 h-32">
                  <img
                    className="w-full h-full rounded-full cursor-pointer object-cover"
                    src={profileImage || '/unknown.jpg'}
                    alt="Profile"
                    onClick={handleImageClick}
                    onError={(e) => {
                      e.currentTarget.src = '/unknown.jpg';
                    }}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <div
                    className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5 cursor-pointer"
                    style={{ transform: 'translate(25%, 25%)' }}
                    onClick={handleImageClick}
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-blue-600 text-center md:text-left">{`${watchedValues.firstName || ''} ${watchedValues.lastName || ''}`}</h2>
                <p className="text-sm text-gray-500 mb-4 text-center md:text-left">
                  {user?.User?.Role.name || 'buyer'}
                </p>
              </div>
              <ul className="hidden md:block text-sm space-y-2">
                <li className="flex items-center text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {watchedValues.birthDate
                    ? watchedValues.birthDate.match(/^\d{2}-\d{2}-\d{4}$/)
                      ? watchedValues.birthDate
                      : formatDate(watchedValues.birthDate)
                    : 'YYYY-MM-DD'}
                </li>
                <li className="flex items-center text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  {watchedValues.whereYouLive || 'Where you live'}
                </li>
                <li className="flex items-center text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {user?.User?.emails || 'email'}
                </li>
                <li className="flex items-center text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {watchedValues.phone || 'Contact Number'}
                </li>
                <li>
                  <button
                    onClick={() => setShowmodal(!showlModal)}
                    className="cursor-pointer p-2  text-blue-500 hover:text-blue-600 hover:font-semibold duration-200 "
                  >
                    Update Password
                  </button>
                </li>
              </ul>
            </aside>
            <div className="w-full md:w-3/4 p-6">
              <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <InputBox
                    nameuse="First Name"
                    type="text"
                    placeholder="First Name"
                    {...register('firstName')}
                    error={errors.firstName?.message}
                  />
                  <InputBox
                    nameuse="Last Name"
                    type="text"
                    placeholder="Last Name"
                    {...register('lastName')}
                    error={errors.lastName?.message}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <InputBox
                    nameuse="Preferred Currency"
                    type="text"
                    placeholder="Preferred Currency"
                    {...register('preferredCurrency')}
                    error={errors.preferredCurrency?.message}
                  />
                  <InputBox
                    nameuse="Birth date"
                    type="date"
                    placeholder="Birth date"
                    {...register('birthDate')}
                    error={errors.birthDate?.message}
                    max={getCurrentDate()}
                  />
                </div>
                <div className="mb-4">
                  <InputBox
                    nameuse="Address"
                    type="text"
                    placeholder="Address"
                    error={errors.address?.message}
                  />
                </div>
                <div className="mb-4">
                  <InputBox
                    nameuse="Contact Number"
                    type="text"
                    placeholder="Contact Number"
                    {...register('phone')}
                    error={errors.phone?.message}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <InputBox
                    nameuse="Where you live"
                    type="text"
                    placeholder="City"
                    {...register('whereYouLive')}
                    error={errors.whereYouLive?.message}
                  />
                  <InputBox
                    nameuse="Billing address"
                    type="text"
                    placeholder="Billing Address"
                    {...register('billingAddress')}
                    error={errors.billingAddress?.message}
                  />
                </div>
                <div className="mb-6">
                  <InputBox
                    nameuse="Preferred language"
                    type="text"
                    placeholder="Preferred Language"
                    {...register('preferredLanguage')}
                    error={errors.preferredLanguage?.message}
                  />
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => route.back()}
                    type="button"
                    className="w-full sm:w-1/2 bg-white text-gray-700 border border-gray-300 px-16 py-2 rounded hover:bg-gray-100 transition duration-300"
                  >
                    <a>Cancel</a>
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-1/2 bg-green-500 text-white px-16 py-2 rounded hover:bg-green-600 transition duration-300 shadow-md"
                  >
                    {isLoading ? (
                      <div className="border-t-4 border-b-4 border-white rounded-full w-6 h-6 animate-spin m-auto"></div>
                    ) : (
                      'Update Profile'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <div className="">
        <UpdatePasswords handleshow={handleshow} showlModal={showlModal} />
      </div>
    </div>
  );
};
export default UserProfileForm;
