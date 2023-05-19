import React from "react";
import duck from "../assets/images/Duck.png";
import Nav from "../components/Nav/Nav";
const ErrorComponent = () => {
  return (
    <div className="errorContainner main">
      <Nav focused={false} selected="home"></Nav>
      <img src={duck} style={{ height: "100px" }}></img>
      <div className="contentTitle  textcenter whitetext">
        Something went wrong
      </div>
      <div className="normaltext">Chicken feels the same</div>
    </div>
  );
};

export default ErrorComponent;
