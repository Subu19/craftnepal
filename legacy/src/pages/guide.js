import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import GuideComponent from "../components/guide/Guide";
import Coffee from "../components/extra/Coffee/Coffee";
import Footer from "../components/extra/footer/Footer";
import { Helmet } from "react-helmet-async";
export const Guide = () => {
  return (
    <div className="main" id="main">
      <Helmet>
        <title>Guide-CraftNepal</title>
        <meta property="og:title" content="Guide-CraftNepal" />
        <meta
          name="description"
          content="Get all the help you need for our Minecraft Server. It includes ranks, commands, market and more."
        />
      </Helmet>
      <Coffee></Coffee>
      <Nav focused={false} selected="guide"></Nav>
      <GuideComponent></GuideComponent>
      <Footer></Footer>
    </div>
  );
};
