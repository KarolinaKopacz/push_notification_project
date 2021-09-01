import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { checkUserExists, registerNewUser } from "../../../redux/User/action";
import { NewRegisterType } from "../../../redux/User/types";
import { resetStatus } from "../../../redux/User/reducer";
import { RegisterModal } from "../../../modals/register";
import { AlertModal } from "../../../modals/alerts";

export const Register = () => {
  const checkUserExistsStatus = useAppSelector(
    (state) => state.user.checkUserExistsStatus
  );
  const registerNewUserStatus = useAppSelector(
    (state) => state.user.registerNewUserStatus
  );

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
    dispatch(resetStatus());
  };

  const handleCloseAlertModal = () => {
    dispatch(resetStatus());
  };

  return (
    <>
      <RegisterModal
        onRegisterPress={handleRegisterPress}
        status={checkUserExistsStatus}
        registerNewUser={registerNewUserFunc}
        isLoading={
          registerNewUserStatus === "loading" ||
          checkUserExistsStatus === "loading"
        }
      />
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
