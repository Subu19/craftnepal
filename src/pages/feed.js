import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import FeedContainner from "../components/feed";
import Coffee from "../components/extra/Coffee/Coffee";
export const Feed = () => {
  return (
    <div className="main" id="main">
      <Coffee></Coffee>
      <Nav selected="feed"></Nav>
      <FeedContainner></FeedContainner>
    </div>
  );
};
