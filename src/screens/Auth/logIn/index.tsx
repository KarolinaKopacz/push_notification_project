import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { LoginModal } from "../../../modals/registerLogin";
import { resetStatus } from "../../../redux/User/reducer";
import { UserType } from "../../../redux/User/types";
import { AlertModal } from "../../../modals/alerts";
import { logIn } from "../../../redux/User/action";

export const LogInModal = () => {
  const loginStatus = useAppSelector((state) => state.user.loginStatus);

  const dispatch = useAppDispatch();

  const handleLogInPress = async (userProperties: UserType) => {
    console.log("login", userProperties.newLogin);
    console.log("password", userProperties.newPasswordEncrypted);

    dispatch(
      logIn({
        customLogin: userProperties.newLogin,
        customPassword: userProperties.newPasswordEncrypted,
      })
    );
  };

  const handleCloseAlertModal = () => {
    dispatch(resetStatus());
  };

  return (
    <>
      <LoginModal
        onLoginPress={handleLogInPress}
        isLoading={loginStatus === "loading"}
      />

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
