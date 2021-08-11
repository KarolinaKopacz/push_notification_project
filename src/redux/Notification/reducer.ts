import { createSlice } from "@reduxjs/toolkit";

import { saveNewNotification, getNotificationsList } from "./action";
import { NotificationType, NotificationList } from "./types";

type FetchStatus = "loading" | "succeeded" | "failed" | "idle";

export type State = {
  notification: NotificationType | null;
  notificationList: NotificationList[];
  EditStatus: FetchStatus;
  saveStatus: FetchStatus;
  deletestatus: FetchStatus;
  getListStatus: FetchStatus;
};

const InitialState: State = {
  notification: null,
  notificationList: [],
  EditStatus: "idle",
  saveStatus: "idle",
  deletestatus: "idle",
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
  },
});

export const { resetStatus } = notificationSlice.actions;
export default notificationSlice;
