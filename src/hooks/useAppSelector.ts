import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import { AppState } from "../redux/User/store";

export const useAppSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
