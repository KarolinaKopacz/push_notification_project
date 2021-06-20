import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export const ProfileMenu = () => {
  return (
    <div>
      <h2>Menu</h2>
      <ul>
        <p>
          <Link to="/twoj-profil">Twój profil</Link>
        </p>
        <p>
          <Link to="/ustawienia">Ustawienia</Link>
        </p>
        <p>
          <Link to="/usun-konto">Usuń konto</Link>
        </p>
      </ul>
    </div>
  );
};
