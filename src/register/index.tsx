import { useState } from "react";

import { LogInRegisterModal } from "../modals/register-login";
import { registerFunc } from "../function";

export const Register = () => {
  const [newLogin, setNewLogin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterPress = () => {
    registerFunc(newLogin, newPassword).then(() => {
      setNewLogin("");
      setNewPassword("");
      return true;
    });
  };

  return (
    <>
      <LogInRegisterModal
        titleOfModal="Zarejestruj się"
        loginInputTitle="Login"
        passwordInputTitle="Hasło"
        buttonTitle="Utwórz konto"
        loginValue={newLogin}
        loginFunc={(ev: any) => setNewLogin(ev.target.value)}
        passwordValue={newPassword}
        passwordFunc={(ev: any) => {
          setNewPassword(ev.target.value);
          setPassword(ev.target.value);
        }}
        buttonFunc={handleRegisterPress}
      />
      {/* <div className="login-modal">
        <div className="small-component">
          <p>Zarejestruj sie</p>
        </div>
        <div className="small-component">
          <p>Login</p>
          <input
            name="login"
            placeholder="Enter login"
            type="text"
            //funcka sprawdzająca czy login nie jst zajety
            value={newLogin}
            onChange={(ev) => setNewLogin(ev.target.value)}
          ></input>
        </div>
        <div className="small-component pwd-container">
          <p>Hasło</p>
          <input
            name="password"
            placeholder="Enter password"
            value={newPassword}
            type={isRevealPwd ? "text" : "password"}
            onChange={(ev) => {
              setNewPassword(ev.target.value);
              setPassword(ev.target.value);
            }}
          />
          <img
            title={isRevealPwd ? "Hide password" : "Show password"}
            src={isRevealPwd ? hidePwdImg : showPwdImg}
            onClick={() => setIsRevealPwd((prevState) => !prevState)}
          />
        </div>
        <div className="small-component">
          <p>Powtórz hasło</p>
          <input name="password_repeat"></input>
        </div>
        <div className="small-component">
          <button name="register_account" onClick={handleRegisterPress}>
            Utwórz konto
          </button>
        </div>
      </div> */}
    </>
  );
};
