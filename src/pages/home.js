import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import HomeComponent from "../components/home";
export const Home = () => {
  return (
    <div className="main" id="main">
      <Nav selected="home"></Nav>
      <HomeComponent></HomeComponent>
    </div>
  );
};
