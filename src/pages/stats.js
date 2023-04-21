import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import StatsComponent from "../components/stats";
export const Stats = () => {
  return (
    <div className="main" id="main">
      <Nav selected="stats"></Nav>
      <StatsComponent></StatsComponent>
    </div>
  );
};
