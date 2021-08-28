import { useState } from "react";

import { Button, Modal, Spinner } from "react-bootstrap";
import { DeleteNotificationType } from "../redux/Notification/types";

interface Props {
  notification?: DeleteNotificationType;
  message: string;
  onConfirmPress: (deleteNotification: DeleteNotificationType) => void;
  onClosePress: () => void;
  isLoading: boolean;
}

export const ConfirmDeleteModal = (props: Props) => {
  const { onConfirmPress, message, onClosePress, notification, isLoading } =
    props;

  const handleConfirmDeletePress = () => {
    onConfirmPress({ _id: notification?._id });
  };

  const handleClosePress = () => {
    onClosePress();
  };

  return (
    <Modal
      show={Boolean(notification)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {notification ? (
        <>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            {isLoading ? (
              <Spinner animation="border" role="status" />
            ) : (
              <>
                <Button onClick={handleConfirmDeletePress}>Tak</Button>
                <Button variant="outline-danger" onClick={handleClosePress}>
                  Nie
                </Button>
              </>
            )}
          </Modal.Footer>
        </>
      ) : null}
    </Modal>
  );
};
