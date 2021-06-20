import { Link } from "react-router-dom";

export const LogIn = () => {
  return (
    <>
      <div>Log in</div>
      <label>
        Login
        <input></input>
      </label>
      <label>
        Hasło
        <input></input>
      </label>
      <button>Zaloguj</button>
      <p>
        <Link to="/rejestracja-konta">Nie masz konta? Zarejestruj się</Link>
      </p>
    </>
  );
};
