import { useDebugValue, useState } from "react";
import { NewRegisterType, NewUserData } from "./types";

export const Register = () => {
  const [newLogin, setNewLogin] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleRegisterPress = (): Promise<Boolean> => {
    const requestURL = "https://userdatabase-9fd5.restdb.io/rest/users2";

    return fetch(requestURL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dad3ca6bdb2285f8eafec6a462f0d06ecccd2",
      },

      body: JSON.stringify({
        // email: newLogin,
        // active: true,
        login: newLogin,
        password: newPassword,
      }),
    })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
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
            //   rules={[
            //   { required: true, message: 'Pole wymagane' },
            //   { min: 3, message: 'Login jst za któtki' }]}
            value={newLogin}
            onChange={(ev) => setNewLogin(ev.target.value)}
          ></input>
        </div>
        <div className="small-component">
          <p>Hasło</p>
          <input
            name="password"
            value={newPassword}
            onChange={(ev) => setNewPassword(ev.target.value)}
          ></input>
        </div>
        <div className="small-component">
          <p>Powtórz hasło</p>
          <input name="password_repeat"></input>
        </div>
        <div className="small-component">
          <button
            name="register_account"
            onClick={handleRegisterPress} //{() => loginWithRedirect()}//
          >
            Utwórz konto
          </button>
        </div>
      </div>
    </>
  );
};
