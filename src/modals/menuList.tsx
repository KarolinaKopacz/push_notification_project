import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";

import { ListOfNotifications } from "../screens/UserPanel/ListOfNotification";
import { AddNotificationView } from "../screens/UserPanel/AddNotification";

export const MenuList = (props: any) => {
  const { firstOption, secondOption, thirdOption } = props;

  return (
    <Router>
      <div>
        <li>
          <Link to={`/ ${firstOption}`}>{firstOption}</Link>
        </li>
        <li>
          <Link to={`/ ${secondOption}`}>{secondOption}</Link>
        </li>
        <li>
          <Link to={`/ ${thirdOption}`}>{thirdOption}</Link>
        </li>
      </div>

      <Switch>
        <Route path={`/ ${firstOption}`}>
          <p>Home</p>
        </Route>
        <Route path={`/ ${secondOption}`}>
          <AddNotificationView />
        </Route>
        <Route path={`/ ${thirdOption}`}>
          <ListOfNotifications />
        </Route>
      </Switch>
    </Router>
  );
};
