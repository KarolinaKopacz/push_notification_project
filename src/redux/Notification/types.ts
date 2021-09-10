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
  isShowed: boolean;
};

export type NotificationList = {
  _id: string;
  description: string;
  date: string;
  time: string;
  dateObj: Date;
  isShowed: boolean;
};

export type AddedNewNotificationType = {
  description: string;
  date: string;
  time: string;
  isShowed: boolean;
};

export type DeleteNotificationType = {
  _id: string | undefined;
};
