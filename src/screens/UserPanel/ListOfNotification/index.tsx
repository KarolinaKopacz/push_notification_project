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
import { ModalForEditNotification } from "../../../modals/editNotification";
import { useState } from "react";
import { ConfirmDeleteModal } from "../../../modals/confirmDelete";
import { NotificationList } from "../../../redux/Notification/types";

export const ListOfNotifications = () => {
  const getListStatus = useAppSelector(
    (state) => state.notification.getListStatus
  );

  const userId = useAppSelector((state) => state.user.user?._id);

  const listOf = useAppSelector((state) => state.notification.notificationList);
  const notificationEditStatus = useAppSelector(
    (state) => state.notification.EditStatus
  );

  const dispatch = useAppDispatch();

  const [notificationForEdit, setNotificationForEdit] =
    useState<NotificationList>();
  const [modalForDelete, setShowModalForDelete] = useState<NotificationList>();

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

  const handleCloseAlertModal = () => {
    dispatch(resetStatus());
  };

  const handleDeletePress = (id: string) => {
    dispatch(deleteNotification({ id }));
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
                          setShowModalForDelete(item);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
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
      {/* <ConfirmDeleteModal
        showDeleteConfirm={modalForDelete}
        message="Czy na pewno chcesz usunąć powiadomienie?"
        onYesPress={handleDeletePress()}
        onClosePress={() => {}}
      >
        {console.log("delete")}
      </ConfirmDeleteModal> */}
    </>
  );
};
