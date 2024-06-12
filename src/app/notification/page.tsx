'use client';
import Notification from '@/components/Notification';
import Drawer from '@/components/ui-elements/Drawer';
import PingCounter from '@/components/ui-elements/PingCounter';
import { getNotificationsAsync } from '@/redux/slices/notificationSlice';
import { AppDispatch } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '@/helpers/toast';
import { io } from 'socket.io-client';
import { decodeToken } from '@/utils/socket';
import { NotificationItemType } from '@/types/notification';

export default function Page(): React.JSX.Element {
  const [notification, setNotification] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const URL: string = process.env.NEXT_PUBLIC_SOCKET_APP_ENV as string;

  const socket = io(URL);

  // socket
  const socketInit = (token: string) => {
    const decodedtokenone = decodeToken(token);
    const userID = decodedtokenone.id;

    socket.on('connect', () => {
      socket.emit('joinRoom', userID);
      console.log('client connected successful', userID);
    });

    socket.on('productUnavailable', (data) => {
      console.log('Product wishe', data);
      dispatch(getNotificationsAsync());
      // showToast('New Notification', 'info');
    });
  };

  if (token) {
    socketInit(token);
  }

  const { notifications } = useSelector((state: any) => state.notification);

  const unreadNotifications = notifications.filter(
    (notificationItem: NotificationItemType) => !notificationItem.read,
  );

  useEffect(() => {
    dispatch(getNotificationsAsync());
  }, []);

  return (
    <div className="">
      <div className="w-full h-20 bg-primaryBlue/90 border-b border-black flex justify-end">
        <div
          className="relative p-1 cursor-pointer border border-white rounded-md hover:bg-greenMain text-white my-auto mx-20 flex gap-0 justify-between"
          onClick={() => setNotification(!notification)}
        >
          <IoIosNotificationsOutline size={22} />

          {unreadNotifications.length > 0 && (
            <PingCounter
              color="bg-warningRed"
              count={unreadNotifications.length}
            />
          )}
        </div>
      </div>
      {notification && (
        <Drawer>
          <p
            className="text-sm cursor-pointer font-semibold flex items-center gap-2"
            onClick={() => setNotification(!notification)}
          >
            <MdOutlineArrowBackIosNew /> Notifications
          </p>
          <hr className="mt-2 border-black" />
          <Notification notifications={unreadNotifications} />
        </Drawer>
      )}
    </div>
  );
}
