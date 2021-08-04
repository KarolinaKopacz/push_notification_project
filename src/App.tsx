import React from "react";
import "./style.css";

import { useAppSelector } from "./hooks/useAppSelector";

import { Auth } from "./screens/Auth";
import { Home } from "./screens/UserPanel/home";

function App() {
  const userIsLogged = useAppSelector((state) => state.user.user);

  return (
    <>
      {userIsLogged ? (
        <Home userName={userIsLogged.newLogin} userId={userIsLogged._id} />
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
