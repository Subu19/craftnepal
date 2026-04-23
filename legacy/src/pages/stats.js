import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import StatsComponent from "../components/stats";
import Coffee from "../components/extra/Coffee/Coffee";
import Footer from "../components/extra/footer/Footer";
import { Helmet } from "react-helmet-async";
export const Stats = () => {
  return (
    <div className="main" id="main">
      <Helmet>
        <title>Stats-CraftNepal</title>
        <meta property="og:title" content="Stats-CraftNepal" />
        <meta
          name="description"
          content="Check your ingame stats right from our website. "
        />
      </Helmet>
      <Coffee></Coffee>
      <Nav focused={false} selected="stats"></Nav>
      <StatsComponent></StatsComponent>
      <Footer></Footer>
    </div>
  );
};
