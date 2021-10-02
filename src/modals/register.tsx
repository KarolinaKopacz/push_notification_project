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
import { FetchStatus, NewRegisterType } from "../redux/User/types";

interface Props {
  onRegisterPress: (newUser: NewRegisterType) => void;
  registerNewUser: (newUser: NewRegisterType) => void;
  isLoading: boolean;
  checkUserExistsStatus: FetchStatus;
}

export const RegisterModal = (props: Props) => {
  const { onRegisterPress, registerNewUser, checkUserExistsStatus, isLoading } =
    props;

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [newLogin, setNewLogin] = useState<string>("");
  const [userAlreadyExistsVisible, setUserAlreadyExistsVisible] =
    useState(false);

  const handleRegisterPress = () => {
    if (!newLogin || !newPassword) {
      setAlertVisible(true);
      return;
    }
    onRegisterPress({ newLogin: newLogin, newPasswordEncrypted: newPassword });
  };

  useEffect(() => {
    if (checkUserExistsStatus === "succeeded") {
      registerNewUser({
        newLogin: newLogin,
        newPasswordEncrypted: newPassword,
      });
    }

    if (checkUserExistsStatus === "failed") {
      setUserAlreadyExistsVisible(true);
    }
  }, [checkUserExistsStatus]);

  const handleFocus = () => {
    setAlertVisible(false);
    setUserAlreadyExistsVisible(false);
  };

  return (
    <>
      <Container>
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
                  value={newLogin}
                  onChange={(ev) => setNewLogin(ev.target.value)}
                  isInvalid={userAlreadyExistsVisible}
                  onFocus={handleFocus}
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
                  isInvalid={userAlreadyExistsVisible}
                  onFocus={handleFocus}
                ></Form.Control>
              </Form.Group>
              {isLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                <Button
                  className="btn-login-register"
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
