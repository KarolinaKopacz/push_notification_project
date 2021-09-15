import { Button, Nav } from "react-bootstrap";

import { useAppDispatch } from "../hooks/useAppDispatch";

import { logout } from "../redux/User/reducer";

interface Props {
  userName: string;
}
export const Header = (props: Props) => {
  const { userName } = props;

  const dispatch = useAppDispatch();

  const handleLogOutPress = () => {
    dispatch(logout());
  };

  return (
    <Nav className="justify-content-end" justify variant="tabs">
      <Nav.Item>
        <h2>Witaj, {userName}!</h2>
      </Nav.Item>
      <Nav.Item>
        <Button
          className="button-to-logout"
          variant="outline-secondary"
          onClick={handleLogOutPress}
        >
          Wyloguj
        </Button>
      </Nav.Item>
    </Nav>
  );
};
