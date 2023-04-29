import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import GuideComponent from "../components/guide/Guide";
import Coffee from "../components/extra/Coffee/Coffee";
import Footer from "../components/extra/footer/Footer";
export const Guide = () => {
  return (
    <div className="main" id="main">
      <Coffee></Coffee>
      <Nav focused={false} selected="guide"></Nav>
      <GuideComponent></GuideComponent>
      <Footer></Footer>
    </div>
  );
};
