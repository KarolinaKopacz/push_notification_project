import { CaregiverProfile } from "./components/CaregiverProfile";
import { ProfileMenu } from "./components/ProfileMenu";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { CaregiverSettings } from "./components/CaregiverSettings";
import { AccountDelete } from "./components/AccountDelete";

export const CaregiverSite = () => {
  return (
    <>
      <Router>
        <div className="left-side">
          <ProfileMenu />
        </div>

        <Switch>
          <Route path="/twoj-profil">
            <div className="right-side">
              <CaregiverProfile />
            </div>
          </Route>
          <Route path="/ustawienia">
            <div className="right-side">
              <CaregiverSettings />
            </div>
          </Route>
          <Route path="/usun-konto">
            <div className="right-side">
              <AccountDelete />
            </div>
          </Route>
        </Switch>
      </Router>
    </>
  );
};
