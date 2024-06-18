import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
      <div className='bg-black text-white'>
         <div className='w-full max-w-1/2 flex justify-evenly py-5'>
             <div className='flex flex-col justify-center items-center'>
                 <div className='font-medium text-base'>Navigate</div>
                 <div className='flex flex-col gap-3'>
                     <Link href="/about">About</Link>
                     <Link href="/messages">Messages</Link>
                     <Link href="/order">Order</Link>
                     <Link href="/contact">Contant Us</Link>
                     <Link href="/join">Join Us</Link>
                 </div>
             </div>
             <div>
                 <div className='font-medium text-base'>Categories</div>
                 <div className='flex flex-col gap-3'>
                     <Link href="/appliances">Home appliances</Link>
                     <Link href="/groceries">Groceries</Link>
                     <Link href="/fashion">Fashion</Link>
                     <Link href="/electronics">Electronics</Link>
                 </div>
             </div>
             <div>
             <div className='font-medium text-base'>Categories</div>
             <div className='flex flex-col gap-3'>
                 <p>KG 000 street</p>
                 <p>Kigali, Rwanda</p>
                 <p>(250) 788 100 000</p>
                 <p>champsbay@gmail.com</p>
             </div>
             </div>
         </div>
         </div>
         <div>
         <div className='border-t-[1px] border-white flex justify-center items-center'>
             <p className='py-3'> Copyright © 2024 Champs bay. All rights reserved</p>
         </div>
      </div>
    </>
  )
}

export default Footer