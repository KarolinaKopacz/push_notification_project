import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationProperty } from "./types";
import { AppState } from "../store";

const fetchURL = "https://notificationbase-52e5.restdb.io/rest/notification";
const urlPass = "61056fb569fac573b50a505b";

interface Props {
  date: string;
  time: string;
}
const changeDateFormat = (props: Props) => {
  const dateObj = new Date(props.date);
  const hours = Number(props.time.substr(0, 2));
  const minutes = Number(props.time.substr(3, 2));
  dateObj.setHours(hours);
  dateObj.setMinutes(minutes);

  return dateObj;
};

const saveNewNotification = createAsyncThunk(
  "notification/SAVE_NEW_NOTIFICATION",
  async ({
    userId,
    description,
    date,
    time,
  }: {
    userId: string | undefined;
    description: string;
    date: string;
    time: string;
  }) => {
    // I know I  should put it in the backend, but this is just a playground

    const dateObj = changeDateFormat({ date: date, time: time });

    const newNotification = { userId, description, date, time, dateObj };

    return await fetch(fetchURL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": urlPass,
      },

      body: JSON.stringify(newNotification),
    }).then(async (response) => {
      if (response.ok) {
        const createdNotification = await response.json();
        return { createdNotification: createdNotification };
      }
      throw new Error(response.statusText);
    });
  }
);

const getNotificationsList = createAsyncThunk(
  "notification/GET_NOTIFICATIONS_LIST",
  async ({ userId }: { userId: string }) => {
    return await fetch(fetchURL, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": urlPass,
      },
    }).then(async (response) => {
      if (response.ok) {
        const allNotifications =
          (await response.json()) as NotificationProperty[];

        return allNotifications.filter(
          (notification) => notification.userId === userId
        );
      }
      throw new Error(response.statusText);
    });
  }
);

const deleteOneNotification = createAsyncThunk(
  "notification/DELETE_NOTIFICATION",
  async ({ id }: { id: string | undefined }) => {
    console.log("1 id", id);
    return await fetch(
      `https://notificationbase-52e5.restdb.io/rest/notification/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": urlPass,
        },
      }
    ).then(async (response) => {
      if (response.ok) {
        return { id };
      }
      throw new Error(response.statusText);
    });
  }
);

type EditNotificationThunkPayload = {
  id: string;
  description: string;
  date: string;
  time: string;
};

const editNotification = createAsyncThunk(
  "notification/EDIT_NOTIFICATION",
  async (payload: EditNotificationThunkPayload, thunkApi) => {
    const { id, time, description, date } = payload;

    const { notificationList } = (thunkApi.getState() as AppState).notification;

    const modifiedNotificationList = notificationList.map((notification) => {
      if (notification._id === id) {
        const copyNotification = Object.assign({}, notification);

        copyNotification.description = description;
        copyNotification.date = date;
        copyNotification.time = time;

        const dateObj = changeDateFormat({ date: date, time: time });

        copyNotification.dateObj = dateObj;
        return copyNotification;
      }
      return notification;
    });
    return await fetch(
      `https://notificationbase-52e5.restdb.io/rest/notification/${id}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": urlPass,
        },
        body: JSON.stringify(modifiedNotificationList),
      }
    ).then((response) => {
      if (response.ok) {
        return { modifiedNotificationList };
      }
      throw new Error(response.statusText);
    });
  }
);

export {
  saveNewNotification,
  getNotificationsList,
  deleteOneNotification,
  editNotification,
};
