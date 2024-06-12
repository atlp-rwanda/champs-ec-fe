'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart, FaRegBell } from 'react-icons/fa6';
import { IoMdMenu } from 'react-icons/io';
import { VscAccount } from 'react-icons/vsc';
import logo from '../../public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import OrdersContainer from './OrdersContainer';
import OrdersOverlay from '@/hooks/ordersOverlay';
import { isAuthenticated } from '@/hooks/checkUser';
import { usePathname } from 'next/navigation';
import { revalidatePath } from 'next/cache';
const Header = () => {
  const authenticate = isAuthenticated();
  const [viewMenu, setViewmenu] = useState(false);
  const { isOrdersOverlayOpen, toggleOrdersSlider } = OrdersOverlay();
  const [logged, setLogged] = useState(authenticate);

  const menuRef = useRef(null);

  const Logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setLogged(!authenticate);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setViewmenu(false);
      }
    };
    if (viewMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [viewMenu]);
  const handleMenuToggle = () => {
    setViewmenu((prevState) => !prevState);
  };
  return (
    <div className="sticky top-0 z-10 w-full border ">
      <div className="flex justify-between px-5 py-5 bg-blue-600 relative">
        <Link href="/">
          <Image src={logo} alt={'logo'} width={100} height={100} />
        </Link>
        <div className="flex gap-5 justify-center items-center">
          <MdOutlineShoppingCart className="hover:bg-black text-white cursor-pointer" />
          <FaRegHeart className="hover:bg-black text-white cursor-pointer" />
          <FaRegBell className="hover:bg-black text-white cursor-pointer" />
          <IoMdMenu
            className="text-white text-2xl cursor-pointer sm:hidden  block"
            onClick={handleMenuToggle}
          />
        </div>
        {viewMenu && (
          <div
            ref={menuRef}
            className="absolute duration-200 bg-gray-200 h-[200px] w-[70%] top-[76px] right-0 sm:hidden block"
          >
            <ul className="w-full flex flex-col gap-3 justify-center items-center mt-2">
              <li className="text-black hover:text-blue-600">
                <Link href="/">Home</Link>
              </li>
              <li className="text-black hover:text-blue-600">
                <Link href="/messages">Messages</Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-black hover:text-blue-600"
                >
                  Products
                </Link>
              </li>
              <li className="text-black hover:text-blue-600">
                <Link href="/admin" className="">
                  Admin
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-black hover:text-blue-600"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="sm:flex hidden justify-center items-center bg-gray-100 py-5">
        <nav className=" hidden w-full max-w-1/2 sm:flex justify-center  ">
          <ul className="w-full flex gap-10 justify-center items-center">
            <li className="text-black hover:text-blue-600">
              <Link href="/">Home</Link>
            </li>
            <li className="text-black hover:text-blue-600">
              <Link href="/messages">Messages</Link>
            </li>
            <li>
              <Link href="/products" className="text-black hover:text-blue-600">
                Products
              </Link>
            </li>
            <li className="text-black hover:text-blue-600">
              <Link href="/reservation">Reservation</Link>
            </li>
            <li
              className="text-black hover:text-blue-600"
              onClick={toggleOrdersSlider}
            >
              Order
            </li>
            <li className="text-black hover:text-blue-600">
              <Link href="/admin" className="">
                Admin
              </Link>
            </li>
          </ul>
        </nav>
        {!logged && (
          <div className="flex justify-center items-center gap-3 w-1/5 ">
            <VscAccount />
            <Link href="/auth/login" className="">
              Login
            </Link>
          </div>
        )}
        {logged && (
          <div className="flex justify-center items-center gap-3 w-1/5 cursor-pointer ">
            <VscAccount />
            <p onClick={() => Logout()}>Logout</p>
          </div>
        )}
      </div>
      {isOrdersOverlayOpen ? (
        <OrdersContainer
          isOrdersOverlayOpen={isOrdersOverlayOpen}
          toggleOrdersSlider={toggleOrdersSlider}
        />
      ) : (
        ''
      )}
    </div>
  );
};
export default Header;
