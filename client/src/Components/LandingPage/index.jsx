import React from "react";
import logo from "../../images/logo.svg";
import SignInForm from "../SignInForm";
import LandingPageNavbar from "../LandingPageNavbar";
import Pricing from "../Pricing"
import {useUser} from "../../Providers/FirebaseProvider"
import ROUTES from "../../Constants/routes"

import css from "./index.module.css";
import cn from "classnames";
import Footer from "../Footer";

const LandingPage = () => {
  const user = useUser();
  return (
    <div className={css.root}>
      <LandingPageNavbar isFixed />
      <div id="slide1" className={css.slide}>
        <div className={cn(css.background, css.background1)} />
        <div className={css.foreground}>
          <div className={cn(css.hero, user && css.center)}>
            <img src={logo} alt="NET-AI Logo" />
            <h1>The ultimate networking security for your company</h1>
          </div>
          <div className={cn(css.signInWrapper, user && css.displayNone)}>
            <SignInForm redirect={ROUTES.HOME}/>
          </div>
        </div>
      </div>
      <div id="slide2" className={css.slide}>
        <div className={cn(css.background2, css.background)} />
        <div className={css.foreground}>
          <Pricing />
        </div>
      </div>
      <div id="footer">
        <div className={css.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
