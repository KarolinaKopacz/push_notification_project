import { CaregiverProfile } from "./components/CaregiverProfile";
import { ProfileMenu } from "./components/ProfileMenu";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { CaregiverSettings } from "./components/CaregiverSettings";
import { AccountDelete } from "./components/AccountDelete";
import { LogIn } from "./components/Authoryzed";

export const CaregiverSite = () => {
  return (
    <>
      <Router>
        <div>
          <button>
            <Link to="logowanie">Zaloguj się</Link>
          </button>
          <p>lub</p>
          <button>
            <Link to="rejestracja">Zarejetruj się</Link>
          </button>

          {/* <div className="left-side">
          <ProfileMenu /> */}
        </div>

        <Switch>
          <Route path="/logowanie">
            <LogIn />
          </Route>
          <Route path="/rejestracja">
            <div>rejestr</div>
          </Route>
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
