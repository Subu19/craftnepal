import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Path from "./routes/path";
import { UserProvider } from "./providers/UserProvider";
import { SocketProvider } from "./providers/SocketProvider";
import Footer from "./components/extra/footer/Footer";

function App() {
  return (
    <React.StrictMode>
      <UserProvider>
        <SocketProvider>
          <Path></Path>
        </SocketProvider>
      </UserProvider>
    </React.StrictMode>
  );
}

export default App;
