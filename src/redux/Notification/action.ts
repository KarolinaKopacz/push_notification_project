import { createAsyncThunk } from "@reduxjs/toolkit";

import { omit } from "remeda";
import { crypt } from "../../components/encryptionFunc";
import { NotificationList } from "./types";

const saveNewNotification = createAsyncThunk(
  "notification/SAVE_NEW_NOTIFICATION",
  async ({
    description,
    date,
    time,
  }: {
    description: string;
    date: string;
    time: string;
  }) => {
    // I know I  should put it in the backend, but this is just a playground

    const newNotification = { description, date, time };

    return await fetch(
      " https://notificationbase-52e5.restdb.io/rest/notification",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": "61056fb569fac573b50a505b",
        },

        body: JSON.stringify(newNotification),
      }
    ).then((response) => {
      if (response.ok) {
        return { newNotification };
      }
      throw new Error(response.statusText);
    });
  }
);

const getNotificationsList = createAsyncThunk(
  "notification/GET_NOTIFICATIONS_LIST",
  async () => {
    return await fetch(
      "https://notificationbase-52e5.restdb.io/rest/notification",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": "61056fb569fac573b50a505b",
        },
      }
    ).then(async (response) => {
      if (response.ok) {
        const allNotifications = (await response.json()) as NotificationList[];

        return allNotifications;
      }
      throw new Error(response.statusText);
    });
  }
);

export { saveNewNotification, getNotificationsList };
