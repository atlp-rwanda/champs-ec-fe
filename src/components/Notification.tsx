import { NotificationItemType } from '@/types/notification';
import {
  getNotificationsAsync,
  readAllNotificationsAsync,
  readSingleNotificationAsync,
} from '@/redux/slices/notificationSlice';
import { AppDispatch } from '@/redux/store';
import React from 'react';
import { useDispatch } from 'react-redux';

const Notification = ({
  notifications,
}: {
  notifications: NotificationItemType[];
}) => {
  const dispatch = useDispatch<AppDispatch>();

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

  return (
    <>
      {notifications.length <= 0 && (
        <div className="w-full p-3 rounded-xl bg-white mt-5">
          <p>No new notification</p>
        </div>
      )}

      {notifications.length > 0 && (
        <div className="w-full p-3 rounded-xl bg-white mt-5">
          <div className="flex justify-between text-sm font-semibold my-1">
            <p> List of notifications</p>
            <p
              className="text-primaryBlue cursor-pointer"
              onClick={() => updateallNotifications()}
            >
              Mark all as Read
            </p>
          </div>
          <div className="flex flex-col gap-2 my-2">
            {notifications.map(
              (notification: NotificationItemType, index: number) => (
                <div
                  key={index}
                  className={` rounded-md shadow-md p-2 space-y-1 cursor-pointer hover:bg-[#b4c9fa] duration-300 ${notification.read ? 'bg-grey' : 'bg-[#b4c9fa]'} `}
                  onClick={() => updateNotification(notification)}
                >
                  <p
                    className={`text-sm text-ellipsis ${notification.read ? '' : 'font-semibold text-primaryBlue'}`}
                  >
                    {notification.message}
                  </p>
                  <p className="text-xs">{notification.message}</p>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
