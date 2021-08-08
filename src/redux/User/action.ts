import { createAsyncThunk } from "@reduxjs/toolkit";

import { omit } from "remeda";
import { crypt } from "../../components/encryptionFunc";
import { UserType } from "./types";

const fetchURL = "https://random-a2c6.restdb.io/rest/randomus";
const urlPass = "610e949a69fac573b50a52f5";

const checkUserExists = createAsyncThunk(
  "users/CHECK_USERS_EXISTS",
  async ({ newLogin }: { newLogin: string }) => {
    // I know I  should put it in the backend, but this is just a playground
    return await fetch(fetchURL, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": urlPass,
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
    // I know I  should put it in the backend, but this is just a playground
    let newPasswordEncrypted = crypt.encrypt(newPassword);
    const newUser = { newLogin, newPasswordEncrypted };

    return await fetch(fetchURL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": urlPass,
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

const logIn = createAsyncThunk(
  "users/LOGIN_USERS",
  async ({
    customLogin,
    customPassword,
  }: {
    customLogin: string;
    customPassword: string;
  }) => {
    return await fetch(fetchURL, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": urlPass,
      },
    }).then(async (response) => {
      if (response.ok) {
        const allUsers = (await response.json()) as UserType[];

        const user = allUsers.find(
          (currentUser) =>
            currentUser.newLogin === customLogin &&
            crypt.decrypt(currentUser.newPasswordEncrypted).toString() ===
              customPassword
        );

        if (!user) {
          throw new Error("user not found");
        }
        return omit(user, ["newPasswordEncrypted"]);
      }
      throw new Error(response.statusText);
    });
  }
);

export { checkUserExists, registerNewUser, logIn };
