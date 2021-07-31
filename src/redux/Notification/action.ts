import { createAsyncThunk } from "@reduxjs/toolkit";

import { omit } from "remeda";
import { crypt } from "../../components/encryptionFunc";

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

export { saveNewNotification };
