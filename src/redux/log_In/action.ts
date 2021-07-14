import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "./types";
import { omit } from "remeda";

const logIn = createAsyncThunk(
  "users/LOGIN_USERS",
  async ({
    customLogin,
    customPassword,
  }: {
    customLogin: string;
    customPassword: string;
  }) => {
    return await fetch("https://userdatabase-9fd5.restdb.io/rest/users2", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": "60d16898e2c96c46a24637ee",
      },
    }).then(async (response) => {
      if (response.ok) {
        const allUsers = (await response.json()) as UserType[];
        const user = allUsers.find(
          (currentUser) =>
            currentUser.login === customLogin &&
            currentUser.password === customPassword
        );
        if (!user) {
          throw new Error("user not found");
        }
        return omit(user, ["password"]);
      }
      throw new Error(response.statusText);
    });
  }
);

export { logIn };
