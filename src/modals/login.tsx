import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Col,
  Form,
  Row,
  Alert,
  Spinner,
} from "react-bootstrap";

import { FetchStatus, UserType } from "../redux/User/types";

interface Props {
  onLoginPress: (customUser: UserType) => void;
  loginUser: (customUser: UserType) => void;
  isLoading: boolean;
  loginStatus: FetchStatus;
}

export const LoginModal = (props: Props) => {
  const { onLoginPress, isLoading, loginStatus, loginUser } = props;

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [loginOrPasswordWrongVisible, setLoginOrPasswordWrongVisible] =
    useState(false);
  const [password, setpassword] = useState<string>("");
  const [login, setlogin] = useState<string>("");

  const handleLogInPress = () => {
    if (!login || !password) {
      setAlertVisible(true);
      return;
    }
    onLoginPress({ newLogin: login, newPasswordEncrypted: password });
  };

  useEffect(() => {
    if (loginStatus === "succeeded") {
      loginUser({
        newLogin: login,
        newPasswordEncrypted: password,
      });
    }

    if (loginStatus === "failed") {
      setLoginOrPasswordWrongVisible(true);
    }
  }, [loginStatus]);

  const handleFocus = () => {
    setAlertVisible(false);
    setLoginOrPasswordWrongVisible(false);
  };

  return (
    <>
      <Container>
        <h1>Zaloguj się</h1>
        <Row>
          <Col sm={"auto"}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {isAlertVisible ? (
                  <Alert variant="danger">
                    <Alert.Heading></Alert.Heading>
                    Wypełnij wszystkie pola
                  </Alert>
                ) : null}

                <Form.Control
                  type="text"
                  placeholder="Wpisz login"
                  value={login}
                  onChange={(ev) => setlogin(ev.target.value)}
                  isInvalid={loginOrPasswordWrongVisible}
                  onFocus={handleFocus}
                ></Form.Control>
              </Form.Group>
            </Form>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Wpisz hasło"
                  value={password}
                  onChange={(ev) => setpassword(ev.target.value)}
                  isInvalid={loginOrPasswordWrongVisible}
                  onFocus={handleFocus}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Login lub hasło nieprawidłowe
                </Form.Control.Feedback>
              </Form.Group>
              {isLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                <Button variant="outline-secondary" onClick={handleLogInPress}>
                  Zaloguj
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
