import { useState } from "react";
import {
  Container,
  Button,
  Col,
  Form,
  Row,
  Alert,
  Spinner,
} from "react-bootstrap";

import { UserType } from "../redux/User/types";

interface Props {
  onLoginPress: (customUser: UserType) => void;
  isLoading: boolean;
  isInvalid: boolean;
}

export const LoginModal = (props: Props) => {
  const { onLoginPress, isLoading, isInvalid } = props;

  const [isErrorVisible, setErrorVisible] = useState(false);
  const [password, setpassword] = useState<string>("");
  const [login, setlogin] = useState<string>("");

  const handleLogInPress = () => {
    if (!login || !password) {
      setErrorVisible(true);
      return;
    }
    onLoginPress({ newLogin: login, newPasswordEncrypted: password });
  };

  return (
    <>
      <Container>
        <h1>Zaloguj się</h1>
        <Row>
          <Col sm={"auto"}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {isErrorVisible ? (
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
                  isInvalid={isInvalid}
                  onFocus={() => setErrorVisible(false)}
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
                  isInvalid={isInvalid}
                  onFocus={() => setErrorVisible(false)}
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
