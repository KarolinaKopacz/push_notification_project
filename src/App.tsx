import React from "react";
import "./style.css";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppSelector } from "./hooks/useAppSelector";

import { Auth } from "./screens/Auth";
import { Home } from "./screens/UserPanel/home";
import { Col, Row, Container } from "react-bootstrap";

function App() {
  const userIsLogged = useAppSelector((state) => state.user.user);

  return (
    <>
      <Container>
        <Row>
          <Col>
            {userIsLogged ? (
              <Home
                userName={userIsLogged.newLogin}
                userId={userIsLogged._id}
              />
            ) : (
              <Auth />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
