import { createAsyncThunk } from "@reduxjs/toolkit";

import { changeDateFormat } from "../../components/changeDateFormat";
import { AppState } from "../store";
import {
  Notification,
  EditNotificationThunkPayload,
  FinishNotificationThunkPayload,
} from "./types";

const fetchURL = "https://notificationbase-52e5.restdb.io/rest/notification";
const urlPass = "61056fb569fac573b50a505b";

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
    const isFinish = false;

    const newNotification = {
      userId,
      description,
      date,
      time,
      dateObj,
      isFinish,
    };

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
        const allNotifications = (await response.json()) as Notification[];

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

const editNotification = createAsyncThunk(
  "notification/EDIT_NOTIFICATION",
  async (payload: EditNotificationThunkPayload, thunkApi) => {
    try {
      const { id, time, description, date } = payload;

      const { notificationList } = (thunkApi.getState() as AppState)
        .notification;

      const notificationIndex = notificationList.findIndex((n) => n._id === id);
      if (notificationIndex === -1) {
        throw new Error("Notification not found");
      }

      const notification = { ...notificationList[notificationIndex] };

      notification.description = description;
      notification.date = date;
      notification.time = time;
      notification.dateObj = changeDateFormat({ date: date, time: time });

      return await fetch(
        `https://notificationbase-52e5.restdb.io/rest/notification/${id}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-apikey": urlPass,
          },
          body: JSON.stringify(notification),
        }
      ).then((response) => {
        if (response.ok) {
          return { notification: notification };
        }
        throw new Error(response.statusText);
      });
    } catch (error) {
      throw error;
    }
  }
);

const finishedNotification = createAsyncThunk(
  "notification/FINISHED_NOTIFICATION",
  async (payload: FinishNotificationThunkPayload, thunkApi) => {
    try {
      const { id, isFinish } = payload;
      const { notificationList } = (thunkApi.getState() as AppState)
        .notification;

      const notificationIndex = notificationList.findIndex((n) => n._id === id);
      if (notificationIndex === -1) {
        throw new Error("Notification not found");
      }
      const notification = { ...notificationList[notificationIndex] };

      notification.isFinish = isFinish;

      return await fetch(
        `https://notificationbase-52e5.restdb.io/rest/notification/${id}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-apikey": urlPass,
          },
          body: JSON.stringify(notification),
        }
      ).then((response) => {
        if (response.ok) {
          return { notification: notification };
        }
        throw new Error(response.statusText);
      });
    } catch (error) {
      throw error;
    }
  }
);

export {
  saveNewNotification,
  getNotificationsList,
  deleteOneNotification,
  editNotification,
  finishedNotification,
};
