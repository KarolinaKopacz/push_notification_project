import { Container, Button, Col, Form, Row } from "react-bootstrap";

export const LogInRegisterModal = (props: any) => {
  const {
    loginInputTitle,
    passwordInputTitle,
    buttonTitle,
    loginValue,
    loginFunc,
    passwordValue,
    passwordFunc,
    buttonFunc,
  } = props;

  return (
    <>
      <Container>
        <Row>
          <Col sm={"auto"}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{loginInputTitle}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter login"
                  value={loginValue}
                  onChange={loginFunc}
                ></Form.Control>
              </Form.Group>
            </Form>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>{passwordInputTitle}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={passwordValue}
                  onChange={passwordFunc}
                ></Form.Control>
              </Form.Group>
              <Button variant="primary" onClick={buttonFunc}>
                {buttonTitle}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
