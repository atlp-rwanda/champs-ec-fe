import React from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart, FaRegBell } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc"
import logo from "../../public/logo.svg"
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <>
    {/* fixed z-50 w-full flex justify-between items-center px-10 py-5 */}
      <div className='sticky top-0 z-10 w-full border'>
        <div className='flex justify-between px-5 py-5 bg-blue-600'>
            <Image src={logo} alt={'logo'} width={100} height={100}/>
            <div className='flex gap-5 justify-center items-center'>
             <MdOutlineShoppingCart className="hover:bg-black text-white cursor-pointer" />
             <FaRegHeart className="hover:bg-black text-white cursor-pointer" />
             <FaRegBell className="hover:bg-black text-white cursor-pointer" />
            </div>
        </div>
        <div className='flex justify-center items-center bg-gray-100 py-5'>
            <nav className='w-full max-w-1/2 flex justify-center'>
                <ul className='w-full flex gap-10 justify-center items-center'>
                     <li className='text-black hover:text-blue-600'><Link href='/'>Home</Link></li>
                    <li className='text-black hover:text-blue-600'><Link href='/messages'>Messages</Link></li>
                    <li><Link href="/products" className='text-black hover:text-blue-600'>Products</Link></li>
                    <li className='text-black hover:text-blue-600'><Link href='/reservation'>Reservation</Link></li>
                    <li className='text-black hover:text-blue-600'><Link href='/order'>Order</Link></li>
                    <li className='text-black hover:text-blue-600'><Link href='contact'>Contact</Link></li>
                </ul>
            </nav>
            <div className='flex justify-center items-center gap-3 w-1/5'>
             <VscAccount />
             <p>My Accountt</p>
            </div>
        </div>
      </div>
    </>
  )
}

export default Header