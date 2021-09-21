import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


import { Col, Row, Container, Button } from "react-bootstrap";

import { Register } from "./register";
import { LogInModal } from "./logIn";

import { useState } from "react";

export const Auth = () => {
  const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);

  return (
    <Container className="container-first-page">
      {!modalLoginVisible && !modalRegisterVisible ? (
        <>
          <Row className="justify-content-md-center" lg="auto">
            <Col>
              <Button
                onClick={() => setModalLoginVisible(true)}
                variant="outline-secondary"
                size="lg"
              >
                Zaloguj się
              </Button>
            </Col>
          </Row>

          <Row className="justify-content-md-center" lg="auto">
            <Col>
              <Button
                onClick={() => setModalRegisterVisible(true)}
                variant="outline-secondary"
                size="lg"
              >
                Zarejestruj sie
              </Button>
            </Col>
          </Row>
        </>
      ) : null}
      {modalRegisterVisible ? (
        <Row className="justify-content-md-center" lg="auto">
          <Col>
            <Register />
          </Col>
        </Row>
      ) : null}
      {modalLoginVisible ? (
        <Row className="justify-content-md-center" lg="auto">
          <Col>
            <LogInModal />
          </Col>
        </Row>
      ) : null}
    </Container>

  );
};
