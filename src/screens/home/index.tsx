import { useAppDispatch } from "../../hooks/useAppDispatch";

import { logout } from "../../redux/reducer";

export const Home = (props: any) => {
  const { userName } = props;
  const dispatch = useAppDispatch();

  const handleLogOutPress = () => {
    dispatch(logout());
  };

  return (
    <div>
      <p>{userName}</p>
      <button onClick={handleLogOutPress}>Wyloguj</button>
    </div>
  );
};
