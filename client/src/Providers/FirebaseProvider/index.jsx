import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import "firebase/analytics";
import EventEmitter from "eventemitter3";

var config = {
  apiKey: "AIzaSyCHiYkdxDqqDSGZlO3cOmTg5eyLrdMmvAI",
  authDomain: "fir-auth-demo-b1dee.firebaseapp.com",
  databaseURL: "https://fir-auth-demo-b1dee.firebaseio.com",
  projectId: "fir-auth-demo-b1dee",
  storageBucket: "fir-auth-demo-b1dee.appspot.com",
  messagingSenderId: "705821627437",
  appId: "1:705821627437:web:916da176bd99a8cd6694a4",
  measurementId: "G-1CKWL6Z97Z",
};

class FirebaseApp {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
    // firebase.analytics();
    this.auth = firebase.auth;
    this.db = firebase.firestore;
  }
}

const FirebaseContext = React.createContext(null);

class FirebaseProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      authUser: null,
      user: null,
      isLoading: true,
    };
    this.Firebase = new FirebaseApp();
    this.authCheckLock = false;
    this.authCheckFinishCount = 0;
    this.Emitter = new EventEmitter();
  }

  setAuthCheckLock = (isLocked) => {
    if (isLocked) this.authCheckLock = true;
    else {
      this.Emitter.emit("unlock-auth-check");
      this.authCheckLock = false;
    }
  };

  getUnlocked = () => {
    return new Promise((resolve) =>
      this.Emitter.on("unlock-auth-check", () => resolve())
    );
  };

  signalAuthCheckFinished = (isLocked) => {
    this.authCheckFinishCount++;
    this.Emitter.emit("auth-check-finished");
  };

  waitForAuthCheck = () => {
    return new Promise((resolve) => {
      if (this.authCheckFinishCount > 0) {
        this.authCheckFinishCount--;
        resolve();
      } else {
        this.Emitter.on("auth-check-finished", () => resolve());
      }
    });
  };

  loadUserData = async (authUser) => {
    // assumes authUser !== null;
    try {
      const user = (
        await this.Firebase.db().collection("users").doc(authUser.uid).get()
      ).data();
      this.setState({ user });
    } catch (err) {
      console.log("loadUserData: ", err);
      this.setState({ user: null });
    }
    if (this.state.isLoading) this.setState({ isLoading: false });
  };

  componentDidMount() {
    this.Firebase.auth().onAuthStateChanged(async (authUser) => {
      if (this.authCheckLock) await this.getUnlocked();
      try {
        if (authUser) {
          this.setState({ authUser, isLoading: true });
          this.loadUserData(authUser);
        } else {
          this.setState({ authUser: null, user: null });
        }
      } catch (err) {
        console.log(err);
        this.setState({ authUser: null, user: null });
      }
      this.signalAuthCheckFinished();
    });
  }

  render() {
    const { authUser, user, isLoading } = this.state;
    const { Firebase, setAuthCheckLock, waitForAuthCheck } = this;
    const ContextValues = {
      authUser,
      user,
      isLoading,
      Firebase,
      setAuthCheckLock,
      waitForAuthCheck,
    };
    return <FirebaseContext.Provider value={ContextValues} {...this.props} />;
  }
}

const useFirebase = () => {
  const { Firebase } = React.useContext(FirebaseContext);
  return Firebase;
};

const useUser = () => {
  const { user } = React.useContext(FirebaseContext);
  return user;
};

const useAuthUser = () => {
  const { authUser } = React.useContext(FirebaseContext);
  return authUser;
};

const useUserIsLoading = () => {
  const { isLoading } = React.useContext(FirebaseContext);
  return isLoading;
};

const useSetAuthCheckLock = () => {
  const { setAuthCheckLock } = React.useContext(FirebaseContext);
  return setAuthCheckLock;
};

const useWaitForAuthCheck = () => {
  const { waitForAuthCheck } = React.useContext(FirebaseContext);
  return waitForAuthCheck;
};

export default FirebaseProvider;
export {
  useFirebase,
  useUser,
  useAuthUser,
  useUserIsLoading,
  useSetAuthCheckLock,
  useWaitForAuthCheck,
};
