import { Navbar } from "react-bulma-components";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { CustomerSite } from "../customerSite";

export const Menu = () => {
  return (
    <Navbar className="level">
      <p className="level-item has-text-centered">
        <Link to="/dla_szukających_opiekunki" className="link is-info">
          Dla Szukających opiekunki
        </Link>
      </p>
      <p className="level-item has-text-centered">
        <Link to="/" className="link is-info">
          NajOpiekunka
        </Link>
      </p>
      <p className="level-item has-text-centered">
        <Link to="/dla_opiekunek" className="link is-info">
          Dla opiekunek
        </Link>
      </p>
    </Navbar>
  );
};
