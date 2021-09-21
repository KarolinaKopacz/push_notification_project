import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container } from "react-bootstrap";

import { useAppSelector } from "./hooks/useAppSelector";

import { Home } from "./screens/UserPanel/home";
import { Auth } from "./screens/Auth";

import "./style.css";

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
