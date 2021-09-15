import { createSlice, current } from "@reduxjs/toolkit";

import { Notification } from "./types";
import {
  saveNewNotification,
  getNotificationsList,
  deleteOneNotification,
  editNotification,
  finishedNotification,
} from "./action";

type FetchStatus = "loading" | "succeeded" | "failed" | "idle";

export type State = {
  notification: Notification | null;
  notificationList: Notification[];
  editStatus: FetchStatus;
  saveStatus: FetchStatus;
  deleteStatus: FetchStatus;
  getListStatus: FetchStatus;
  finishstatus: FetchStatus;
};

const InitialState: State = {
  notification: null,
  notificationList: [],
  editStatus: "idle",
  saveStatus: "idle",
  deleteStatus: "idle",
  getListStatus: "idle",
  finishstatus: "idle",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: InitialState,
  reducers: {
    resetStatus(state: State) {
      state.saveStatus = "idle";
      state.getListStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    // save notification
    builder.addCase(saveNewNotification.pending, (state, action) => {
      state.saveStatus = "loading";
    });
    builder.addCase(saveNewNotification.fulfilled, (state, action) => {
      if ("createdNotification" in action.payload) {
        state.notificationList.push(
          action.payload.createdNotification as Notification
        );
      }
      state.saveStatus = "succeeded";
    });
    builder.addCase(saveNewNotification.rejected, (state, action) => {
      state.saveStatus = "failed";
    });

    // get notification list
    builder.addCase(getNotificationsList.pending, (state, action) => {
      state.getListStatus = "loading";
    });
    builder.addCase(getNotificationsList.fulfilled, (state, action) => {
      state.notificationList = action.payload as Notification[];
      state.getListStatus = "succeeded";
    });
    builder.addCase(getNotificationsList.rejected, (state, action) => {
      state.getListStatus = "failed";
    });

    // delete notification
    builder.addCase(deleteOneNotification.pending, (state, action) => {
      state.deleteStatus = "loading";
    });
    builder.addCase(deleteOneNotification.fulfilled, (state, action) => {
      if ("id" in action.payload && action.payload.id) {
        state.notificationList = state.notificationList.filter(
          // @ts-ignore
          (notification) => notification._id !== action.payload.id
        );
      }

      state.deleteStatus = "succeeded";
    });
    builder.addCase(deleteOneNotification.rejected, (state, action) => {
      state.deleteStatus = "failed";
    });

    // edit notification
    builder.addCase(editNotification.pending, (state, action) => {
      state.editStatus = "loading";
    });
    builder.addCase(editNotification.fulfilled, (state, action) => {
      const newList: Notification[] = [];
      state.notificationList.map((notification) => {
        if (notification._id === action.payload.notification._id) {
          newList.push(action.payload.notification);
          return;
        }

        newList.push(current(notification));
      });

      state.notificationList = newList;
      state.editStatus = "succeeded";
    });
    builder.addCase(editNotification.rejected, (state, action) => {
      state.editStatus = "failed";
    });

    // is finished
    builder.addCase(finishedNotification.pending, (state, action) => {
      state.finishstatus = "loading";
    });
    builder.addCase(finishedNotification.fulfilled, (state, action) => {
      const newList: Notification[] = [];
      state.notificationList.map((notification) => {
        if (notification._id === action.payload.notification._id) {
          newList.push(action.payload.notification);
          return;
        }
        newList.push(current(notification));
      });
      state.notificationList = newList;
      state.finishstatus = "succeeded";
    });
    builder.addCase(finishedNotification.rejected, (state, action) => {
      state.finishstatus = "failed";
    });
  },
});

export const { resetStatus } = notificationSlice.actions;
export default notificationSlice;
