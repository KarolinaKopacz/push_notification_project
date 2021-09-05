import { getHours, setHours } from "date-fns";
import { useState } from "react";

import { Alert, Button, Modal, Spinner } from "react-bootstrap";

import { AddedNewNotificationType } from "../redux/Notification/types";

interface Props {
  title: string;
  notificationName: string;
  dateAndTimeSectionName: string;
  onSavePress: (newNotification: AddedNewNotificationType) => void;
  onClosePress: () => void;
  isLoading: boolean;
  show: boolean;
}

export const ModalForAddNotification = (props: Props) => {
  const {
    title,
    onSavePress,
    onClosePress,
    notificationName,
    dateAndTimeSectionName,
    isLoading,
    show,
  } = props;

  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();
  const [isErrorVisible, setErrorVisible] = useState(false);

  const handleSavePress = () => {
    if (!description || !date || !time) {
      setErrorVisible(true);
      return;
    }

    onSavePress({
      description: description,
      date: date,
      time: time,
    });

    setDescription("");
    setDate("");
    setTime("");
  };

  const handleClosePress = () => {
    setErrorVisible(false);
    onClosePress();
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {isErrorVisible ? (
          <Alert variant="danger">
            <Alert.Heading></Alert.Heading>
            Wszystkie pola muszą być uzupełnione
          </Alert>
        ) : null}
        <p>{notificationName}</p>
        <input
          type="text"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></input>

        <p>{dateAndTimeSectionName}</p>
        <input
          type="date"
          value={date}
          onChange={(ev) => setDate(ev.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(ev) => setTime(ev.target.value)}
        />
      </Modal.Body>

      <Modal.Footer>
        {isLoading ? (
          <Spinner animation="border" role="status" />
        ) : (
          <>
            <Button onClick={() => handleSavePress()}>Zapisz</Button>
            <Button variant="outline-danger" onClick={() => handleClosePress()}>
              Zamknij
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};
