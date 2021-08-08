import { Alert, Button } from "react-bootstrap";

export const AlertModal = (props: any) => {
  const { message, confirm, onPress } = props;
  return (
    <Alert key={"idx"} variant={"danger"}>
      <p>{message}</p>
      <Button variant="outline-danger" onClick={onPress}>
        {confirm}
      </Button>
    </Alert>
  );
};
