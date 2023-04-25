import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Path from "./routes/path";
import { UserProvider } from "./providers/UserProvider";

function App() {
  return (
    <React.StrictMode>
      <UserProvider>
        <Path></Path>
      </UserProvider>
    </React.StrictMode>
  );
}

export default App;
