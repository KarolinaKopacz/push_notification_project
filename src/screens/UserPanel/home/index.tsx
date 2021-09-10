import { ListOfNotifications } from "../ListOfNotification";
import { AddNotificationView } from "../AddNotification";
import { MenuList } from "../../../modals/menuList";
import { PermissionSection } from "../../../modals/permisionForNotification";

export const Home = (props: any) => {
  const { userName } = props;

  return (
    <>
      <MenuList userName={userName} />
      <PermissionSection />

      <AddNotificationView />

      <ListOfNotifications />
    </>
  );
};
