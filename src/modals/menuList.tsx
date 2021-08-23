import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Nav } from "react-bootstrap";

import { useAppDispatch } from "../hooks/useAppDispatch";

import { ListOfNotifications } from "../screens/UserPanel/ListOfNotification";
import { AddNotificationView } from "../screens/UserPanel/AddNotification";
import { logout } from "../redux/User/reducer";

export const MenuList = (props: any) => {
  const { userName } = props;

  const dispatch = useAppDispatch();

  const handleLogOutPress = () => {
    dispatch(logout());
  };
  return (
    <Nav className="justify-content-end" justify variant="tabs">
      <Nav.Item>
        <p>Witaj, {userName}!</p>

        <button onClick={handleLogOutPress}>Wyloguj</button>
      </Nav.Item>
    </Nav>
  );
};
