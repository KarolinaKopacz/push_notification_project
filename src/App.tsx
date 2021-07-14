import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { LogInModal } from "./components/log-in";
import { Newpage } from "./newpsge";

import { Register } from "./components/register";

import "./style.css";

function App() {
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
}

export default App;
