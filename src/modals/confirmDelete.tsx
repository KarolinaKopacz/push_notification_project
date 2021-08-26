import { Button, Modal } from "react-bootstrap";

export const ConfirmDeleteModal = (props: any) => {
  const { showDeleteConfirm, message, onYesPress, onClosePress } = props;

  return (
    <Modal
      show={showDeleteConfirm}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onYesPress}>Tak</Button>
        <Button variant="outline-danger" onClick={onClosePress}>
          Nie
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
