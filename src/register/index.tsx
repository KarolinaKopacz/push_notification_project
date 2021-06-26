import { useState } from "react";
import showPwdImg from "./show-password.svg";
import hidePwdImg from "./hide-password.svg";
import { Link } from "react-router-dom";

export const Register = () => {
  const [newLogin, setNewLogin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const handleRegisterPress = (): Promise<Boolean> => {
    const requestURL = "https://userdatabase-9fd5.restdb.io/rest/users2";

    return fetch(requestURL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dad3ca6bdb2285f8eafec6a462f0d06ecccd2",
      },

      body: JSON.stringify({
        login: newLogin,
        password: newPassword,
      }),
    }).then(() => {
      setNewLogin("");
      setNewPassword("");
      return true;
    });
    // .catch(() => {
    //   return false;
    // });
  };

  return (
    <>
      <div className="login-modal">
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
      </div>
    </>
  );
};
