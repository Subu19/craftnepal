import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import StatsComponent from "../components/stats";
import Coffee from "../components/extra/Coffee/Coffee";
import Footer from "../components/extra/footer/Footer";
export const Stats = () => {
  return (
    <div className="main" id="main">
      <Coffee></Coffee>
      <Nav focused={false} selected="stats"></Nav>
      <StatsComponent></StatsComponent>
      <Footer></Footer>
    </div>
  );
};
