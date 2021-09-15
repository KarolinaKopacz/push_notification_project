import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container } from "react-bootstrap";

import "./style.css";

import { useAppSelector } from "./hooks/useAppSelector";

import { Home } from "./screens/UserPanel/Home";
import { Auth } from "./screens/Auth";

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
