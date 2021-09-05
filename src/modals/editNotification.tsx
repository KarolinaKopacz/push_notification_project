import { useEffect } from "react";
import { useState } from "react";

import { Alert, Button, Modal, Spinner } from "react-bootstrap";

import { NotificationList } from "../redux/Notification/types";

interface Props {
  title: string;
  notificationName: string;
  dateAndTimeSectionName: string;
  notification?: NotificationList;
  onSavePress: (editedNotifcation: NotificationList) => void;
  onClosePress: () => void;
  isLoading: boolean;
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
      _id: notification._id,
      description: description,
      date: date,
      time: time,
      dateObj: new Date(),
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
      ) : null}
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
