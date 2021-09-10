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
}

export const LoginModal = (props: Props) => {
  const { onLoginPress, isLoading } = props;

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
                <Form.Label>Login</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter login"
                  value={login}
                  onChange={(ev) => setlogin(ev.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(ev) => setpassword(ev.target.value)}
                ></Form.Control>
              </Form.Group>
              {isLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                <Button variant="primary" onClick={handleLogInPress}>
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
