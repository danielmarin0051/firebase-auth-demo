import React from "react";
import SignInForm from "../SignInForm";
import LandingPageNavbar from "../LandingPageNavbar";

const SignInPage = () => {
  return (
    <>
      <LandingPageNavbar isNotLandingPage/>
      <SignInForm />
    </>
  );
};

export default SignInPage;
