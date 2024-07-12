'use client';
import React, { useEffect, useState } from 'react';
import {
  MdDashboard,
  MdOutlineLogout,
  MdOutlineShoppingCart,
} from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { FaRegHeart, FaRegBell } from 'react-icons/fa6';
import { IoIosArrowDropdown, IoMdMenu } from 'react-icons/io';
import { VscAccount } from 'react-icons/vsc';
import logo from '../../public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import OrdersContainer from './OrdersContainer';
import OrdersOverlay from '@/hooks/ordersOverlay';
import SideBarOverlay from './UsableSideOvelay';
import CartContainer from './CartContainer';
import { RootState } from '@/redux/store';
import { useAppSelector } from '../redux/store';
import { handleFetchUserCart } from '@/hooks/userCart';
import Logout from '@/hooks/logout';
import NotificationIcon from './ui-components/NotificationIcon';
import Notification from './ui-components/Notification';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
const Header = () => {
  const { isOrdersOverlayOpen, toggleOrdersSlider } = OrdersOverlay();
  const [activelink, setActivelink] = useState('home');

  const [showlModal, setShowmodal] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [showNotification, setShowNotification] = useState(false);

  const [overlayComponent, setOverlayComponent] = useState<
    'cart' | 'notification' | null
  >(null);

  const handleShowCart = () => {
    setOverlayComponent('cart');
  };

  const handleShowNotification = () => {
    setOverlayComponent('notification');
  };

  const handleCloseOverlay = () => {
    setOverlayComponent(null);
  };

  const { allProduct, cart } = useAppSelector(
    (state: RootState) => state.userCartData,
  );
  const [dropdownShow, setDropDownShow] = useState(false);
  const { mutate, pending } = Logout();
  handleFetchUserCart();
  const router = useRouter();
  const handleshow = () => {
    setShowmodal(!showlModal);
  };
  const [viewMenu, setViewmenu] = useState(false);
  const [userdata, setUserdata] = useState<any | null>(null);
  useEffect(() => {
    const link = window.location.href
      .toString()
      .split('/')
      .splice(-1)
      .toString();
    setActivelink(link);

    const user = localStorage.getItem('profile');
    const userData = JSON.parse(user as string);
    setUserdata(userData);
  }, []);
  const handleMenuToggle = () => {
    setViewmenu((prevState) => !prevState);
  };
  const logout = () => {
    mutate();
  };
  const dropDownShowEvent = (open: boolean) => {
    setDropDownShow(open);
  };
  const ProfileShow = () => {
    return userdata.User.Role.name == 'buyer'
      ? router.push('/profile')
      : router.push('/dashboard');
  };

  return (
    <>
      <div className="sticky top-0 z-50 w-full border  ">
        <div className="flex justify-between px-5 py-5 bg-blue-600">
          <Link href="/">
            <Image src={logo} alt={'logo'} width={100} height={100} />
          </Link>
          <div className="flex gap-5 justify-center items-center ">
            {userdata && userdata.User.Role.name === 'buyer' && (
              <span className="flex items-center" onClick={handleShowCart}>
                <i className=" bg-black  border items-center border-slate-100 w-6 h-6 text-center rounded-[100%] relative  top-[-10px] right-[-5px] text-[#ffff] text-[12px]">
                  {cart?.product.length}
                </i>
                <MdOutlineShoppingCart className="hover:bg-black text-white cursor-pointer z-20" />
              </span>
            )}
            {userdata ? (
              <>
                <div className="mb-4 mx-4 ">
                  <NotificationIcon
                    toggleNotification={handleShowNotification}
                  />
                </div>
                <div>
                  <FaRegHeart className="hover:bg-black text-white cursor-pointer" />
                </div>
              </>
            ) : (
              ''
            )}
            <IoMdMenu
              className="text-white text-2xl cursor-pointer sm:hidden  block"
              onClick={handleMenuToggle}
            />
          </div>
          {viewMenu && (
            <div className="absolute duration-200 bg-gray-200 h-[200px] w-[70%] top-[76px] right-0 sm:hidden block">
              <ul className="w-full flex flex-col gap-3 justify-center items-center mt-2">
                <li className="text-black hover:text-blue-600">
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-black hover:text-blue-600"
                  >
                    Products
                  </Link>
                </li>
                {userdata?.User.Role.name === 'seller' ||
                userdata?.User.Role.name === 'admin' ? (
                  <>
                    <li className="text-black hover:text-blue-600">
                      <Link href="/dashboard" className="">
                        Admin
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className="text-black hover:text-blue-600"
                      onClick={toggleOrdersSlider}
                    >
                      Order
                    </li>
                    <li>
                      <Link
                        href="/profile"
                        className="text-black hover:text-blue-600"
                      >
                        Profile
                      </Link>
                    </li>
                  </>
                )}
                {userdata ? (
                  <li onClick={logout} className="text-red-500 font-semibold">
                    LogOut
                  </li>
                ) : (
                  <li>
                    <Link
                      href="/auth/login"
                      className="text-black hover:text-blue-600"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="sm:flex hidden justify-between items-center bg-gray-100 py-5">
          <nav className=" flex-1 ml-[20%]  hidden  max-w-1/2 sm:flex justify-center  ">
            <ul className="w-full  flex gap-10 justify-center items-center">
              <li
                className={`${activelink === '' ? 'text-blue-600' : 'text-black'} font-normal hover:text-blue-600 cursor-pointer `}
              >
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className={`${activelink === 'products' ? 'text-blue-600' : 'text-black'} font-normal hover:text-blue-600 cursor-pointer `}
                >
                  Products
                </Link>
              </li>
              <li
                className={`${isOrdersOverlayOpen === true ? 'text-blue-600' : 'text-black'} font-normal hover:text-blue-600 cursor-pointer `}
                onClick={toggleOrdersSlider}
              >
                Order
              </li>
            </ul>
          </nav>
          <div className="flex justify-center items-center gap-3 w-1/5 ">
            {!userdata && (
              <>
                <VscAccount />
                <Link href="/auth/login" className="">
                  {' '}
                  Login
                </Link>
              </>
            )}
            {userdata && (
              <>
                <div className="sm:flex gap-3 justify-center items-center hidden">
                  <img
                    src={userdata?.User?.profileImage}
                    alt="profile"
                    onError={(e) => {
                      e.currentTarget.src = '/unknown.jpg';
                    }}
                    className="w-[40px] h-[40px] rounded-full bg-gray-700 object-cover"
                  />
                  <div className="flex gap-0 flex-col">
                    <a className="text-blue-500 font-bold capitalize">
                      {userdata.User.firstName}
                    </a>
                  </div>
                  <div className="">
                    {pending ? (
                      <div>
                        <div className="border-t-4 border-b-4 border-black rounded-full w-5 h-5 animate-spin m-auto"></div>
                      </div>
                    ) : (
                      <>
                        <Dropdown
                          onOpenChange={(isOpen) => dropDownShowEvent(isOpen)}
                        >
                          <DropdownTrigger>
                            <Button variant="bordered">
                              {dropdownShow ? (
                                <IoIosArrowDropdown className="text-[25px] rotate-180 ease-in duration-300" />
                              ) : (
                                <IoIosArrowDropdown className="text-[25px] ease-in duration-300" />
                              )}
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Static Actions"
                            className="bg-gray-100  border border-t-0 mt-[9px] border-black/15 p-2 text-xl min-w-[200px] min-h-[100px]"
                          >
                            <DropdownSection>
                              <DropdownItem
                                onClick={ProfileShow}
                                className="hover:bg-gray-300 hover:rounded-lg"
                              >
                                {userdata.User.Role.name == 'buyer' ? (
                                  <p className="flex items-center gap-2">
                                    <CgProfile />
                                    Profile
                                  </p>
                                ) : (
                                  <p className="flex items-center gap-2">
                                    <MdDashboard />
                                    Dashboard
                                  </p>
                                )}
                              </DropdownItem>
                            </DropdownSection>
                            <DropdownSection title="" showDivider={true}>
                              <DropdownItem
                                key="logout"
                                onClick={logout}
                                className="hover:bg-gray-300 text-red-600 hover:rounded-lg font-bold"
                              >
                                <p className="flex items-center gap-2">
                                  {' '}
                                  <MdOutlineLogout /> Logout
                                </p>
                              </DropdownItem>
                            </DropdownSection>
                          </DropdownMenu>
                        </Dropdown>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
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
      {overlayComponent && (
        <SideBarOverlay handleOpenOverlay={handleCloseOverlay}>
          {overlayComponent === 'cart' && (
            <CartContainer hideOverLay={handleCloseOverlay} />
          )}
          {overlayComponent === 'notification' && (
            <Notification toggleNotification={handleCloseOverlay} />
          )}
        </SideBarOverlay>
      )}
    </>
  );
};
export default Header;
