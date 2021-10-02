import { useEffect } from "react";
import { useState } from "react";

import {
  Alert,
  Button,
  FormControl,
  InputGroup,
  Modal,
  Spinner,
} from "react-bootstrap";

import { Notification } from "../redux/Notification/types";

interface Props {
  onSavePress: (editedNotifcation: Notification) => void;
  dateAndTimeSectionName: string;
  notification?: Notification;
  notificationName: string;
  onClosePress: () => void;
  isLoading: boolean;
  title: string;
}

export const ModalForEditNotification = (props: Props) => {
  const {
    notification,
    title,
    onSavePress,
    onClosePress,
    notificationName,
    dateAndTimeSectionName,
    isLoading,
  } = props;

  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();

  const [isErrorVisible, setErrorVisible] = useState(false);

  useEffect(() => {
    if (!notification) {
      return;
    }

    setDescription(notification.description);
    setDate(notification.date);
    setTime(notification.time);
  }, [notification]);

  const handleSavePress = () => {
    if (!notification) {
      return;
    }

    if (!description || !date || !time) {
      setErrorVisible(true);
      return;
    }

    onSavePress({
      userId: notification.userId,
      _id: notification._id,
      description: description,
      date: date,
      time: time,
      dateObj: new Date(),
      isFinish: false,
    });
  };

  const handleClosePress = () => {
    setErrorVisible(false);
    onClosePress();
  };

  return (
    <Modal
      show={Boolean(notification)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      {notification ? (
        <Modal.Body>
          {isErrorVisible ? (
            <Alert variant="danger">
              <Alert.Heading></Alert.Heading>
              Wszystkie pola muszą być uzupełnione
            </Alert>
          ) : null}

          <p className="p-in-modal">{notificationName}</p>
          <InputGroup className="mb-3">
            <FormControl
              as="textarea"
              type="text"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            ></FormControl>
          </InputGroup>

          <p className="p-in-modal">{dateAndTimeSectionName}</p>
          <InputGroup className="mb-3">
            <FormControl
              type="date"
              value={date}
              onChange={(ev) => setDate(ev.target.value)}
            />
            <FormControl
              type="time"
              value={time}
              onChange={(ev) => setTime(ev.target.value)}
            />
          </InputGroup>
        </Modal.Body>
      ) : null}
      <Modal.Footer>
        {isLoading ? (
          <Spinner animation="border" variant="secondary" role="status" />
        ) : (
          <>
            <Button variant="outline-danger" onClick={() => handleClosePress()}>
              Zamknij
            </Button>
            <Button variant="outline-success" onClick={() => handleSavePress()}>
              Zapisz
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};
