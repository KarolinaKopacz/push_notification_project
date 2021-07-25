import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

import { Home2 } from "../screens/home2";
import { AddNotificationModal } from "./addNotification";

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
          <Home2 />
        </Route>
        <Route path={`/ ${secondOption}`}>
          <AddNotificationModal
            title="Przypomnienie"
            notificationName="Nazwa przypomnienia"
            timing="Ustaw czas przypomnienia"
            saveButtonName="Zapisz"
            natificationNameValue={() => {}}
            onChangeNotificationName={() => {}}
            onPress={() => {}}
            onChangeDate={() => {}}
            onChangeTime={() => {}}
          />
        </Route>
        <Route path={`/ ${thirdOption}`}>
          <p>{thirdOption}</p>
        </Route>
      </Switch>
    </Router>
  );
};
