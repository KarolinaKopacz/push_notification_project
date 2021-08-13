import { createSlice } from "@reduxjs/toolkit";

import {
  saveNewNotification,
  getNotificationsList,
  deleteNotification,
} from "./action";
import { NotificationType, NotificationList } from "./types";

type FetchStatus = "loading" | "succeeded" | "failed" | "idle";

export type State = {
  notification: NotificationType | null;
  notificationList: NotificationList[];
  EditStatus: FetchStatus;
  saveStatus: FetchStatus;
  deleteStatus: FetchStatus;
  getListStatus: FetchStatus;
};

const InitialState: State = {
  notification: null,
  notificationList: [],
  EditStatus: "idle",
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
          action.payload.newNotification as NotificationList
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
    builder.addCase(deleteNotification.pending, (state, action) => {
      state.deleteStatus = "loading";
    });
    builder.addCase(deleteNotification.fulfilled, (state, action) => {
      console.log("action", action);
      if ("deletedId" in action.payload) {
        state.notificationList.splice(action.payload.deletedId, 1);
      }
      state.deleteStatus = "succeeded";
    });
    builder.addCase(deleteNotification.rejected, (state, action) => {
      state.deleteStatus = "failed";
    });
  },
});

export const { resetStatus } = notificationSlice.actions;
export default notificationSlice;
