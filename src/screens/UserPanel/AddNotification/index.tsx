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
    dispatch(
      saveNewNotification({
        description: notName,
        date: customDate,
        time: customTime,
      })
    );
    setShowModal(false);
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
        onPress={handleSavePress}
        dateValue={customDate}
        onChangeDate={(ev: any) => setCustomDate(ev.target.value)}
        timeValue={customTime}
        onChangeTime={(ev: any) => setCustomTime(ev.target.value)}
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
