import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import { AppState } from "../redux/store";

export const useAppSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
