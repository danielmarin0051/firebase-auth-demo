import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ROUTES from "../../Constants/routes";
import Loading from "../Loading"

const LandingPage = React.lazy(() => import("../LandingPage"));
const DashBoard = React.lazy(() => import("../Dashboard"));
const SignInPage = React.lazy(() => import("../SignInPage"));
const SignUpPage = React.lazy(() => import("../SignUpPage"));
const AuthCheck = React.lazy(() => import("../AuthCheck"));

const Application = () => {
  const isAuthenticated = (user) => user !== null;
  const isNotAuthenticated = (user) => user === null;
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={"/loading"} component={Loading} />
          <Route exact path={ROUTES.HOME}>
            <AuthCheck
              condition={isAuthenticated}
              redirect={ROUTES.SIGN_IN}
              loadingFallback={<Loading />}
            >
              <DashBoard />
            </AuthCheck>
          </Route>
          <Route exact path={ROUTES.SIGN_IN}>
            <AuthCheck condition={isNotAuthenticated} redirect={ROUTES.HOME}>
              <SignInPage />
            </AuthCheck>
          </Route>
          <Route exact path={ROUTES.SIGN_UP}>
            <AuthCheck condition={isNotAuthenticated} redirect={ROUTES.HOME}>
              <SignUpPage />
            </AuthCheck>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Application;
