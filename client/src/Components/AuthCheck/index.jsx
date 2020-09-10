import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { useAuthUser, useUserIsLoading } from "../../Providers/FirebaseProvider";

const AuthCheck = ({ children, condition, redirect, loadingFallback }) => {
  const WithRouterComponentBase = ({ history, location }) => {
    const authUser = useAuthUser();
    const userIsLoading = useUserIsLoading();
    const isAuthorized = condition(authUser);
    useEffect(() => {
      if (!isAuthorized) {
        // console.log(
        //   `AuthCheck false, redirecting from ${location.pathname} to ${redirect}`
        // );
        history.push(redirect);
      }
    }, [authUser, isAuthorized, userIsLoading, history, location]);
    if (userIsLoading && loadingFallback) {
      return <>{loadingFallback}</>;
    }
    else if (isAuthorized) return <>{children}</>;
    else return null;
  };
  const WithRouterComponent = withRouter(WithRouterComponentBase);
  return <WithRouterComponent />;
};

AuthCheck.propTypes = {
  children: PropTypes.node.isRequired,
  condition: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
  loadingFallback: PropTypes.node,
};

export default AuthCheck;
