import { useEffect } from "react";
import { useState } from "react";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { Alert, Button } from "react-bootstrap";

import { AddedNewNotificationType } from "../../../redux/Notification/types";
import { ModalForAddNotification } from "../../../modals/addNotification";
import { saveNewNotification } from "../../../redux/Notification/action";

export const AddNotificationView = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.user.user?._id);
  console.log("user id", userId);
  const saveStatus = useAppSelector((state) => state.notification.saveStatus);

  const [newNotification, setNewNotification] =
    useState<AddedNewNotificationType>();
  const [modalForAddNew, setShowModalForAddNew] = useState(false);

  useEffect(() => {
    if (saveStatus === "succeeded") {
      setNewNotification(undefined);
    }
  }, [saveStatus]);

  const handleSavePress = (newNotification: AddedNewNotificationType) => {
    dispatch(
      saveNewNotification({
        userId: userId,
        description: newNotification.description,
        date: newNotification.date,
        time: newNotification.time,
      })
    );
    setShowModalForAddNew(false);
  };

  return (
    <>
      <Button
        variant="outline-success"
        size="lg"
        onClick={() => setShowModalForAddNew(true)}
      >
        Dodaj przypomnienie
      </Button>
      <ModalForAddNotification
        show={modalForAddNew}
        title="Przypomnienie"
        notificationName="Nazwa przypomnienia"
        dateAndTimeSectionName="Ustaw czas przypomnienia"
        onSavePress={handleSavePress}
        onClosePress={() => setShowModalForAddNew(false)}
        isLoading={saveStatus === "loading"}
      />
    </>
  );
};
