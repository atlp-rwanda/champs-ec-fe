import { NotificationItemType } from '@/types/notification';
import {
  getNotificationsAsync,
  readAllNotificationsAsync,
  readSingleNotificationAsync,
} from '@/redux/slices/notificationSlice';
import { AppDispatch } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAccessTime, MdOutlineArrowBackIosNew } from 'react-icons/md';

const Notification = ({
  toggleNotification,
}: {
  toggleNotification: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [notificationCounter, setNotificationCounter] = useState(5);

  const { notifications } = useSelector((state: any) => state.notification);

  const unreadNotifications = notifications.filter(
    (notificationItem: NotificationItemType) => !notificationItem.read,
  );

  useEffect(() => {
    dispatch(getNotificationsAsync());
  }, []);

  const updateNotification = (notification: NotificationItemType) => {
    if (notification.read == false) {
      dispatch(readSingleNotificationAsync(notification.id));
      dispatch(getNotificationsAsync());
    }
    return;
  };

  const updateallNotifications = () => {
    dispatch(readAllNotificationsAsync());
    dispatch(getNotificationsAsync());
  };

  const sortedNotifications = [...notifications].sort(
    (a: NotificationItemType, b: NotificationItemType) =>
      Number(a.read) - Number(b.read),
  );

  const formattedDate = (input: string) => {
    const date = new Date(input);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = monthNames[date.getUTCMonth()];
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${month} ${day}, ${hours}:${minutes}`;
  };

  return (
    <div className="p-4 -mt-8">
      <p
        className="text-sm cursor-pointer font-semibold flex items-center gap-2"
        onClick={toggleNotification}
      >
        <MdOutlineArrowBackIosNew /> Notifications
      </p>
      <hr className="mt-2 border-black" />
      {notifications.length <= 0 && (
        <div className="w-full p-3 rounded-xl bg-white mt-5">
          <p>No new notification</p>
        </div>
      )}

      {notifications.length > 0 && (
        <div className="w-full p-3 rounded-xl bg-white mt-5">
          <div className="flex justify-end text-sm font-semibold my-1">
            {unreadNotifications.length > 0 && (
              <p
                className="text-primaryBlue cursor-pointer"
                onClick={() => updateallNotifications()}
              >
                Mark all as Read
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 my-2">
            {sortedNotifications.map(
              (notification: NotificationItemType, index: number) =>
                index < notificationCounter && (
                  <div
                    key={index}
                    className={`rounded-md shadow-md p-2 space-y-1 cursor-pointer hover:bg-[#b4c9fa] duration-300 ${notification.read ? 'bg-grey' : 'bg-[#b4c9fa]'}`}
                    onClick={() => updateNotification(notification)}
                  >
                    <p
                      className={`text-sm ${notification.read ? '' : 'font-semibold text-primaryBlue'}`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs font-medium mt-3 flex items-center gap-1">
                      <MdAccessTime size={12} className="mt-[0px]" />
                      {formattedDate(notification.createdAt)}
                    </p>
                  </div>
                ),
            )}
          </div>

          {notifications.length > notificationCounter && (
            <p
              className="text-primaryBlue cursor-pointer text-sm font-bold text-end"
              onClick={() => setNotificationCounter(notificationCounter + 5)}
            >
              Load More
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
