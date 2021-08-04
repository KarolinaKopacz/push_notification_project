import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { getNotificationsList } from "../../../redux/Notification/action";
import { useEffect } from "react";

export const ListOfNotifications = () => {
  const getListStatus = useAppSelector(
    (state) => state.notification.getListStatus
  );

  const listOf = useAppSelector((state) => state.notification.notificationList);
  console.log("listOf", listOf);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNotificationsList());
  }, []);

  return (
    <div>
      {getListStatus === "loading" ? <p>ładowanie</p> : null}

      {getListStatus === "succeeded"
        ? listOf.map((item) => (
            <li>
              <p>{item.description}</p>
              <p>{item.date}</p>
              <p>{item.time}</p>
            </li>
          ))
        : null}
      {getListStatus === "failed" ? <p>błąd</p> : null}
    </div>
  );
};
