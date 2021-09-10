import { useEffect } from "react";

import { Button } from "react-bootstrap";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

import { isPast } from "date-fns";

import { finishedNotification } from "../redux/Notification/action";

export const PermissionSection = () => {
  const notificationDatas = useAppSelector(
    (state) => state.notification.notificationList
  );

  const dispatch = useAppDispatch();

  const requestPermission = async () => {
    await Notification.requestPermission();
  };

  requestPermission();

  useEffect(() => {
    if (Notification.permission === "granted") {
      const interval = setInterval(() => {
        notificationDatas.forEach((data) => {
          if (!data.isShowed && isPast(new Date(data.dateObj))) {
            new Notification(data.description, {});
            let isShowed = true;
            dispatch(
              finishedNotification({ id: data._id, isShowed: isShowed })
            );
          }
        });
      }, 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [notificationDatas]);

  return (
    <>
      <Button onClick={() => Notification.requestPermission()}>
        Zezwól na wyświetlanie powiadomień
      </Button>
    </>
  );
};
