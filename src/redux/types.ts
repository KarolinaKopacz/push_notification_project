export type NewRegisterType = {
  newLogin: string;
  newPasswordEncrypted: string;
};

export type NewUserData = {
  login: string;
  password: string;
};

export type UserType = {
  _id: number;
  newLogin: string;
  newPasswordEncrypted: string;
};

export type LoggedInUserType = {
  _id: number;
  newLogin: string;
};
