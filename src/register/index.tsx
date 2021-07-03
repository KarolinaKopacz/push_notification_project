import { useState } from "react";

import { LogInRegisterModal } from "../modals/register-login";
import { checkUserExists } from "../function/index";
import { AlertModal } from "../modals/alerts";
import { registerFunc } from "../function";


export const Register = () => {
  const [alertModalVisibility, setAlertModalVisibility] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newLogin, setNewLogin] = useState("");

  const handleRegisterPress = async () => {
    
      const isUserExists = await checkUserExists(newLogin, newPassword)

      if (isUserExists) {
        setAlertModalVisibility(true)
        return false
      }
      registerFunc(newLogin, newPassword).then(() => {
        setNewLogin("");
        setNewPassword("");
        return true;
      });
    }
  

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
          
        }}
        buttonFunc={handleRegisterPress}
      />
      {!alertModalVisibility ? null : (
        <AlertModal
          alertButtonFunc={() => setAlertModalVisibility(false)}
          message="Login juz istnieje"
          confirm="OK!"
        />
      )}
    </>
  );
};
