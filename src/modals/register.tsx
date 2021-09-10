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
  status: string;
  isLoading: boolean;
}

export const RegisterModal = (props: Props) => {
  const { onRegisterPress, registerNewUser, status, isLoading } = props;

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
                  value={newLogin}
                  onChange={(ev) => setNewLogin(ev.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={newPassword}
                  onChange={(ev) => setNewPassword(ev.target.value)}
                ></Form.Control>
              </Form.Group>
              {isLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                <Button variant="primary" onClick={handleRegisterPress}>
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
