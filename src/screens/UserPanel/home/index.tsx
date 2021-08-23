import { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { MenuList } from "../../../modals/menuList";
import { AddNotificationView } from "../AddNotification";
import { ListOfNotifications } from "../ListOfNotification";

export const Home = (props: any) => {
  const { userName } = props;

  const [listVisible, setListVisible] = useState(false);

  return (
    <>
      <MenuList userName={userName} />

      <AddNotificationView />

      <Button
        variant="outline-info"
        size="lg"
        onClick={() => {
          if (listVisible == false) {
            return setListVisible(true);
          }
          return setListVisible(false);
        }}
      >
        Lista Przypomnień
      </Button>
      {listVisible ? <ListOfNotifications /> : null}
    </>
  );
};
