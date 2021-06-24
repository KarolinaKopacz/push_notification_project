import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Newpage } from "./newpsge";

import { Register } from "./register";

import "./style.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Register />
      </div>

      <Switch>
        <Route path="/helllol">
          <Newpage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
