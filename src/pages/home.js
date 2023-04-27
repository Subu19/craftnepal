import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import HomeComponent from "../components/home";
import Coffee from "../components/extra/Coffee/Coffee";
export const Home = () => {
  return (
    <div className="main" id="main">
      <Coffee></Coffee>
      <Nav selected="home"></Nav>
      <HomeComponent></HomeComponent>
    </div>
  );
};
