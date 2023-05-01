import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Path from "./routes/path";
import { UserProvider } from "./providers/UserProvider";
import { SocketProvider } from "./providers/SocketProvider";
import Footer from "./components/extra/footer/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <Helmet>
          <meta
            property="og:image"
            content="https://cdn.discordapp.com/attachments/1101600766533308496/1102489437268627456/CN.png"
          />
        </Helmet>
        <UserProvider>
          <SocketProvider>
            <Path></Path>
          </SocketProvider>
        </UserProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
}

export default App;
