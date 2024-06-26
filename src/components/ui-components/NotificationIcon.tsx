import React, { useEffect } from 'react';
import { FaRegBell } from 'react-icons/fa6';
import PingCounter from './PingCounter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getNotificationsAsync } from '@/redux/slices/notificationSlice';
import { NotificationItemType } from '@/types/notification';
import { io } from 'socket.io-client';
import { decodeToken } from '@/utils/socket';
import { showToast } from '@/helpers/toast';

const NotificationIcon = ({
  toggleNotification,
}: {
  toggleNotification: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications } = useSelector((state: any) => state.notification);
  const unreadNotifications = notifications.filter(
    (notificationItem: NotificationItemType) => !notificationItem.read,
  );

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const URL: string = process.env.NEXT_PUBLIC_SOCKET_APP_ENV as string;

  const socket = io(URL);
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
      showToast('New Notification', 'info');
    });
  };

  if (token) {
    socketInit(token);
  }

  useEffect(() => {
    dispatch(getNotificationsAsync());
  }, []);

  return (
    <div onClick={toggleNotification}>
      <FaRegBell className="hover:bg-black text-white cursor-pointer" />
      {unreadNotifications.length > 0 && (
        <PingCounter color="bg-warningRed" count={unreadNotifications.length} />
      )}
    </div>
  );
};

export default NotificationIcon;
