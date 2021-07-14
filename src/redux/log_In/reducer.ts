import { createSlice } from "@reduxjs/toolkit";
import { isConstructSignatureDeclaration } from "typescript";
import { logIn } from "./action";

import { LoggedInUserType, UserType } from "./types";

export type State = {
  user: LoggedInUserType | null;
  status: "loading" | "succeeded" | "failed" | "idle";
};

const InitialState: State = {
  user: null,
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState: InitialState,
  reducers: {
    resetStatus(state: State) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.user = action.payload as LoggedInUserType;
      state.status = "succeeded";
      console.log("action", action);
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const { resetStatus } = userSlice.actions;
export default userSlice;
