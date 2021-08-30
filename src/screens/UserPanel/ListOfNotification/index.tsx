import { useEffect } from "react";
import { useState } from "react";

import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Spinner } from "react-bootstrap";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { ModalForEditNotification } from "../../../modals/editNotification";
import { ConfirmDeleteModal } from "../../../modals/confirmDelete";
import { resetStatus } from "../../../redux/Notification/reducer";
import { AlertModal } from "../../../modals/alerts";
import {
  deleteOneNotification,
  editNotification,
  getNotificationsList,
} from "../../../redux/Notification/action";
import {
  NotificationList,
  DeleteNotificationType,
} from "../../../redux/Notification/types";

export const ListOfNotifications = () => {
  const getListStatus = useAppSelector(
    (state) => state.notification.getListStatus
  );

  const userId = useAppSelector((state) => state.user.user?._id);

  const listOf = useAppSelector((state) => state.notification.notificationList);
  const notificationEditStatus = useAppSelector(
    (state) => state.notification.editStatus
  );
  const notificationDeleteStatus = useAppSelector(
    (state) => state.notification.deleteStatus
  );

  const dispatch = useAppDispatch();

  const [notificationForEdit, setNotificationForEdit] =
    useState<NotificationList>();
  const [notificationForDelete, setNotificationForDelete] =
    useState<DeleteNotificationType>();

  useEffect(() => {
    if (!userId) {
      return;
    }
    dispatch(getNotificationsList({ userId }));
  }, [userId]);

  useEffect(() => {
    if (notificationEditStatus === "succeeded") {
      setNotificationForEdit(undefined);
    }
  }, [notificationEditStatus]);

  useEffect(() => {
    if (notificationDeleteStatus === "succeeded") {
      setNotificationForDelete(undefined);
    }
  }, [notificationDeleteStatus]);

  const handleCloseAlertModal = () => {
    dispatch(resetStatus());
  };

  const handleDeletePress = (deleteNotification: DeleteNotificationType) => {
    dispatch(deleteOneNotification({ id: deleteNotification._id }));
  };

  const handleEditPress = (editedNotification: NotificationList) => {
    dispatch(
      editNotification({
        id: editedNotification._id,
        description: editedNotification.description,
        date: editedNotification.date,
        time: editedNotification.time,
      })
    );
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
                      <a onClick={() => setNotificationForEdit(item)}>
                        <FontAwesomeIcon key={item._id} icon={faEdit} />
                      </a>
                      <a
                        onClick={() => {
                          setNotificationForDelete(item);
                          console.log("2 id", item);
                        }}
                      >
                        <FontAwesomeIcon key={item._id} icon={faTrashAlt} />
                      </a>
                    </td>
                  </tr>
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
        <ModalForEditNotification
          isLoading={notificationEditStatus === "loading"}
          title="Edytuj przypomnienie"
          notificationName="Nazwa przypomnienia"
          dateAndTimeSectionName="Ustaw czas i datę"
          notification={notificationForEdit}
          onSavePress={handleEditPress}
          onClosePress={() => setNotificationForEdit(undefined)}
        />
      </Table>
      <ConfirmDeleteModal
        onConfirmPress={handleDeletePress}
        onClosePress={() => setNotificationForDelete(undefined)}
        message="Czy na pewno chcesz usunąć powiadomienie?"
        notification={notificationForDelete}
        isLoading={notificationDeleteStatus === "loading"}
      />
    </>
  );
};
