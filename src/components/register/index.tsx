import { useState } from "react";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

import { LogInRegisterModal } from "../../modals/register-login";
import { AlertModal } from "../../modals/alerts";
import { checkUserExists, registerNewUser } from "../../redux/register/action";
import { resetStatus } from "../../redux/register/reducer";

export const Register = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newLogin, setNewLogin] = useState("");

  const checkUserExistsStatus = useAppSelector(
    (state) => state.newUser.checkUserExistsStatus
  );

  const registerNewUserStatus = useAppSelector(
    (state) => state.newUser.registerNewUserStatus
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
      {checkUserExistsStatus === "loading" ? console.log("loading") : null}
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
