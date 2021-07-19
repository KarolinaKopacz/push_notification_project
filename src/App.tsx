import React from "react";
import "./style.css";

import { useAppSelector } from "./hooks/useAppSelector";

import { Auth } from "./screens/Auth";
import { Home } from "./screens/home";

function App() {
  const userIsLogged = useAppSelector((state) => state.user.user);

  return (
    <>{userIsLogged ? <Home userName={userIsLogged.newLogin} /> : <Auth />}</>
  );
}

export default App;
