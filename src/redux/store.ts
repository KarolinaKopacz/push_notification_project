import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Store } from "redux";
import { createStore } from "redux";

import userSlice, { State as UserState } from "./log_In/reducer";
import registerNewUserSlice, {
  State as RegisterState,
} from "./register/reducer";

export type AppState = {
  user: UserState;
  newUser: RegisterState;
};

const store: Store<AppState, any> = configureStore({
  reducer: { user: userSlice.reducer, newUser: registerNewUserSlice.reducer },
  middleware: [...getDefaultMiddleware()],
});

export type AppDispatch = typeof store.dispatch;
export { store };
