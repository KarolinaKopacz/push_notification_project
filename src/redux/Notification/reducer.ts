import { createSlice } from "@reduxjs/toolkit";

import {
  saveNewNotification,
  getNotificationsList,
  deleteOneNotification,
  editNotification,
} from "./action";
import {
  NotificationType,
  NotificationList,
  DeleteNotificationType,
  NotificationProperty,
} from "./types";

type FetchStatus = "loading" | "succeeded" | "failed" | "idle";

export type State = {
  notification: NotificationType | null;
  notificationList: NotificationList[];
  editStatus: FetchStatus;
  saveStatus: FetchStatus;
  deleteStatus: FetchStatus;
  getListStatus: FetchStatus;
};

const InitialState: State = {
  notification: null,
  notificationList: [],
  editStatus: "idle",
  saveStatus: "idle",
  deleteStatus: "idle",
  getListStatus: "idle",
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
      if ("newNotification" in action.payload) {
        state.notificationList.push(
          action.payload.newNotification as NotificationProperty
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
      state.notificationList = action.payload as NotificationList[];
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

    // edit
    builder.addCase(editNotification.pending, (state, action) => {
      state.editStatus = "loading";
    });
    builder.addCase(editNotification.fulfilled, (state, action) => {
      state.notificationList = action.payload.modifiedNotificationList;
      state.editStatus = "succeeded";
    });
    builder.addCase(editNotification.rejected, (state, action) => {
      console.log("Error!", action);
      state.editStatus = "failed";
    });
  },
});

export const { resetStatus } = notificationSlice.actions;
export default notificationSlice;
