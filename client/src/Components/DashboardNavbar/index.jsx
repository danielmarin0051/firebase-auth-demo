import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../Constants/routes";
import SignOutButton from "../SignOutButton"

import logo from "../../images/logo.svg";
import css from "./index.module.css";
import cn from "classnames";

const LandingPageNavbar = () => {
  return (
    <nav className={cn(css.navbar)}>
      <Link className={css.logo} to={ROUTES.LANDING}>
        <img src={logo} alt="CrushLink Logo" />
      </Link>
      <ul className={css.itemsList}>
        <li className={css.listItem}>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
};

export default LandingPageNavbar;
