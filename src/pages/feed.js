import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import FeedContainner from "../components/feed";
export const Feed = () => {
  return (
    <div className="main" id="main">
      <Nav selected="feed"></Nav>
      <FeedContainner></FeedContainner>
    </div>
  );
};
