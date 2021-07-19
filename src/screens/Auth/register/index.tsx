import { useState } from "react";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { LogInRegisterModal } from "../../../modals/register-login";
import { AlertModal } from "../../../modals/alerts";
import { checkUserExists, registerNewUser } from "../../../redux/action";
import { resetStatus } from "../../../redux/reducer";

export const Register = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newLogin, setNewLogin] = useState("");

  const checkUserExistsStatus = useAppSelector(
    (state) => state.user.checkUserExistsStatus
  );

  const registerNewUserStatus = useAppSelector(
    (state) => state.user.registerNewUserStatus
  );
  const dispatch = useAppDispatch();

  const handleRegisterPress = async () => {
    dispatch(checkUserExists({ newLogin }));
  };

  const registerNewUserFunc = () => {
    dispatch(registerNewUser({ newLogin, newPassword }));
    dispatch(resetStatus());
  };

  const handleCloseAlertModal = () => {
    dispatch(resetStatus());
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
        }}
        buttonFunc={handleRegisterPress}
      />
      {checkUserExistsStatus === "succeeded" ? registerNewUserFunc() : null}
      {checkUserExistsStatus === "failed" ? (
        <AlertModal
          onPress={handleCloseAlertModal}
          message="Login juz istnieje"
          confirm="OK!"
        />
      ) : null}
    </>
  );
};
