import { Button, Modal } from "react-bootstrap";

export const AddNotificationModal = (props: any) => {
  const {
    show,
    title,
    notificationName,
    dateAndTimeSectionName,
    notificationNameValue,
    onChangeNotificationName,
    onSavePress,
    onClosePress,
    onChangeDate,
    onChangeTime,
    defaultValue,
    defaultDateValue,
    defaultTimeValue,
  } = props;

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
        <div className="small-component">
          <p>{notificationName}</p>
          <input
            type="text"
            defaultValue={defaultValue}
            value={notificationNameValue}
            onChange={onChangeNotificationName}
          ></input>
        </div>
        <div className="small-component pwd-container">
          <p>{dateAndTimeSectionName}</p>
          <input
            type="date"
            defaultValue={defaultDateValue}
            onChange={onChangeDate}
          />
          <input
            type="time"
            defaultValue={defaultTimeValue}
            onChange={onChangeTime}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSavePress}>Zapisz</Button>
        <Button variant="outline-danger" onClick={onClosePress}>
          Zamknij
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
