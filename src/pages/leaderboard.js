import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import LeaderboardComponent from "../components/stats/leaderboard";
import Coffee from "../components/extra/Coffee/Coffee";
import Footer from "../components/extra/footer/Footer";
import { Helmet } from "react-helmet-async";
export const Leaderboard = () => {
  return (
    <div className="main" id="main">
      <Helmet>
        <title>Leaderboard-CraftNepal</title>
        <meta property="og:title" content="Leaderboard-CraftNepal" />
        <meta
          name="description"
          content="We provide all leaderboards from ingame. It includes top 10 players. Players can find their position in top 100 as well. "
        />
      </Helmet>
      <Coffee></Coffee>
      <Nav focused={false} selected="stats"></Nav>
      <LeaderboardComponent></LeaderboardComponent>
      <Footer></Footer>
    </div>
  );
};
