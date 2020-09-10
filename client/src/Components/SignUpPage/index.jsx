import React from "react";
import SignUpForm from "../SignUpForm"
import LandingPageNavbar from "../LandingPageNavbar"

const SignUpPage = () => {
  return (
    <>
      <LandingPageNavbar isNotLandingPage/>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
