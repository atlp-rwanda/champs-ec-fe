import Image from 'next/image'
import React from 'react'
import { HiDotsHorizontal } from "react-icons/hi";
function Wishlist() {
    return (
        <div className='w-[56%] bg-white shadow-md ml-4 rounded-lg px-16 py-10'>
            <h3>Wished Products</h3>
            <div className='flex flex-col items-center gap-4'>
                <div className='flex justify-between w-[100%] items-center'>
                    <div className='flex justify-center items-center gap-3'>
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt='profie' width={60} height={60} className='rounded-full' />
                        <div className='flex flex-col'>
                            <span className='text-blue-500'>Tchami Ernest</span>
                            <span className='text-[0.6rem] text-green-500'>Your Wishes</span>
                        </div>
                    </div>
                    <HiDotsHorizontal className='text-green-500 text-[1.5rem] font-semibold' />
                </div>
                <div style={{ backgroundImage: 'url(https://i5.walmartimages.com/seo/LEEy-world-Toddler-Shoes-Children-Mesh-Shoes-Spring-and-Autumn-New-Boys-Korean-Casual-Girls-Breathable-Sneakers-Sports-Shoes-for-Girls-Blue_31b4bad2-f738-45e3-87e5-884066b97e9a.3da4fe17d1b33554816beee33dd674f9.jpeg)' }} className='w-full h-52 rounded-md'></div>
                <div></div>
            </div>
        </div>
    )
}
export default Wishlist







