import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";

import { store, persistor } from "./redux/store";

import { PersistGate } from "redux-persist/es/integration/react";

import { Col, Container, Row } from "react-bootstrap";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Container fluid>
          <Row>
            <Col>
              <App />
            </Col>
          </Row>
        </Container>
      </PersistGate>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);
