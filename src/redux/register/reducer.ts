import { createSlice } from "@reduxjs/toolkit";
import { checkUserExists, registerNewUser } from "./action";
import { NewRegisterType } from "./types";

type FetchStatus = "loading" | "succeeded" | "failed" | "idle";

export type State = {
  user: NewRegisterType | null;
  usersList: NewRegisterType[];
  checkUserExistsStatus: FetchStatus;
  registerNewUserStatus: FetchStatus;
};

const InitialState: State = {
  user: null,
  usersList: [],
  checkUserExistsStatus: "idle",
  registerNewUserStatus: "idle",
};

export const registerNewUserSlice = createSlice({
  name: "registerUser",
  initialState: InitialState,
  reducers: {
    resetStatus(state: State) {
      state.checkUserExistsStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    // check if user exists
    builder.addCase(checkUserExists.pending, (state, action) => {
      state.checkUserExistsStatus = "loading";
    });
    builder.addCase(checkUserExists.fulfilled, (state, action) => {
      state.checkUserExistsStatus = "succeeded";
      console.log("action", action);
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
        console.log(
          "push",
          state.usersList.push(action.payload.newUser as NewRegisterType)
        );
        state.usersList.push(action.payload.newUser as NewRegisterType);
      }
      state.registerNewUserStatus = "succeeded";
      console.log("register", action);
    });
    builder.addCase(registerNewUser.rejected, (state, action) => {
      state.registerNewUserStatus = "failed";
    });
  },
});

export const { resetStatus } = registerNewUserSlice.actions;
export default registerNewUserSlice;
