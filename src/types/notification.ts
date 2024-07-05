export type NotificationItemType = {
  id: string;
  recipient_id: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export type NotificationType = {
  success: string;
  Notification: NotificationItemType[];
};
