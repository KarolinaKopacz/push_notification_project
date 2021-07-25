import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/User/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
