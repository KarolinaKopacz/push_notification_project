import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Store } from "redux";
import { createStore } from "redux";

import userSlice, { State as UserState } from "./reducer";

export type AppState = {
  user: UserState;
};

const store: Store<AppState, any> = configureStore({
  reducer: { user: userSlice.reducer },
  middleware: [...getDefaultMiddleware()],
});

export type AppDispatch = typeof store.dispatch;
export { store };
