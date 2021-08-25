import { useState } from "react";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { Alert, Button } from "react-bootstrap";

import { AddNotificationModal } from "../../../modals/addNotification";
import { saveNewNotification } from "../../../redux/Notification/action";
import { resetStatus } from "../../../redux/Notification/reducer";
import { useEffect } from "react";

export const AddNotificationView = () => {
  const [notName, setNotName] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useAppDispatch();

  const saveStatus = useAppSelector((state) => state.notification.saveStatus);

  useEffect(() => {
    if (saveStatus === "succeeded") {
      const timeout = setTimeout(() => {
        dispatch(resetStatus());
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [saveStatus]);

  const handleSavePress = () => {
    if (notName === "" || customDate === "" || customTime === "") {
      setShowAlert(true);
      setNotName("");
      return null;
    }
    dispatch(
      saveNewNotification({
        description: notName,
        date: customDate,
        time: customTime,
      })
    );
    setShowModal(false);
    setNotName("");
  };

  const handleClosePress = () => {
    setShowModal(false);
    setShowAlert(false);
    setNotName("");
  };
  return (
    <>
      <Button
        variant="outline-success"
        size="lg"
        onClick={() => setShowModal(true)}
      >
        Dodaj przypomnienie
      </Button>
      <AddNotificationModal
        show={showModal}
        title="Przypomnienie"
        notificationName="Nazwa przypomnienia"
        dateAndTimeSectionName="Ustaw czas przypomnienia"
        saveButtonName="Zapisz"
        notificationNameValue={notName}
        onChangeNotificationName={(ev: any) => setNotName(ev.target.value)}
        onSavePress={handleSavePress}
        onClosePress={handleClosePress}
        dateValue={customDate}
        onChangeDate={(ev: any) => setCustomDate(ev.target.value)}
        timeValue={customTime}
        onChangeTime={(ev: any) => setCustomTime(ev.target.value)}
        showAlert={showAlert}
      />

      {saveStatus === "succeeded" ? (
        <Alert
          variant="success"
          dismissible={true}
          onClose={() => dispatch(resetStatus())}
        >
          Przypomnienie zapisane!
        </Alert>
      ) : null}
      {saveStatus === "loading" ? (
        <Alert variant="warning">Zapisywanie...</Alert>
      ) : null}
      {saveStatus === "failed" ? (
        <Alert variant="danger">Przypomnienie nie zapisane</Alert>
      ) : null}
    </>
  );
};
