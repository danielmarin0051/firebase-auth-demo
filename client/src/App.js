import React from "react";
import Application from "./Components/Application";
import FirebaseProvider from "./Providers/FirebaseProvider";

function App() {
  return (
    <div className="App">
      <FirebaseProvider>
        <Application />
      </FirebaseProvider>
    </div>
  );
}

export default App;
