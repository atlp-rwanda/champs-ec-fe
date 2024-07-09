'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NotificationIcon from './ui-components/NotificationIcon';
import Notification from './ui-components/Notification';
import SideBarOverlay from './UsableSideOvelay';
interface HeaderInterface {
  pageName: string;
}
const HeaderDash: React.FC<HeaderInterface> = ({ pageName }) => {
  const route = useRouter();
  const [userdata, setUserdata] = useState<any>(null);
  const [overlayComponent, setOverlayComponent] = useState<
    'cart' | 'notification' | null
  >(null);
  const handleShowNotification = () => {
    setOverlayComponent('notification');
  };

  const handleCloseOverlay = () => {
    setOverlayComponent(null);
  };
  useEffect(() => {
    const user = localStorage.getItem('profile');
    if (!user) {
      window.location.href = '/auth/login';
      return;
    }
    const userData = JSON.parse(user as string);
    setUserdata(userData.User);

    if (
      userData?.User?.Role.name !== 'seller' &&
      userData?.User?.Role.name !== 'admin'
    ) {
      route.push('/');
    }
  }, []);
  return (
    <>
      <div className="flex justify-between sm:px-7   content-center items-center p-2  shadow-sm z-40">
        <div className=" z-40">
          <h1 className="sm:text-[20px] text-[13px] font-semibold mt-0 pt-0 ">
            {pageName}
          </h1>
        </div>
        <div className={` flex gap-2 w-auto justify-center items-center`}>
          <div
            className="bg-blue-600 rounded-full h-10 w-10 flex justify-center items-center hover:bg-green-600"
            onClick={handleShowNotification}
          >
            <NotificationIcon toggleNotification={handleShowNotification} />
          </div>
          <img
            src={userdata?.profileImage || './unknown.jpg'}
            alt="Logo"
            onError={(e) => {
              e.currentTarget.src = '/unknown.jpg';
            }}
            className=" object-cover  border border-black rounded-full w-[30px] sm:w-[40px] h-[30px] sm:h-[40px]"
          />
          <div className="flex flex-col justify-center">
            <h1 className="font-semibold text-[13px] sm:text-[15px] uppercase">
              {userdata?.firstName ? userdata?.firstName : 'waiting...'}
            </h1>
            <h2 className="text-secondaryGrey capitalize">
              {userdata?.Role?.name}
            </h2>
          </div>
        </div>
      </div>
      {overlayComponent && (
        <SideBarOverlay handleOpenOverlay={handleCloseOverlay}>
          {overlayComponent === 'notification' && (
            <Notification toggleNotification={handleCloseOverlay} />
          )}
        </SideBarOverlay>
      )}
    </>
  );
};

export default HeaderDash;
