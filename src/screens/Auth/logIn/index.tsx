import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { resetStatus } from "../../../redux/User/reducer";
import { UserType } from "../../../redux/User/types";
import { logIn } from "../../../redux/User/action";
import { LoginModal } from "../../../modals/login";

export const LogInModal = () => {
  const loginStatus = useAppSelector((state) => state.user.loginStatus);

  const dispatch = useAppDispatch();

  const handleLogInPress = async (userProperties: UserType) => {
    dispatch(
      logIn({
        customLogin: userProperties.newLogin,
        customPassword: userProperties.newPasswordEncrypted,
      })
    );
    dispatch(resetStatus());
  };

  return (
    <>
      <LoginModal
        onLoginPress={handleLogInPress}
        isLoading={loginStatus === "loading"}
        isInvalid={loginStatus === "failed"}
      />
    </>
  );
};
