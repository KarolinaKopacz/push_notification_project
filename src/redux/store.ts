import { combineReducers } from "redux";
import { Store } from "redux";
import { createStore } from "redux";

import { UserActionType } from "./Users/action";
import { reducer as userReducer, State as userState } from "./Users/reducer";

type AppAction = UserActionType;

export type AppState = {
  articles: userState;
};

const store: Store<AppState, AppAction> = createStore(
  combineReducers({
    articles: userReducer,
  }),
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export type AppDispatch = typeof store.dispatch;
export { store };
