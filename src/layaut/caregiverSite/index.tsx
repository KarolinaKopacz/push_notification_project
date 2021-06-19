import { Home } from "./components/Home";
import { ProfileMenu } from "./components/ProfileMenu";

export const CaregiverSite = () => {
  return (
    <>
      <div className="left-side">
        <ProfileMenu />
      </div>
      <div className="right-side">
        <Home />
      </div>
    </>
  );
};
