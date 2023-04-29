import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import LeaderboardComponent from "../components/stats/leaderboard";
import Coffee from "../components/extra/Coffee/Coffee";
import Footer from "../components/extra/footer/Footer";
export const Leaderboard = () => {
  return (
    <div className="main" id="main">
      <Coffee></Coffee>
      <Nav focused={false} selected="stats"></Nav>
      <LeaderboardComponent></LeaderboardComponent>
      <Footer></Footer>
    </div>
  );
};
