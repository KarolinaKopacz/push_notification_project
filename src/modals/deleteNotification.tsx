import { Button, Modal, Spinner } from "react-bootstrap";

import { DeleteNotificationType } from "../redux/Notification/types";

interface Props {
  onConfirmPress: (deleteNotification: DeleteNotificationType) => void;
  notification?: DeleteNotificationType;
  onClosePress: () => void;
  isLoading: boolean;
  message: string;
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
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {message}
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            {isLoading ? (
              <Spinner animation="border" variant="secondary" role="status" />
            ) : (
              <>
                <Button variant="outline-danger" onClick={handleClosePress}>
                  Nie
                </Button>
                <Button
                  variant="outline-success"
                  onClick={handleConfirmDeletePress}
                >
                  Tak
                </Button>
              </>
            )}
          </Modal.Footer>
        </>
      ) : null}
    </Modal>
  );
};
