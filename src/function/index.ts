export const registerFunc = (loginValue: string, passwordValue: string) => {
  const requestURL = "https://userdatabase-9fd5.restdb.io/rest/users2";

  return fetch(requestURL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "60d16898e2c96c46a24637ee",
    },

    body: JSON.stringify({
      login: loginValue,
      password: passwordValue,
    }),
  });
};

export const checkUserExists = (
  customLogin: string,
  customPassword: string
): Promise<boolean> => {
  const requestURL = "https://userdatabase-9fd5.restdb.io/rest/users2";

  return fetch(requestURL, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "60d16898e2c96c46a24637ee",
    },
  })
    .then(async (response) => {
      if (response.ok) {
        const allUsers = (await response.json()) as {
          login: string;
          password: string;
          _id: number;
        }[];
        const user = allUsers.find(
          (currentUser) =>
            currentUser.login === customLogin &&
            currentUser.password === customPassword
        );
        if (!user) {
          // user don't exists

          return false;
        }
        return true;
      }
      throw new Error(response.statusText);
    })
    .catch((err) => {
      console.log("err", err);
      return false;
    });
};

// dla redux!!!!!
// const checkUserExists = createAsyncThunk(
//   "users/CHECK_USERS_EXISTS",
//   async ({
//     customLogin,
//     customPassword,
//   }: {
//     customLogin: string;
//     customPassword: string;
//   }) => {
//     return await fetch("https://userdatabase-9fd5.restdb.io/rest/users2", {
//       method: "get",
//       headers: {
//         "Content-Type": "application/json",
//         "x-apikey": "60d16898e2c96c46a24637ee",
//       },
//     })
//       .then(async (response) => {
//         if (response.ok) {
//           const allUsers = (await response.json()) as {
//             login: string;
//             password: string;
//             _id: number;
//           }[];
//           const user = allUsers.find(
//             (currentUser) =>
//               currentUser.login === customLogin &&
//               currentUser.password === customPassword
//           );
//           if (!user) {
//             throw new Error("user not found");
//           }
//           return user;
//         }
//         throw new Error(response.statusText);
//       })
//       .catch((err) => {
//         return null;
//       });
//   }
// );
