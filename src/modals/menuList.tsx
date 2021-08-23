import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Nav } from "react-bootstrap";

import { useAppDispatch } from "../hooks/useAppDispatch";

import { ListOfNotifications } from "../screens/UserPanel/ListOfNotification";
import { AddNotificationView } from "../screens/UserPanel/AddNotification";
import { logout } from "../redux/User/reducer";

export const MenuList = (props: any) => {
  const { firstOption, secondOption, thirdOption, userName } = props;

  const dispatch = useAppDispatch();

  const handleLogOutPress = () => {
    dispatch(logout());
  };
  return (
    <Router>
      <Nav className="justify-content-end" justify variant="tabs">
        <Nav.Item>
          <Link to={`/ ${firstOption}`}>{firstOption}</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={`/ ${secondOption}`}>{secondOption}</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={`/ ${thirdOption}`}>{thirdOption}</Link>
        </Nav.Item>
        <Nav.Item>
          <p>Witaj, {userName}!</p>

          <button onClick={handleLogOutPress}>Wyloguj</button>
        </Nav.Item>
      </Nav>
      <Switch>
        <Route path={`/ ${firstOption}`}>
          <p>Home</p>
        </Route>
        <Route path={`/ ${secondOption}`}>
          <AddNotificationView />
        </Route>
        <Route path={`/ ${thirdOption}`}>
          <ListOfNotifications />
        </Route>
      </Switch>
    </Router>
  );
};
