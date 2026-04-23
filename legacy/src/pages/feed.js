import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import FeedContainner from "../components/feed";
import Coffee from "../components/extra/Coffee/Coffee";
import { Helmet } from "react-helmet-async";
export const Feed = () => {
  return (
    <div className="main2" id="main">
      <Helmet>
        <title>Feed-CraftNepal</title>
        <meta property="og:title" content="Feed-CraftNepal" />
        <meta
          name="description"
          content="Post your most memorial photo from in-game and share it with your friends."
        />
      </Helmet>
      <Coffee></Coffee>
      <Nav selected="feed" focused={true}></Nav>
      <FeedContainner></FeedContainner>
    </div>
  );
};
