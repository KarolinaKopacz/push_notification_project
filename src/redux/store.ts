import { combineReducers } from "redux";
import { Store } from "redux";
import { createStore } from "redux";

import { TestActionType } from "./Test/action";
import { reducer as testRecuder, State as TestState } from "./Test/reducer";

import { ArticlesActionType } from "./Articles/action";
import {
  reducer as articlesReducer,
  State as ArticlesState,
} from "./Articles/reducer";

type AppAction = TestActionType | ArticlesActionType;

export type AppState = {
  test: TestState;
  articles: ArticlesState;
};

const store: Store<AppState, AppAction> = createStore(
  combineReducers({
    test: testRecuder,
    articles: articlesReducer,
  }),
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export type AppDispatch = typeof store.dispatch;
export { store };
