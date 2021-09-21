import { useEffect } from "react";
import { useState } from "react";

import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Spinner, Alert } from "react-bootstrap";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { ModalForEditNotification } from "../../../modals/editNotification";
import { ConfirmDeleteModal } from "../../../modals/deleteNotification";
import { resetStatus } from "../../../redux/Notification/reducer";

import {
  deleteOneNotification,
  editNotification,
  getNotificationsList,
} from "../../../redux/Notification/action";
import {
  Notification,
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
    useState<Notification>();
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

  const handleDeletePress = (deleteNotification: DeleteNotificationType) => {
    dispatch(deleteOneNotification({ id: deleteNotification._id }));
  };

  const handleEditPress = (editedNotification: Notification) => {
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
      {getListStatus === "failed" ? (
        <Alert variant="danger">
          <Alert.Heading></Alert.Heading>
          Wystąpił błąd podczas ładowania przypomnień. Spróbuj później.
        </Alert>
      ) : null}
      <Table className="table">
        <thead>
          <tr>
            <th>Nazwa przypomnienia</th>
            <th>Data</th>
            <th>Godzina przypomnienie</th>
            <th>Edytuj/usuń</th>
          </tr>
        </thead>
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
      </Table>
      <ModalForEditNotification
        isLoading={notificationEditStatus === "loading"}
        title="Edytuj przypomnienie"
        notificationName="Treść przypomnienia"
        dateAndTimeSectionName="Ustaw datę i godzinę przypomnienia"
        notification={notificationForEdit}
        onSavePress={handleEditPress}
        onClosePress={() => setNotificationForEdit(undefined)}
      />
      <ConfirmDeleteModal
        onConfirmPress={handleDeletePress}
        onClosePress={() => setNotificationForDelete(undefined)}
        message="Czy na pewno chcesz usunąć powiadomienie?"
        notification={notificationForDelete}
        isLoading={notificationDeleteStatus === "loading"}
      />
      {getListStatus === "loading" ? (
        <div className="spinner">
          <Spinner animation="border" variant="secondary" role="status" />
        </div>
      ) : null}
    </>
  );
};
