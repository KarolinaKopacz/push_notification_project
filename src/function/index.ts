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

export const getUsers = () => {
  const requestURL = "https://userdatabase-9fd5.restdb.io/rest/users2";

  return fetch(requestURL, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "60d16898e2c96c46a24637ee",
    },
  })
    .then((res: any) => res.json())

    .catch((err) => {
      console.log("err", err);
    });
};
