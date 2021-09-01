export type NewRegisterType = {
  newLogin: string;
  newPasswordEncrypted: string;
};

export type UserType = {
  newLogin: string;
  newPasswordEncrypted: string;
};

export type LoggedInUserType = {
  _id: string;
  newLogin: string;
};
