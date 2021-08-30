import { useState } from "react";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { LogInRegisterModal } from "../../../modals/registerLogin";
import { resetStatus } from "../../../redux/User/reducer";
import { AlertModal } from "../../../modals/alerts";
import { logIn } from "../../../redux/User/action";

export const LogInModal = () => {
  const [customPassword, setCustomPassword] = useState("");
  const [customLogin, setCustomLogin] = useState("");

  const loginStatus = useAppSelector((state) => state.user.loginStatus);

  const dispatch = useAppDispatch();

  const handleLogInPress = async () => {
    dispatch(logIn({ customLogin, customPassword }));
  };

  const handleCloseAlertModal = () => {
    dispatch(resetStatus());
  };

  return (
    <>
      <LogInRegisterModal
        loginInputTitle="Login"
        passwordInputTitle="Hasło"
        buttonTitle="Zaloguj"
        loginValue={customLogin}
        loginFunc={(ev: any) => setCustomLogin(ev.target.value)}
        passwordValue={customPassword}
        passwordFunc={(ev: any) => setCustomPassword(ev.target.value)}
        buttonFunc={handleLogInPress}
      />
      {loginStatus === "loading" ? <p></p> : null}

      {loginStatus === "succeeded" ? <p>OK!</p> : null}
      {loginStatus === "failed" ? (
        <AlertModal
          onPress={handleCloseAlertModal}
          message="Hasło lub login jest nieprawidłowy."
          confirm="OK!"
        />
      ) : null}
    </>
  );
};
