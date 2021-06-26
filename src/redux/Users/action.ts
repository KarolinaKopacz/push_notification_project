import { UsersType } from "./types";

export enum UserAction {
  LOGIN = "user/LOGIN",
  LOGOUT = "user/LOGOUT",
}

export type UserActionType =
  | {
      type: UserAction.LOGIN;
      payload: { user: UsersType };
    }
  | {
      type: UserAction.LOGOUT;
      payload: { _id: number };
    };
