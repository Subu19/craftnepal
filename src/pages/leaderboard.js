import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import LeaderboardComponent from "../components/stats/leaderboard";
export const Leaderboard = () => {
  return (
    <div className="main" id="main">
      <Nav selected="stats"></Nav>
      <LeaderboardComponent></LeaderboardComponent>
    </div>
  );
};
