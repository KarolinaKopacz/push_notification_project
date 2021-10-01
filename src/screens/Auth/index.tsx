import { Col, Row, Container, Button } from "react-bootstrap";

import { Register } from "./register";
import { LogInModal } from "./logIn";

import { useState } from "react";

export const Auth = () => {
  const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(true);

  const handleChangeToRegisterModal = () => {
    setModalRegisterVisible(true);
    setModalLoginVisible(false);
  };

  const handleChangeToLoginModal = () => {
    setModalRegisterVisible(false);
    setModalLoginVisible(true);
  };

  return (
    <Container className="container-first-page">
      <h1>Push Notification</h1>

      {modalRegisterVisible ? (
        <>
          <Row className="justify-content-md-center" lg="auto">
            <Col>
              <Register />
            </Col>
          </Row>
          <div className="straight-line"></div>
          <Row className="justify-content-md-center" lg="auto">
            <Col>
              <div className="">
                <p>
                  Masz konto?{" "}
                  <a className="a-link" onClick={handleChangeToLoginModal}>
                    Zaloguj się
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </>
      ) : null}
      {modalLoginVisible ? (
        <>
          <Row className="justify-content-md-center" lg="auto">
            <Col>
              <LogInModal />
            </Col>
          </Row>
          <div className="straight-line"></div>
          <Row className="justify-content-md-center" lg="auto">
            <Col>
              <div className="">
                <p>
                  Nie masz konta?{" "}
                  <a className="a-link" onClick={handleChangeToRegisterModal}>
                    Zarejestruj się
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </>
      ) : null}
    </Container>
  );
};
