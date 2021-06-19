import { ArticlesAction, ArticlesActionType } from "./action";
import { Article } from "./types";

export type State = {
  list: Article[];
};

const InitialState: State = {
  list: [],
};

export function reducer(state: State, action: ArticlesActionType) {
  switch (action.type) {
    case ArticlesAction.ADD:
      return {
        ...state,
        articles: [...state.list, action.payload.article],
      };
    case ArticlesAction.REMOVE: {
      return {
        ...state,
        articles: state.list.filter(
          (article) => article.id !== action.payload.id
        ),
      };
    }
    default: {
      return {
        ...InitialState,
      };
    }
  }
}
