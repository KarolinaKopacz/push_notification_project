import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { LogInModal } from "./log-in";

import { Register } from "./register";

export const Auth = () => {
  return (
    <Router>
      <div className="app">
        <div className="app-header">
          <p>
            <Link to="/register">Zarejestruj sie</Link>
          </p>

          <p>/</p>
          <p>
            <Link to="/log-in">Zaloguj się</Link>
          </p>
        </div>
      </div>

      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/log-in">
          <LogInModal />
        </Route>
      </Switch>
    </Router>
  );
};
