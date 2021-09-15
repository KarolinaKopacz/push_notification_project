import { useEffect } from "react";
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
import { NewRegisterType } from "../redux/User/types";

interface Props {
  onRegisterPress: (newUser: NewRegisterType) => void;
  registerNewUser: (newUser: NewRegisterType) => void;
  isLoading: boolean;
  isInvalid: boolean;
  status: string;
}

export const RegisterModal = (props: Props) => {
  const { onRegisterPress, registerNewUser, status, isLoading, isInvalid } =
    props;

  const [isErrorVisible, setErrorVisible] = useState(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [newLogin, setNewLogin] = useState<string>("");

  const handleRegisterPress = () => {
    if (!newLogin || !newPassword) {
      setErrorVisible(true);
      return;
    }
    onRegisterPress({ newLogin: newLogin, newPasswordEncrypted: newPassword });
  };

  useEffect(() => {
    if (status === "succeeded") {
      registerNewUser({
        newLogin: newLogin,
        newPasswordEncrypted: newPassword,
      });
    }
  }, [status]);

  return (
    <>
      <Container>
        <h1>Zarejestruj się</h1>
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
                  value={newLogin}
                  onChange={(ev) => setNewLogin(ev.target.value)}
                  isInvalid={isInvalid}
                  onFocus={() => setErrorVisible(false)}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Login już istnieje.
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Wpisz hasło"
                  value={newPassword}
                  onChange={(ev) => setNewPassword(ev.target.value)}
                  isInvalid={isInvalid}
                  onFocus={() => setErrorVisible(false)}
                ></Form.Control>
              </Form.Group>
              {isLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                <Button
                  variant="outline-secondary"
                  onClick={handleRegisterPress}
                >
                  Utwórz konto
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
