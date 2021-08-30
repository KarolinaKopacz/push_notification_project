import { ListOfNotifications } from "../ListOfNotification";
import { AddNotificationView } from "../AddNotification";
import { MenuList } from "../../../modals/menuList";

export const Home = (props: any) => {
  const { userName } = props;

  return (
    <>
      <MenuList userName={userName} />

      <AddNotificationView />

      <ListOfNotifications />
    </>
  );
};
