import { useEffect } from "react";

import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Spinner } from "react-bootstrap";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import {
  deleteNotification,
  editNotification,
  getNotificationsList,
} from "../../../redux/Notification/action";
import { resetStatus } from "../../../redux/Notification/reducer";
import { AlertModal } from "../../../modals/alerts";
import { AddNotificationModal } from "../../../modals/addNotification";
import { useState } from "react";

export const ListOfNotifications = () => {
  const getListStatus = useAppSelector(
    (state) => state.notification.getListStatus
  );

  const userId = useAppSelector((state) => state.user.user?._id);

  const listOf = useAppSelector((state) => state.notification.notificationList);

  const dispatch = useAppDispatch();

  const [modalShow, setModalShow] = useState(false);
  const [notName, setNotName] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");

  useEffect(() => {
    if (!userId) {
      return;
    }

    dispatch(getNotificationsList({ userId }));
  }, [userId]);

  const handleCloseAlertModal = () => {
    dispatch(resetStatus());
  };

  const handleDeletePress = (id: string) => {
    dispatch(deleteNotification({ id }));
  };

  const handleEditPress = (
    id: string,
    description: string,
    date: string,
    time: string
  ) => {
    dispatch(editNotification({ id, description, date, time }));
    setModalShow(false);
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Data</th>
            <th>Czas</th>
            <th>Akcje</th>
          </tr>
        </thead>
        {getListStatus === "loading" ? (
          <Spinner animation="border" role="status" />
        ) : null}
        {getListStatus === "succeeded"
          ? listOf.map((item) => {
              return (
                <tbody key={item._id}>
                  <tr>
                    <td>{item.description}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>
                      <a onClick={() => setModalShow(true)}>
                        <FontAwesomeIcon key={item._id} icon={faEdit} />
                      </a>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => {
                          handleDeletePress(item._id);
                        }}
                      />
                    </td>
                  </tr>
                  <AddNotificationModal
                    show={modalShow}
                    title="Edytuj przypomnienie"
                    notificationName="Nazwa przypomnienia"
                    defaultValue={item.description}
                    onChangeNotificationName={(ev: any) =>
                      setNotName(ev.target.value)
                    }
                    dateAndTimeSectionName="Ustaw czas i datę"
                    defaultDateValue={item.date}
                    onChangeDate={(ev: any) => setCustomDate(ev.target.value)}
                    defaultTimeValue={item.time}
                    onChangeTime={(ev: any) => setCustomTime(ev.target.value)}
                    onPress={() =>
                      handleEditPress(item._id, notName, customDate, customTime)
                    }
                  />
                </tbody>
              );
            })
          : null}
        {getListStatus === "failed" ? (
          <AlertModal
            message="Wystąpił błąd podczas ładowania przypomnień. Spróbuj później"
            confirm="Ok"
            onPress={handleCloseAlertModal}
          />
        ) : null}
      </Table>
    </>
  );
};
