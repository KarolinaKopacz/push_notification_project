import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useState } from "react";

import showPwdImg from "../img/log-register/show-password.svg";
import hidePwdImg from "../img/log-register/hide-password.svg";
import { Register } from "../register";

export const LogInModal = () => {
  //   const [password, setPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  return (
    <>
      <div className="login-modal">
        <div className="small-component">
          <p>Zaloguj się</p>
        </div>
        <div className="small-component">
          <p>Login</p>
          <input
            name="login"
            placeholder="Enter login"
            type="text"
            value={""}
          ></input>
        </div>
        <div className="small-component pwd-container">
          <p>Hasło</p>
          <input
            name="password"
            placeholder="Enter password"
            value={""}
            type={isRevealPwd ? "text" : "password"}
          />
          <img
            title={isRevealPwd ? "Hide password" : "Show password"}
            src={isRevealPwd ? hidePwdImg : showPwdImg}
            onClick={() => setIsRevealPwd((prevState) => !prevState)}
          />
        </div>
        <div className="small-component">
          <button name="register_account">Zaloguj się</button>
        </div>
      </div>
    </>
  );
};
