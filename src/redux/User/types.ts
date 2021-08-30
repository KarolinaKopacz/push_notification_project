export type NewRegisterType = {
  newLogin: string;
  newPasswordEncrypted: string;
};

export type UserType = {
  _id: string;
  newLogin: string;
  newPasswordEncrypted: string;
};

export type LoggedInUserType = {
  _id: string;
  newLogin: string;
};
