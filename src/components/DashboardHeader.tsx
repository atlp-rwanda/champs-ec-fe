'use client';
import React, { useEffect, useState } from 'react';
import { CiBellOn } from 'react-icons/ci';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useQuery } from '@tanstack/react-query';
import request from '@/utils/axios';
import NotificationIcon from './ui-components/NotificationIcon';
import Notification from './ui-components/Notification';
import SideBarOverlay from './UsableSideOvelay';

interface HeaderInterface {
  pageName: string;
}

interface userData {
  firstName: string;
  profileImage: string;
  Role: {
    name: string;
  };
}

const DashboardHeader: React.FC<HeaderInterface> = ({ pageName }) => {
  const { isLoading, error, data } = useQuery<any>({
    queryKey: ['userProfile'],
    queryFn: () => request.get('/users/profile'),
  });
  const [overlayComponent, setOverlayComponent] = useState<
    'cart' | 'notification' | null
  >(null);
  const handleShowNotification = () => {
    setOverlayComponent('notification');
  };
  const user = data?.User as userData;
  // const { isChatPopUpOpen, setIsChatPopUpOpen, toggleChatPopUp } = ChatPopUp();
  // const [currentUser, setCurrentUser] = useState(getCurrentUser());
  // const [currentUserToken, setCurrentUserToken] = useState('');
  // const [chatrooms, setChatrooms] = useState([]);


  //  useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const trimmedToken = token.split(' ')[1];
  //     setCurrentUserToken(trimmedToken);
      
  //     socket = io(`${process.env.URL__CHAT}`, {
  //       auth: { token: trimmedToken },
  //     });
      
  //     socket.on('connect', () => {
  //       socket.emit('fetch all chatrooms');
  //     });
      
  //     socket.on('connect_error', (err) => {
  //       console.error('Socket connection error:', err);
      
  //     });

  //      socket.on('all chatrooms', (receivedChatrooms) => {
  //     setChatrooms(receivedChatrooms);
  //   });
      
  //     return () => {
  //       socket.off('all chatrooms');
  //       socket.disconnect();
  //     };
  //   }
  // }, [currentUserToken]);

  const handleCloseOverlay = () => {
    setOverlayComponent(null);
  };
  return (
    <>
      <div className=" hidew-full sticky top-0 z-50 backdrop-filter backdrop-blur-sm flex justify-between items-center p-5 text-textBlack sm:bg-white bg-primaryBlue">
        <h1 className="sm:text-[20px] text-[17px] font-semibold hidden sm:block">
          {pageName}
        </h1>
        <img src="/logo.png" alt="Logo" className="block sm:hidden" />
        <div className="flex gap-4 items-center px-2 sm:px-10 justify-center">
          <div className="bg-primaryGrey w-[50px] h-[30px] sm:h-[10%] flex items-center justify-center border border-transparent rounded-[10px] text-primaryBlue">
            <CiBellOn className="text-[30px] sm:text-[40px]" />
          </div>
          <div className="flex gap-2 w-auto">
           
            <img
              src={user?.profileImage || '/unknown.jpg'}
              alt="Logo"
              onError={(e) => {
                e.currentTarget.src = '/unknown.jpg';
              }}
              className="cursor-pointer rounded-[10px] w-[40px] sm:w-[60px] h-[40px] sm:h-[60px]"
            />
            <div className=" flex-col justify-center hidden sm:flex">
              <h1 className="font-semibold text-[15px] sm:text-[20px] uppercase">
                {user?.firstName || 'username'}
              </h1>
              <h2 className="text-secondaryGrey capitalize">
                {user?.Role?.name || 'Role'}
              </h2>
            </div>
            <GiHamburgerMenu className="block sm:hidden text-[40px] text-white" />
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
export default DashboardHeader;
