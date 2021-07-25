import { createSlice } from "@reduxjs/toolkit";
import { checkUserExists, logIn, registerNewUser } from "./action";
import { NewRegisterType, LoggedInUserType } from "./types";

type FetchStatus = "loading" | "succeeded" | "failed" | "idle";

export type State = {
  user: NewRegisterType | LoggedInUserType | null;
  usersList: NewRegisterType[];
  loginStatus: FetchStatus;
  checkUserExistsStatus: FetchStatus;
  registerNewUserStatus: FetchStatus;
};

const InitialState: State = {
  user: null,
  usersList: [],
  loginStatus: "idle",
  checkUserExistsStatus: "idle",
  registerNewUserStatus: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState: InitialState,
  reducers: {
    resetStatus(state: State) {
      state.checkUserExistsStatus = "idle";
      state.loginStatus = "idle";
    },
    logout(state: State) {
      state.user = null;
      state.loginStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    // check if user exists
    builder.addCase(checkUserExists.pending, (state, action) => {
      state.checkUserExistsStatus = "loading";
    });
    builder.addCase(checkUserExists.fulfilled, (state, action) => {
      state.checkUserExistsStatus = "succeeded";
    });
    builder.addCase(checkUserExists.rejected, (state, action) => {
      state.checkUserExistsStatus = "failed";
    });

    // register
    builder.addCase(registerNewUser.pending, (state, action) => {
      state.registerNewUserStatus = "loading";
    });
    builder.addCase(registerNewUser.fulfilled, (state, action) => {
      if ("newUser" in action.payload) {
        state.usersList.push(action.payload.newUser as NewRegisterType);
      }
      state.registerNewUserStatus = "succeeded";
    });
    builder.addCase(registerNewUser.rejected, (state, action) => {
      state.registerNewUserStatus = "failed";
    });

    // log in
    builder.addCase(logIn.pending, (state, action) => {
      state.loginStatus = "loading";
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.user = action.payload as LoggedInUserType;
      state.loginStatus = "succeeded";
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.loginStatus = "failed";
    });
  },
});

export const { resetStatus, logout } = userSlice.actions;
export default userSlice;
