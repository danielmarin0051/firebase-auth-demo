import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  useFirebase,
  useWaitForAuthCheck
} from "../../Providers/FirebaseProvider";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link as MuiLink,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../Copyright";

import ROUTES from "../../Constants/routes";
import AUTH_ERROR_CODES from "../../Constants/firebaseErrorCodes";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInForm = ({ redirect, history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const Firebase = useFirebase();
  const waitForAuthCheck = useWaitForAuthCheck();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await Firebase.auth().signInWithEmailAndPassword(email, password);
      await waitForAuthCheck();
      if (redirect) {
        history.push(redirect);
      }
    } catch (err) {
      if (err.code === AUTH_ERROR_CODES.USER_NOT_FOUND) {
        setEmailError({ message: "Oops! We found no user with that email." });
      } else if (err.code === AUTH_ERROR_CODES.WRONG_PASSWORD) {
        setPasswordError({ message: "Wrong password!" });
      }
      console.log(err);
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else {
      console.error(`SignInBase::onChange received invalid input name`);
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!!emailError}
            helperText={emailError && emailError.message}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            error={!!passwordError}
            helperText={passwordError && passwordError.message}
            onChange={onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <MuiLink href="#" variant="body2">
                Forgot password?
              </MuiLink>
            </Grid>
            <Grid item>
              <MuiLink href={ROUTES.SIGN_UP} variant="body2">
                {"Don't have an account? Sign Up"}
              </MuiLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default withRouter(SignInForm);
