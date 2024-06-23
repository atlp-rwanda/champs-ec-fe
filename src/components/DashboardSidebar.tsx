'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoAt, IoAttach } from 'react-icons/io5';

function DashboardSidebar({ role }: { role: string }) {
  const [open, setOpen] = useState(false);

  const menu = [
    {
      title: 'Users',
      src: IoAt,
      route: '/dashboard/users',
      clicked: false,
      gap: false,
      role: 'seller',
    },
    {
      title: 'Products',
      src: IoAttach,
      route: '/dashboard/products',
      clicked: false,
      gap: false,
    },
  ];

  const router = useRouter();

  const handleClick = (index: string) => {
    router.push(index);
  };

  return (
    <>
      <div
        className={`${
          open ? 'w-72' : 'w-20'
        } h-screen p-5 relative  top-0 pt-4 hidden sm:block  duration-300 bg-primaryBlue`}
      >
        <img
          src="/control.png"
          alt="Control Button"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center">
          <img
            src="/logo.png"
            className={`cursor-pointer duration-500 ${
              open && 'rotate-[360deg]' && 'min-w-[30px]'
            }`}
          />
          <h1
            className={`text-white text-2xl origin-left font-medium duration-200 ${
              !open && 'scale-0'
            }`}
          >
            Champs Bay
          </h1>
        </div>
        <div className="pt-6">
          {menu.map((Menu, index) => (
            <li
              key={index}
              className={`flex ${
                Menu.clicked ? 'bg-primary/80 text-white' : 'bg-transparent'
              } rounded-md ${!open && 'hover:bg-primary'} p-2 cursor-pointer hover:bg-light-white text-white text-[25px] items-center gap-x-4 ${
                Menu.gap ? 'mt-10' : 'mt-2'
              } ${index === 0 && 'bg-light-white'}`}
              onClick={() => handleClick(Menu.route)}
            >
              {React.createElement(Menu.src)}
              <span
                className={`${!open && 'hidden'} origin-left duration-200 hover:text-primary hover:text-[20px]`}
              >
                {Menu.title}
              </span>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}

export default DashboardSidebar;
