"use client"
import React, { useEffect } from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { VscTag } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getUserProfile } from '@/redux/slices/profileSlice';

function Wishlist() {
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

    const wishlist = [
        {
            productName: "Snakers 270",
            image: "https://i5.walmartimages.com/seo/LEEy-world-Toddler-Shoes-Children-Mesh-Shoes-Spring-and-Autumn-New-Boys-Korean-Casual-Girls-Breathable-Sneakers-Sports-Shoes-for-Girls-Blue_31b4bad2-f738-45e3-87e5-884066b97e9a.3da4fe17d1b33554816beee33dd674f9.jpeg",
            seller: "Kayigamba Blair",
            wishes: "1,489",
            price: "100",
            currency: "$"
        },
        {
            productName: "Snakers 270",
            image: "https://www.campusshoes.com/cdn/shop/products/FIRST_11G-787_WHT-SIL-B.ORG.jpg?v=1705644651",
            seller: "Kayigamba Blair",
            wishes: "1,489",
            price: "100",
            currency: "$"
        },
        {
            productName: "Snakers 270",
            image: "https://cdn.thewirecutter.com/wp-content/media/2023/09/running-shoes-2048px-5946.jpg?auto=webp&quality=75&width=1024",
            seller: "Kayigamba Blair",
            wishes: "1,489",
            price: "100",
            currency: "$"
        }
    ];

    return (
        <div className='bg-white shadow-md rounded-lg'>
            <div className='w-[100%] pl-16 py-4 border-b-[1px] mb-4'>
                <h3 className='font-semibold text-primaryBlue'>Wished Products</h3>
            </div>
            <div className='flex flex-col gap-8 px-16'>
                {wishlist.map((item, index) => (
                    <div key={index} className='flex flex-col items-center gap-4'>
                        <div className='flex justify-between w-[100%] items-center'>
                            <div className='flex justify-center items-center gap-3'>
                                {user.User && (
                                    <img src={user.User.profileImage} alt='Profile' width={60} height={60} className='rounded-full' />
                                )}
                                <div className='flex flex-col'>
                                    <span className='text-blue-500'>{user.User?.firstName} {user.User?.lastName}</span>
                                    <span className='text-[0.6rem] text-green-500'>Your Wishes</span>
                                </div>
                            </div>
                            <HiDotsHorizontal className='text-green-500 text-[1.5rem] font-semibold' />
                        </div>
                        <div style={{ backgroundImage: `url(${item.image})` }} className='w-full h-52 rounded-md bg-cover bg-center'></div>
                        <div className='flex justify-between w-full text-[.8rem] text-blue-900'>
                            <span className='font-semibold'>{item.productName}</span>
                            <span>Seller: {item.seller}</span>
                            <span>{item.price}{item.currency}</span>
                        </div>
                        <div className='flex w-full gap-8 justify-start items-center'>
                            <div className='flex items-center justify-center gap-1'>
                                <FaRegHeart className='text-[1.3rem] text-green-500' />
                                <span className='text-secondaryBlue'>{item.wishes}</span>
                            </div>
                            <div className='flex items-center justify-center gap-1'>
                                <VscTag className='text-[1.3rem] text-green-500' />
                                <span className='text-secondaryBlue'>{item.price}{item.currency}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Wishlist;