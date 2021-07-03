import { useState } from "react";

import { LogInRegisterModal } from "../modals/register-login";
import { checkUserExists } from "../function/index";
import { AlertModal } from "../modals/alerts";

export const LogInModal = () => {
  const [customLogin, setCustomLogin] = useState("");
  const [customPassword, setCustomPassword] = useState("");
  const [alertModalVisibility, setAlertModalVisibility] = useState(false)

  const handleLogInPress = async () => {
 
    const isUserExists = await checkUserExists(customLogin, customPassword)

    if (!isUserExists) {
      setAlertModalVisibility(true)
    }

    
  }
    

  return (
    <>
      <LogInRegisterModal
        titleOfModal="Zaloguj się"
        loginInputTitle="Login"
        passwordInputTitle="Hasło"
        buttonTitle="Zaloguj"
        loginValue={customLogin}
        loginFunc={(ev: any) => setCustomLogin(ev.target.value)}
        passwordValue={customPassword}
        passwordFunc={(ev: any) => setCustomPassword(ev.target.value)}
        buttonFunc={handleLogInPress}
      />
      {!alertModalVisibility ? null : (
        <AlertModal
          alertButtonFunc={() => setAlertModalVisibility(false)}
          message="Login lub hasło są błędne"
          confirm="OK!"
        />
      )}
      </>)
  
}
