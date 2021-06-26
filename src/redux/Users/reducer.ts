import { UserAction, UserActionType } from "./action";
import { UsersType } from "./types";

export type State = {
  list: UsersType[];
};

const InitialState: State = {
  list: [],
};

export function reducer(state: State, action: UserActionType) {
  switch (action.type) {
    case UserAction.LOGIN:
      return {
        ...state,
        users: [...state.list, action.payload.user],
      };
    case UserAction.LOGOUT: {
      return {
        ...state,
        users: state.list.filter((user) => user._id !== action.payload._id),
      };
    }
    default: {
      return {
        ...InitialState,
      };
    }
  }
}
