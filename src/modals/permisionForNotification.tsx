import { useEffect, useState } from "react";

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

  const [isSafariBrowser, setIsSafariBrowser] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(false);

  useEffect(() => {
    if (
      (navigator.userAgent.indexOf("Safari") != -1 &&
        navigator.userAgent.indexOf("Safari" && "Chrome") === -1) ||
      typeof Notification === "undefined"
    ) {
      setIsSafariBrowser(true);
    }
  }, []);

  useEffect(() => {
    if (!isSafariBrowser) {
      return;
    }

    if (Notification.permission === "granted") {
      setNotificationPermission(true);
    }
  }, [isSafariBrowser]);

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
      {!isSafariBrowser ? (
        <div className="div-for-text">
          <p>Wyświetlanie powiadomień nie jest możliwe w Twojej przeglądarce</p>
          <p>
            Aby wyświetlić powiadomienie otwórz stronę w przeglądarce Safari.
          </p>
        </div>
      ) : !notificationPermission ? (
        <div className="div-for-btn">
          <Button
            variant="success"
            size="lg"
            onClick={() => Notification.requestPermission()}
            className="button-notificaation-permissin"
          >
            Zezwól na wyświetlanie powiadomień
          </Button>
        </div>
      ) : null}
    </>
  );
};
