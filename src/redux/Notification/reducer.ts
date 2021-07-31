import { createSlice } from "@reduxjs/toolkit";

import { NotificationType, NotificationList } from "./types";
import { saveNewNotification } from "./action";

type FetchStatus = "loading" | "succeeded" | "failed" | "idle";

export type State = {
  notification: NotificationType | null;
  notificationList: NotificationList[];
  EditStatus: FetchStatus;
  saveStatus: FetchStatus;
  deletestatus: FetchStatus;
};

const InitialState: State = {
  notification: null,
  notificationList: [],
  EditStatus: "idle",
  saveStatus: "idle",
  deletestatus: "idle",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export const {} = notificationSlice.actions;
export default notificationSlice;
