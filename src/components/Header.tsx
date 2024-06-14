
import React,{ useEffect, useState } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart, FaRegBell } from 'react-icons/fa6';
import { VscAccount } from 'react-icons/vsc';
import logo from '../../public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import OrdersContainer from './OrdersContainer';
import OrdersOverlay from '@/hooks/ordersOverlay';
import SideBarOverlay from './UsableSideOvelay';
import CartContainer from './CartContainer';
import { RootState } from '@/redux/store';
import {useAppSelector } from '../redux/store';
import {handleFetchUserCart } from '@/hooks/userCart';

const Header = () => {
  const{ isOrdersOverlayOpen, toggleOrdersSlider }= OrdersOverlay();
  const [showlModal, setShowmodal] = useState(false);
  const {allProduct, cart} = useAppSelector((state: RootState) => state.userCartData);
  
  
  handleFetchUserCart();

  //const [cartItems, setCartItems]=useState(0);

 


  const handleshow = () => {
    setShowmodal(!showlModal);
  };
  return (
    <>
    <div className="sticky top-0 z-50 w-full border  ">
      <div className="flex justify-between px-5 py-5 bg-blue-600">
        <Link href="/">
          <Image src={logo} alt={'logo'} width={100} height={100} />
        </Link>
        <div className="flex gap-5 justify-center items-center">
         <span
              className="flex items-center"
              onClick={() => setShowmodal(!showlModal)}
            >
              <i className=" bg-black  border items-center border-slate-100 w-6 h-6 text-center rounded-[100%] relative top-[-10px] right-[-5px] text-[#ffff] text-[12px]">
                {cart?.product.length}
              </i>
              <MdOutlineShoppingCart className="hover:bg-black text-white cursor-pointer z-20" />
            </span>
          <FaRegHeart className="hover:bg-black text-white cursor-pointer" />
          <FaRegBell className="hover:bg-black text-white cursor-pointer" />
        </div>
     
      </div>
      <div className="flex justify-center items-center bg-gray-100 py-5">
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
            <li className="text-black hover:text-blue-600" onClick={toggleOrdersSlider}>
              Order
            </li>
            <li className="text-black hover:text-blue-600">
              <Link href="/admin" className="">
                Admin
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex justify-center items-center gap-3 w-1/5">
          <VscAccount />
          <Link href="/auth/login" className="">
            {' '}
            Login
          </Link>
        </div>
      </div>
      {isOrdersOverlayOpen ?
        <OrdersContainer isOrdersOverlayOpen={isOrdersOverlayOpen} toggleOrdersSlider={toggleOrdersSlider}/>
       :""
      }
    </div>
       {showlModal && (
        <SideBarOverlay handleOpenOverlay={handleshow}>
          <CartContainer hideOverLay={handleshow} />
        </SideBarOverlay>
      )}
    </>
  );
 
};

export default Header;