import { createAsyncThunk } from "@reduxjs/toolkit";

import { omit } from "remeda";

const checkUserExists = createAsyncThunk(
  "users/CHECK_USERS_EXISTS",
  async ({ newLogin }: { newLogin: string }, thunkApi) => {
    return await fetch("https://userdatabase-9fd5.restdb.io/rest/users2", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": "60d16898e2c96c46a24637ee",
      },
    }).then(async (response) => {
      // if (response.ok) {
      const allUsers = (await response.json()) as {
        login: string;
        password: string;
        _id: number;
      }[];
      const user = allUsers.find(
        (currentUser) => currentUser.login === newLogin
      );
      console.log("user", user);

      if (user) {
        throw new Error("login is unavailable");
      }

      return user;
    });
  }
);

const registerNewUser = createAsyncThunk(
  "users/REGISTER_USER",
  async ({
    newLogin,
    newPassword,
  }: {
    newLogin: string;
    newPassword: string;
  }) => {
    const newUser = { newLogin, newPassword };
    return await fetch("https://userdatabase-9fd5.restdb.io/rest/users2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": "60d16898e2c96c46a24637ee",
      },

      body: JSON.stringify(newUser),
    }).then((response) => {
      if (response.ok) {
        return { newUser };
      }
      throw new Error(response.statusText);
    });
  }
);

export { checkUserExists, registerNewUser };
