import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useAppSelector } from "./hooks/useAppSelector";
import { useAppDispatch } from "./hooks/useAppDispatch";

import { Menu } from "./layaut/menu/index";
import "./style.css";

import { TestAction } from "./redux/Test/action";

import { CustomerSite } from "./layaut/customerSite";
import { CaregiverSite } from "./layaut/caregiverSite";

function App() {
  const dispatch = useAppDispatch();

  const testValue = useAppSelector((state) => state.test.value);

  React.useEffect(() => {
    console.log(testValue);
  }, [testValue]);

  const handleClick = () => {
    dispatch({
      type: TestAction.SET,
      payload: { value: 2 },
    });
  };

  return (
    <Router>
      <div>
        <div className="header">
          <Menu />
        </div>

        {/* <p>{testValue}</p>
        <button onClick={handleClick}>change</button> */}
      </div>
      <Switch>
        <Route path="/dla_szukających_opiekunki">
          <CustomerSite />
        </Route>
        <Route path="/dla_opiekunek">
          <CaregiverSite />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
