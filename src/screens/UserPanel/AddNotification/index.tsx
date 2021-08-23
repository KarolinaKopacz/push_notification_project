import { useState } from "react";
import { identity } from "remeda";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { AddNotificationModal } from "../../../modals/addNotification";
import { saveNewNotification } from "../../../redux/Notification/action";

export const AddNotificationView = () => {
  const [notName, setNotName] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");

  const dispatch = useAppDispatch();

  const saveStatus = useAppSelector((state) => state.notification.saveStatus);

  const handleSavePress = () => {
    dispatch(
      saveNewNotification({
        description: notName,
        date: customDate,
        time: customTime,
      })
    );
  };

  return (
    <>
      <AddNotificationModal
        show={true}
        title="Przypomnienie"
        notificationName="Nazwa przypomnienia"
        timing="Ustaw czas przypomnienia"
        saveButtonName="Zapisz"
        notificationNameValue={notName}
        onChangeNotificationName={(ev: any) => setNotName(ev.target.value)}
        onPress={handleSavePress}
        dateValue={customDate}
        onChangeDate={(ev: any) => setCustomDate(ev.target.value)}
        timeValue={customTime}
        onChangeTime={(ev: any) => setCustomTime(ev.target.value)}
      />

      {saveStatus === "succeeded" ? console.log("save ok") : null}
      {saveStatus === "loading" ? console.log("save load") : null}
      {saveStatus === "failed" ? console.log("save wrong") : null}
    </>
  );
};
