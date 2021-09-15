export type Notification = {
  userId: string;
  _id: string;
  description: string;
  date: string;
  time: string;
  dateObj: Date;
  isFinish: boolean;
};

export type DeleteNotificationType = {
  _id: string | undefined;
};

export type EditNotificationThunkPayload = {
  id: string;
  description: string;
  date: string;
  time: string;
};

export type FinishNotificationThunkPayload = {
  id: string;
  isFinish: boolean;
};
