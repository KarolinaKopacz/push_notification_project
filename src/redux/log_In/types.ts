export type UserType = {
  _id: number;
  newLogin: string;
  newPasswordEncrypted: string;
};

export type LoggedInUserType = {
  _id: number;
  newLogin: string;
};
