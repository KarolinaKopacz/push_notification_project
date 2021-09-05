export type NotificationType = {
  _id: string | undefined;
  description: string;
  date: string;
};
export type NotificationProperty = {
  userId: string;
  _id: string;
  description: string;
  date: string;
  time: string;
  dateObj: Date;
};

export type NotificationList = {
  _id: string;
  description: string;
  date: string;
  time: string;
  dateObj: Date;
};

export type AddedNewNotificationType = {
  description: string;
  date: string;
  time: string;
};

export type DeleteNotificationType = {
  _id: string | undefined;
};
