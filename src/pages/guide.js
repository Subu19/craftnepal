import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import GuideComponent from "../components/guide/Guide";
export const Guide = () => {
  return (
    <div className="main" id="main">
      <Nav selected="guide"></Nav>
      <GuideComponent></GuideComponent>
    </div>
  );
};
