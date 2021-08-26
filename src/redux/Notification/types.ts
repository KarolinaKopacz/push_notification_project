export type NotificationType = {
  _id: string;
  description: string;
  date: string;
};

export type NotificationList = {
  _id: string;
  description: string;
  date: string;
  time: string;
};

export type AddedNewNotificationType = {
  description: string;
  date: string;
  time: string;
};
