import { useState } from "react";

import { LogInRegisterModal } from "../modals/register-login";

export const LogInModal = () => {
  return (
    <>
      <LogInRegisterModal
        titleOfModal="Zaloguj się"
        loginInputTitle="Login"
        passwordInputTitle="Hasło"
        buttonTitle="Zaloguj"
        loginValue={""}
        loginFunc={""}
        passwordValue={""}
        passwordFunc={""}
        buttonFunc={""}
      />
      {/* <div className="login-modal">
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
      </div> */}
    </>
  );
};
