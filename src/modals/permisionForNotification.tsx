import { useEffect } from "react";

import { Button } from "react-bootstrap";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

import { isPast } from "date-fns";

import { finishedNotification } from "../redux/Notification/action";

export const PermissionSection = () => {
  const notificationDatasPerUser = useAppSelector(
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
        notificationDatasPerUser.forEach((data) => {
          if (!data.isFinish && isPast(new Date(data.dateObj))) {
            new Notification(data.description, {});
            let isFinish = true;
            dispatch(
              finishedNotification({ id: data._id, isFinish: isFinish })
            );
          }
        });
      }, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [notificationDatasPerUser]);

  return (
    <>
      {Notification.permission === "granted" ? null : (
        <Button onClick={() => Notification.requestPermission()}>
          Zezwól na wyświetlanie powiadomień
        </Button>
      )}
    </>
  );
};