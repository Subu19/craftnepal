import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import GuideComponent from "../components/guide/Guide";
import Coffee from "../components/extra/Coffee/Coffee";
export const Guide = () => {
  return (
    <div className="main" id="main">
      <Coffee></Coffee>
      <Nav selected="guide"></Nav>
      <GuideComponent></GuideComponent>
    </div>
  );
};
