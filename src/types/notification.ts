export type NotificationItemType = {
  id: string;
  recipient_id: string;
  message: string;
  read: boolean;
};

export type NotificationType = {
  success: string;
  Notification: NotificationItemType[];
};
