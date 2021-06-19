import { TestAction, TestActionType } from "./action";

export type State = {
  value: number;
};

const InitialState: State = {
  value: 0,
};

export function reducer(state: State, action: TestActionType) {
  switch (action.type) {
    case TestAction.SET:
      return { ...state, value: state.value + action.payload.value };
    case TestAction.RESET: {
      return {
        ...InitialState,
      };
    }
    default: {
      return {
        ...InitialState,
      };
    }
  }
}
