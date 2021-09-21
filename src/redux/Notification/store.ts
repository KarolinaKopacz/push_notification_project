import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Store } from "redux";

import notificationSlice, { State as NotificationState } from "./reducer";

export type AppState = {
  notification: NotificationState;
};

const storeNotification: Store<AppState, any> = configureStore({
  reducer: { notification: notificationSlice.reducer },
  middleware: [...getDefaultMiddleware()],
});

export type AppDispatch = typeof storeNotification.dispatch;
export { storeNotification };
