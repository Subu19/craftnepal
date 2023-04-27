import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import StatsComponent from "../components/stats";
import Coffee from "../components/extra/Coffee/Coffee";
export const Stats = () => {
  return (
    <div className="main" id="main">
      <Coffee></Coffee>
      <Nav selected="stats"></Nav>
      <StatsComponent></StatsComponent>
    </div>
  );
};
