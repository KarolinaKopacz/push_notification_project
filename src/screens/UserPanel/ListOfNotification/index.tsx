import { useEffect } from "react";

import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Spinner } from "react-bootstrap";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { getNotificationsList } from "../../../redux/Notification/action";
import { resetStatus } from "../../../redux/Notification/reducer";
import { AlertModal } from "../../../modals/alerts";

export const ListOfNotifications = () => {
  const getListStatus = useAppSelector(
    (state) => state.notification.getListStatus
  );

  const listOf = useAppSelector((state) => state.notification.notificationList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNotificationsList());
  }, []);

  const handleCloseAlertModal = () => {
    dispatch(resetStatus());
    dispatch(getNotificationsList());
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
          ? listOf.map((item) => (
              <tbody>
                <tr>
                  <td>{item.description}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} onClick={() => {}} />
                    <FontAwesomeIcon icon={faTrashAlt} onClick={() => {}} />
                  </td>
                </tr>
              </tbody>
            ))
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
