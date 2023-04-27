import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import LeaderboardComponent from "../components/stats/leaderboard";
import Coffee from "../components/extra/Coffee/Coffee";
export const Leaderboard = () => {
  return (
    <div className="main" id="main">
      <Coffee></Coffee>
      <Nav selected="stats"></Nav>
      <LeaderboardComponent></LeaderboardComponent>
    </div>
  );
};
