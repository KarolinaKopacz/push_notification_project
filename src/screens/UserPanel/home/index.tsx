import { PermissionSection } from "../../../modals/permisionForNotification";
import { ListOfNotifications } from "../ListOfNotification";
import { AddNotificationView } from "../AddNotification";
import { Header } from "../../../modals/header";

export const Home = (props: any) => {
  const { userName } = props;

  return (
    <>
      <Header userName={userName} />
      <AddNotificationView />
      <ListOfNotifications />
      <PermissionSection />
    </>
  );
};
