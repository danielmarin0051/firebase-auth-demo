import React from "react";
import { Button } from "@material-ui/core";
import { useFirebase } from "../../Providers/FirebaseProvider";

const SignOutButton = () => {
  const Firebase = useFirebase();
  return (
    <Button
      size="large"
      color="secondary"
      variant="outlined"
      onClick={() => Firebase.auth().signOut()}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
