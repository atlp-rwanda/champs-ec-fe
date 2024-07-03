"use client";

import React, { useEffect } from 'react'

import { GreenButton } from '../Button'

import { MessageSquareText } from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/redux/store';

import { getUserProfile } from '@/redux/slices/profileSlice';
import { useRouter } from 'next/navigation';

function ProfileHeader() {

    const dispatch = useDispatch<AppDispatch>();

    const { user, loading, error } = useSelector((state: RootState) => state.userProfile);




    useEffect(() => {

        const fetchData = async () => {

            await dispatch(getUserProfile());

        };

        fetchData();

    }, [dispatch]);




    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    if (!user) return <div>No user found</div>;




    const backgroundImageUrl = "https://res.cloudinary.com/dv9cz01fi/image/upload/v1719873858/coverImages/aiqbh0c3oiwh2ijb3drb.jpg";

    const router = useRouter();
    const handleEditProfile = () => {
        router.push('/profile-edit');
    };

return (

    <div className="bg-white w-full max-w-7xl mt-4 rounded-lg shadow-md">

        <div className="h-32 sm:h-48 md:h-64 w-full bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${backgroundImageUrl})` }}></div>

        <div className="flex flex-col sm:flex-row items-center px-4 sm:px-10 py-5">

            <img

                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white -mt-12 sm:-mt-16 md:-mt-20"

                src={user.User?.profileImage}

                alt="Profile"

            />

            <div className="flex-grow mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">

                <h1 className="text-xl sm:text-2xl font-bold color:blue">{user.User?.firstName} {user.User?.lastName}</h1>

                <p className="text-gray-500">{user.User?.Role.name}</p>

            </div>

            <div className="mt-4 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row justify-center items-center">

                <button className='bg-green-500 p-2 rounded-full text-white'><MessageSquareText /></button>
                <GreenButton name="Edit Profile" className='px-4 bg-green-500' handle={handleEditProfile} />

                {/* <button className="border-blue-500 text-blue-500 py-2 px-4 sm:px-10 border">Log Out</button> */}

            </div>

        </div>

    </div>

)

}

export default ProfileHeader