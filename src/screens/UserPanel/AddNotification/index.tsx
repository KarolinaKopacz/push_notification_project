import { useEffect } from "react";
import { useState } from "react";

import { Button } from "react-bootstrap";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { ModalForAddNotification } from "../../../modals/addNotification";
import { saveNewNotification } from "../../../redux/Notification/action";
import { Notification } from "../../../redux/Notification/types";

export const AddNotificationView = () => {
  const dispatch = useAppDispatch();

  const saveStatus = useAppSelector((state) => state.notification.saveStatus);
  const userId = useAppSelector((state) => state.user.user?._id);

  const [newNotification, setNewNotification] = useState<Notification>();
  const [modalForAddNew, setShowModalForAddNew] = useState(false);

  useEffect(() => {
    if (saveStatus === "succeeded") {
      setNewNotification(undefined);
    }
  }, [saveStatus]);

  const handleSavePress = (newNotification: Notification) => {
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
    <div className="button-to-add-notification">
      <Button
        variant="secondary"
        size="lg"
        onClick={() => setShowModalForAddNew(true)}
      >
        Dodaj przypomnienie
      </Button>
      <ModalForAddNotification
        show={modalForAddNew}
        title="Dodaj przypomnienie"
        notificationName="Treść przypomnienia"
        dateAndTimeSectionName="Ustaw datę i godzinę przypomnienia"
        onSavePress={handleSavePress}
        onClosePress={() => setShowModalForAddNew(false)}
        isLoading={saveStatus === "loading"}
      />
    </div>
  );
};
