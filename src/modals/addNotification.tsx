import { useState } from "react";

import {
  Alert,
  Button,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Spinner,
} from "react-bootstrap";

import { Notification } from "../redux/Notification/types";

interface Props {
  onSavePress: (newNotification: Notification) => void;
  dateAndTimeSectionName: string;
  notificationName: string;
  onClosePress: () => void;
  isLoading: boolean;
  title: string;
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

  const [isErrorVisible, setErrorVisible] = useState(false);
  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();

  const handleSavePress = () => {
    if (!description || !date || !time) {
      setErrorVisible(true);
      return;
    }

    onSavePress({
      userId: "",
      _id: "",
      dateObj: new Date(),
      description: description,
      date: date,
      time: time,
      isFinish: false,
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
        <p className="p-in-modal">{notificationName}</p>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            onFocus={() => setErrorVisible(false)}
          />
        </InputGroup>

        <p className="p-in-modal">{dateAndTimeSectionName}</p>

        <InputGroup className="mb-3">
          <Form.Control
            type="date"
            name="duedate"
            placeholder="Due date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onFocus={() => setErrorVisible(false)}
          />

          <FormControl
            type="time"
            value={time}
            onChange={(ev) => setTime(ev.target.value)}
            onFocus={() => setErrorVisible(false)}
          />
        </InputGroup>
        <InputGroup className="mb-3"></InputGroup>
      </Modal.Body>

      <Modal.Footer>
        {isLoading ? (
          <Spinner animation="border" role="status" />
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
