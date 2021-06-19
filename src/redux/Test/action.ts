export enum TestAction {
  RESET = "test/RESET",
  SET = "test/SET",
}

export type TestActionType =
  | {
      type: TestAction.RESET;
    }
  | {
      type: TestAction.SET;
      payload: { value: number };
    };
