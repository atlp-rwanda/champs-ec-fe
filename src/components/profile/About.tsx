"use client";
import React, { useEffect } from 'react';
import { User, Cake } from 'lucide-react';
import { FaUser, FaEnvelope } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getUserProfile } from '@/redux/slices/profileSlice';

function About() {
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

    const items: any = [
        {
            icon: <Cake className='text-green-500' />,
            details: `${user.User?.birthDate}`,
        },
        {
            icon: <FaLocationDot className='text-green-500' />,
            details: `${user.User?.whereYouLive}`,
        },
        {
            icon: <FaEnvelope className='text-green-500' />,
            details: `${user.User?.email}`,
        },
        {
            icon: <FaPhone className='text-green-500' />,
            details: `${user.User?.phone}`,
        }
    ];

    return (
        <div className='bg-white shadow-md pl-5 pr-2 p-6 rounded-lg max-h-72'>
            <h3 className='font-semibold text-secondaryBlue text-[1rem] pr-5'>About</h3>
            <div>
                {items.map((item: any, index: number) => (
                    <div key={index} className={`flex flex-col ${index === items.length - 1 ? "" : "border-b-[1px]"} py-3 pl-3 pr-0`}>
                        <div className='flex items-center gap-2'>
                            {item.icon}
                            <span className='text-secondaryBlue font-extralight text-[0.7rem]'>{item.details}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default About;