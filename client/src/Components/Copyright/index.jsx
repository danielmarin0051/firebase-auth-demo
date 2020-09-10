import React from 'react'
import {
  Typography,
  Link,
} from '@material-ui/core'
import ROUTES from "../../Constants/routes"

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href={ROUTES.LANDING}>
        NET-AI
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}