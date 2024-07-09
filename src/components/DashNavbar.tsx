'use client';
import React, { useState, useEffect } from 'react';
import { FaUsersGear } from 'react-icons/fa6';
import { FaUserShield } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { AiFillProduct } from 'react-icons/ai';
import { BsBorderStyle } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { MdOutlineLogout } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';

import { MdCreateNewFolder } from 'react-icons/md';
import Logout from '@/hooks/logout';

interface NewType {
  role?: string;
}

const DashNavbar: React.FC<NewType> = ({ role }) => {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [activelink, setActivelink] = useState('home');
  const [userdata, setUserdata] = useState(null);
  const router = useRouter();
  const { mutate } = Logout();
  useEffect(() => {
    const link = window.location.href
      .toString()
      .split('/')
      .splice(-1)
      .toString();
    setActivelink(link);

    const user: any = localStorage.getItem('profile');
    if (!user) {
      router.push('/');
      return;
    }
    const userData = JSON.parse(user);

    if (
      userData?.User?.Role.name !== 'seller' &&
      userData?.User?.Role.name !== 'admin'
    ) {
      window.location.href = '/';
    }
    setUserdata(userData?.User);
  }, []);

  const handleClick = (data: string) => {
    router.push(data);
  };
  const handlemenu = () => {
    console.log(activelink);
    setOpenMenu((prev) => !prev);
  };
  return (
    <>
      <div className="stick relative">
        <div
          className={`${
            open ? 'w-64' : 'sm:w-20 w-full sm:min-w-0 min-w-[280px]'
          } sm:h-screen h-[70px] p-5 sticky top-0 pt-4 justify-between    duration-300 sm:flex-col bg-primaryBlue flex`}
        >
          <img
            src="/control.png"
            alt="Control Button"
            className={`absolute sm:block hidden cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
              !open && 'rotate-180'
            }`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex items-center ">
            <img
              src="/logo.png"
              className={`cursor-pointer duration-500 ${
                open && 'rotate-[360deg]' && 'min-w-[20px]'
              }`}
              onClick={() => handleClick('/')}
            />
            <h1
              className={`text-white text-1xl  origin-left font-medium duration-200 ${
                !open && 'scale-0'
              }`}
            >
              Champs Bay
            </h1>
          </div>

          <ul className="sm:pt-6 sm:flex sm:flex-col flex-1 sm:gap-5 sm:justify-between justify-end hidden">
            <div className="flex sm:flex-col gap-5 flex-row">
              <Link href="/dashboard">
                <li
                  key="home"
                  className={`flex bg-primary/80 ${activelink === 'dashboard' ? 'text-yellow-400' : 'text-white'} text-2xl  hover:text-yellow-400 duration-200  bg-transparent rounded-md  hover:bg-primary p-2 cursor-pointer hover:bg-light-white items-center gap-x-4  bg-light-white`}
                >
                  {React.createElement(FaHome)}
                  <span
                    className={`${!open && 'hidden'} origin-left duration-200 hover:text-primary`}
                  >
                    Home
                  </span>
                </li>
              </Link>
              {role === 'admin' && (
                <Link href="/dashboard/users">
                  <li
                    key="users"
                    className={`flex bg-primary/80 ${activelink === 'users' ? 'text-yellow-400' : 'text-white'} text-2xl  hover:text-yellow-400 duration-200  bg-transparent rounded-md  hover:bg-primary p-2 cursor-pointer hover:bg-light-white items-center gap-x-4  bg-light-white`}
                  >
                    {React.createElement(FaUsersGear)}
                    <span
                      className={`${!open && 'hidden'} origin-left duration-200 hover:text-primary `}
                    >
                      Users
                    </span>
                  </li>
                </Link>
              )}

              <Link href="/dashboard/profile">
                <li
                  key="profile"
                  className={`flex bg-primary/80 ${activelink === 'profile' ? 'text-yellow-400' : 'text-white'} text-2xl hover:text-yellow-400 duration-200  bg-transparent rounded-md  hover:bg-primary p-2 cursor-pointer hover:bg-light-white items-center gap-x-4  bg-light-white`}
                >
                  {React.createElement(FaUserShield)}
                  <span
                    className={`${!open && 'hidden'} origin-left duration-200 hover:text-primary `}
                  >
                    Profile
                  </span>
                </li>
              </Link>
              <Link href="/dashboard/product">
                <li
                  key="product"
                  className={`flex bg-primary/80 ${activelink === 'product' ? 'text-yellow-400' : 'text-white'} text-2xl  hover:text-yellow-400 duration-200  bg-transparent rounded-md  hover:bg-primary p-2 cursor-pointer hover:bg-light-white items-center gap-x-4  bg-light-white`}
                >
                  {React.createElement(AiFillProduct)}
                  <span
                    className={`${!open && 'hidden'} origin-left duration-200 hover:text-primary `}
                  >
                    Product
                  </span>
                </li>
              </Link>
              {role === 'seller' && (
                <>
                  <Link href="/dashboard/orders">
                    <li
                      key="product"
                      className={`flex bg-primary/80 ${activelink === 'orders' ? 'text-yellow-400' : 'text-white'} text-2xl hover:text-yellow-400 duration-200  bg-transparent rounded-md  hover:bg-primary p-2 cursor-pointer hover:bg-light-white items-center gap-x-4  bg-light-white`}
                    >
                      {React.createElement(BsBorderStyle)}
                      <span
                        className={`${!open && 'hidden'} origin-left duration-200 hover:text-primary `}
                      >
                        Orders
                      </span>
                    </li>
                  </Link>
                  <Link href="/dashboard/addproduct">
                    <li
                      key="product"
                      className={`flex bg-primary/80 ${activelink === 'addproduct' ? 'text-yellow-400' : 'text-white'} text-2xl hover:text-yellow-400 duration-200  bg-transparent rounded-md  hover:bg-primary p-2 cursor-pointer hover:bg-light-white items-center gap-x-4  bg-light-white`}
                    >
                      {React.createElement(MdCreateNewFolder)}
                      <span
                        className={`${!open && 'hidden'} origin-left duration-200 hover:text-primary `}
                      >
                        Create Product
                      </span>
                    </li>
                  </Link>
                </>
              )}
            </div>

            <li
              key="product"
              onClick={() => mutate()}
              className={`flex bg-primary/80 ${activelink === 'product' ? 'text-yellow-400' : 'text-white'} text-2xl  hover:text-yellow-400 duration-200  bg-transparent rounded-md  hover:bg-primary p-2 cursor-pointer hover:bg-light-white items-center gap-x-4  bg-light-white`}
            >
              {React.createElement(MdOutlineLogout)}
              <span
                className={`${!open && 'hidden'} origin-left duration-200 hover:text-primary `}
              >
                Logout
              </span>
            </li>
          </ul>
          <div
            key="Menu"
            onClick={handlemenu}
            className={`flex bg-primary/80 text-2xl sm:hidden    text-white   hover:text-yellow-600 duration-200  bg-transparent hover:bg-primary p-2 cursor-pointer hover:bg-light-white items-center gap-x-4  bg-light-white`}
          >
            {' '}
            {React.createElement(GiHamburgerMenu)}
          </div>
          {openMenu && (
            <div className="absolute sm:hidden block bg-gray-200 top-32 px-3 py-3 right-0 min-w-[50%] z-50">
              <ul>
                <li
                  key="home"
                  onClick={handlemenu}
                  className={`${activelink === 'dashboard' ? 'bg-yellow-600 text-white font-bold' : 'text-black'} hover:bg-yellow-400 px-2 hover:text-white font-semibold`}
                >
                  <Link href="/dashboard">Home</Link>
                </li>
                {role === 'admin' && (
                  <li
                    key="users"
                    onClick={handlemenu}
                    className={`${activelink === 'users' ? 'bg-yellow-600 text-white font-bold' : 'text-black'} hover:bg-yellow-400 px-2 hover:text-white font-semibold`}
                  >
                    <Link href="/dashboard/users">Users</Link>
                  </li>
                )}

                <li
                  key="profile"
                  onClick={handlemenu}
                  className={`${activelink === 'profile' ? 'bg-yellow-600 text-white font-bold' : 'text-black'} hover:bg-yellow-400 px-2 hover:text-white font-semibold`}
                >
                  <Link href="/dashboard/profile">Profile</Link>
                </li>
                <li
                  key="product"
                  onClick={handlemenu}
                  className={`${activelink === 'product' ? 'bg-yellow-600 text-white font-bold' : 'text-black'} hover:bg-yellow-400 px-2 hover:text-white font-semibold`}
                >
                  <Link href="/dashboard/product">Product</Link>
                </li>
                {role === 'seller' && (
                  <>
                    <li
                      key="orders"
                      onClick={handlemenu}
                      className={`${activelink === 'orders' ? 'bg-yellow-600 text-white font-bold' : 'text-black'} hover:bg-yellow-400 px-2 hover:text-white font-semibold`}
                    >
                      <Link href="/dashboard/orders">Orders</Link>
                    </li>
                    <li
                      key="addproduct"
                      onClick={handlemenu}
                      className={`${activelink === 'addproduct' ? 'bg-yellow-600 text-white font-bold' : 'text-black'} hover:bg-yellow-400 px-2 hover:text-white font-semibold`}
                    >
                      <Link href="/dashboard/addproduct">Create Product</Link>
                    </li>
                  </>
                )}

                <li
                  key="product"
                  
                  onClick={() => mutate()}
                  className={` hover:bg-yellow-400 px-2 hover:text-white font-semibold`}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashNavbar;
