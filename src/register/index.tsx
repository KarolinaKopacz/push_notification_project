import { useState } from "react";

import { LogInRegisterModal } from "../modals/register-login";
import { registerFunc } from "../function";
import { AlertModal } from "../modals/alerts";

export const Register = () => {
  const [newLogin, setNewLogin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [alertModalVisibility, setAlertModalVisibility] = useState(false);

  const handleRegisterPress = () => {
    if (newLogin.length > 3 || newPassword.length > 3) {
      registerFunc(newLogin, newPassword).then(() => {
        setNewLogin("");
        setNewPassword("");
        return true;
      });
    }
    return setAlertModalVisibility(true);
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
      {!alertModalVisibility
        ? (console.log("NO aleert"), null)
        : (console.log("aleert"),
          (
            <AlertModal
              alertButtonFunc={() => setAlertModalVisibility(false)}
              message="Login lub hasło zawirają mnij niż 3 znaki"
              confirm="OK!"
            />
          ))}
    </>
  );
};
