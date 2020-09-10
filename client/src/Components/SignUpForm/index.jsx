import React, { useState } from "react";
import { useFirebase, useSetAuthCheckLock } from "../../Providers/FirebaseProvider";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link as MuiLink,
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
import Copyright from "../Copyright"

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
  signInLink: {
    display: 'block',
    textAlign: 'center'
  }
}));

const SignUpForm2 = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const Firebase = useFirebase();
  const setAuthCheckLock = useSetAuthCheckLock();

  const validateForm = () => {
    let formIsValid = true;
    if (name === "") {
      setNameError({ message: "Please enter your name." });
      formIsValid = false;
    }
    if (email === "") {
      setEmailError({ message: "Please enter your email" });
      formIsValid = false;
    }
    if (password.length < 8) {
      setPasswordError({ message: "Password must have at least 8 characters" });
      formIsValid = false;
    }
    return formIsValid;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setAuthCheckLock(true);
    try {
      const { user } = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("onSubmit: user created");
      await Firebase.db().collection("users").doc(user.uid).set({
        uid: user.uid,
        name: name,
        email: email,
      });
      console.log("onSubmit: user DOC created");
    } catch (err) {
      if (err.code === AUTH_ERROR_CODES.EMAIL_ALREADY_EXISTS) {
        setEmailError({ message: "Oops! This email is already registered" });
      } else if (err.code === AUTH_ERROR_CODES.INVALID_PASSWORD) {
        setPasswordError({
          message: "Your password must have at least 8 characters",
        });
      } else {
        console.log('onSubmit error: ');
        console.log(err);
      }
    }
    setAuthCheckLock(false);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "name") setName(value);
    else {
      console.error(`SignInBase::onChange received invalid input name`);
    }
  };

  const handleClickShowPassword = () => setShowPassword(prev => !prev);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            error={!!nameError}
            helperText={nameError && nameError.message}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            InputProps={{endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <MuiLink href={ROUTES.SIGN_IN} variant="body2" className={classes.signInLink}>
            {"Already have an account? Sign In"}
          </MuiLink>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUpForm2;
