import { useState } from "react";

import { LogInRegisterModal } from "../modals/register-login";
import { AlertModal } from "../modals/alerts";

export const Register = () => {
  const [alertModalVisibility, setAlertModalVisibility] = useState(false);
  const [customPassword, setCustomPassword] = useState("");
  const [customLogin, setCustomLogin] = useState("");

  return (
    <>
      <LogInRegisterModal
        titleOfModal="Zarejestruj się"
        loginInputTitle="Login"
        passwordInputTitle="Hasło"
        buttonTitle="Utwórz konto"
        loginValue={customLogin}
        loginFunc={(ev: any) => setCustomLogin(ev.target.value)}
        passwordValue={customPassword}
        passwordFunc={(ev: any) => {
          setCustomPassword(ev.target.value);
        }}
        buttonFunc={() => {}}
      />

      <AlertModal
        alertButtonFunc={() => setAlertModalVisibility(false)}
        message="Login juz istnieje"
        confirm="OK!"
      />
    </>
  );
};
