import { Article } from "./types";

export enum ArticlesAction {
  ADD = "articles/ADD",
  REMOVE = "articles/REMOVE",
}

export type ArticlesActionType =
  | {
      type: ArticlesAction.ADD;
      payload: { article: Article };
    }
  | {
      type: ArticlesAction.REMOVE;
      payload: { id: number };
    };
