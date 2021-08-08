import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap";

import { LogInModal } from "./logIn";
import { Register } from "./register";

export const Auth = () => {
  return (
    <Router>
      <Container>
        <Row>
          <Col>
            <Button variant="outline-secondary">
              <Link to="/register">Zarejestruj sie</Link>
            </Button>

            <Button variant="outline-secondary">
              <Link to="/log-in">Zaloguj się</Link>
            </Button>
          </Col>
        </Row>
      </Container>

      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/log-in">
          <LogInModal />
        </Route>
      </Switch>
    </Router>
  );
};
