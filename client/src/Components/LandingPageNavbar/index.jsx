import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../Constants/routes";
import { Link as MuiLink, Button } from "@material-ui/core";

import logo from "../../images/logo.svg";
import css from "./index.module.css";
import cn from "classnames";

const LandingPageNavbar = ({ isFixed, isNotLandingPage }) => {
  return (
    <nav className={cn(css.navbar, isFixed ? css.fixed : css.relative)}>
      <Link className={css.logo} to={ROUTES.LANDING}>
        <img src={logo} alt="CrushLink Logo" />
      </Link>
      <ul className={cn(css.linkWrapper, isNotLandingPage && css.displayNone)}>
        <li className={css.link}>
          <MuiLink variant="button" color="textPrimary" href="#slide1">
            Hero
          </MuiLink>
        </li>
        <li className={css.link}>
          <MuiLink variant="button" color="textPrimary" href="#slide2">
            Pricing
          </MuiLink>
        </li>
        <li className={css.link}>
          <MuiLink variant="button" color="textPrimary" href="#footer">
            Footer
          </MuiLink>
        </li>
      </ul>
      <ul className={css.itemsList}>
        <li className={css.listItem}>
          <Link to={ROUTES.SIGN_IN}>
            <Button variant="outlined" color="primary">
              Sign In
            </Button>
          </Link>
        </li>
        <li className={css.listItem}>
          <Link to={ROUTES.SIGN_UP}>
            <Button variant="outlined" color="secondary">
              Sign Up
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default LandingPageNavbar;
