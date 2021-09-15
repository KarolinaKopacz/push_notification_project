import { useState } from "react";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { checkUserExists, registerNewUser } from "../../../redux/User/action";
import { NewRegisterType } from "../../../redux/User/types";
import { resetStatus } from "../../../redux/User/reducer";
import { RegisterModal } from "../../../modals/register";
import { LogInModal } from "../LogIn";

export const Register = () => {
  const checkUserExistsStatus = useAppSelector(
    (state) => state.user.checkUserExistsStatus
  );
  const registerNewUserStatus = useAppSelector(
    (state) => state.user.registerNewUserStatus
  );

  const [redirectToLoginModal, setRedirectToLoginModal] = useState(false);

  const dispatch = useAppDispatch();

  const handleRegisterPress = async (newUser: NewRegisterType) => {
    dispatch(checkUserExists({ newLogin: newUser.newLogin }));
  };

  const registerNewUserFunc = (newUser: NewRegisterType) => {
    dispatch(
      registerNewUser({
        newLogin: newUser.newLogin,
        newPassword: newUser.newPasswordEncrypted,
      })
    );
    setRedirectToLoginModal(true);
    dispatch(resetStatus());
  };

  return (
    <>
      {!redirectToLoginModal ? (
        <RegisterModal
          onRegisterPress={handleRegisterPress}
          status={checkUserExistsStatus}
          registerNewUser={registerNewUserFunc}
          isLoading={
            checkUserExistsStatus === "loading" ||
            registerNewUserStatus === "loading"
          }
          isInvalid={checkUserExistsStatus === "failed"}
        />
      ) : (
        <LogInModal />
      )}
    </>
  );
};
