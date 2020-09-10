import React from "react";
import { useUser } from "../../Providers/FirebaseProvider";
import { Typography } from "@material-ui/core";
import DashboardNavbar from "../DashboardNavbar";

import rocketGIF from "../../images/rocket.gif";

import css from "./index.module.css";

const Dashboard = () => {
  const user = useUser();
  return (
    <div className={css.root}>
      <DashboardNavbar />
      <div className={css.dashboardRoot}>
        <div className={css.welcomeRoot}>
          <img src={rocketGIF} alt="Rocket GIF" />
          <Typography variant="h2" align="center" color="textPrimary">
            Welcome, {user && user.name}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
