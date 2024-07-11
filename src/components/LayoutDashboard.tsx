'use client';
import React, { FC, useEffect, useState } from 'react';
import DashNavbar from '@/components/DashNavbar';
import HeaderDash from '@/components/headerDash';
import { useRouter } from 'next/navigation';
import ChatWrapper from './chatWrapper';
import { MdOutlineChat } from 'react-icons/md';
import ChatPopUp from '@/hooks/ChatPopUp';
interface Properties {
  children: React.ReactNode;
  pageName: string;
  isLoading?: boolean;
}
const LayoutDashboard: React.FC<Properties> = ({
  children,
  pageName,
  isLoading,
}) => {
  const { isChatPopUpOpen, setIsChatPopUpOpen, toggleChatPopUp } = ChatPopUp();
  const [user, setUser] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    const categ = async () => {
      const user = localStorage.getItem('profile') || 'no';
      const finalUser = JSON.parse(user);
      if (
        finalUser.User.Role.name !== 'seller' &&
        finalUser.User.Role.name !== 'admin'
      ) {
        router.push('/');
      }

      setUser(finalUser.User);
    };
    categ();
  }, []);

  return (
    <>
      <div className="w-full flex sm:flex-row flex-col fixed ">
        <div className="z-50">
          <DashNavbar role={user?.Role?.name} />
        </div>
        <div className="flex-1 sm:pt-5   h-screen  sm:relative w-full   z-10 ">
          <div className="mb-1  ">
            <HeaderDash pageName={pageName} />
          </div>
          <div className="flex justify-center sm:justify-start sm:items-start   overflow-auto h-[90vh] fixed sm:relative w-full sm:pb-10  pb-20   z-0">
            {/* Statistic section  */}
            <div className="w-full  relative flex flex-col gap-5 items-center sm:px-7  sm:justify-start sm:items-start z-10">
              {!isLoading ? (
                children
              ) : (
                <div className="min-h-screen w-full justify-center items-center flex">
                  <div className="border-t-4 border-b-4 border-blue-600 rounded-full w-20 h-20 animate-spin m-auto"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Startttttttt */}
      <div className='absolute right-5 w-full flex justify-end items-end'>
      <div className="fixed bottom-5 right-0 z-10 p-4 bg-green-300 rounded-full">
            <MdOutlineChat
              className="text-4xl cursor-pointer z-20"
              onClick={toggleChatPopUp}
            />
          </div>
          <div className={`${isChatPopUpOpen?"block fixed bottom-24" : "hidden"} h-[30rem] w-full max-w-[20%]`}>
          {isChatPopUpOpen && (
            // <ChatRoomsList chatrooms= {chatrooms} currentUser = {currentUser as string}/>
            <ChatWrapper />
          )}
        </div>
      </div>
      {/* Enddddddddd */}
    </>
  );
};

export default LayoutDashboard;
