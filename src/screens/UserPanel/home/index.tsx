import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { AddNotificationModal } from "../../../modals/addNotification";
import { MenuList } from "../../../modals/menuList";

import { logout } from "../../../redux/User/reducer";

export const Home = (props: any) => {
  const { userName, userId } = props;
  const dispatch = useAppDispatch();

  const handleLogOutPress = () => {
    dispatch(logout());
  };

  return (
    <div>
      <p>Witaj, {userName}!</p>

      <button onClick={handleLogOutPress}>Wyloguj</button>
      <MenuList
        firstOption="Home"
        secondOption="Dodaj przypomnienie"
        thirdOption="Lista przypomnień"
      />
    </div>
  );
};
