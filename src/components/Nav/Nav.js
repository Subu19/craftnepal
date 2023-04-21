import React, { useEffect, useState } from "react";
import "../../css/nav.css";
import "../../css/mobile.css";

import logo from "../../assets/svg/CN.svg";
import home from "../../assets/images/home.png";
import guide from "../../assets/images/guide.png";
import stats from "../../assets/images/stats.png";
import feed from "../../assets/images/feed.png";
import Button from "../extra/Button";
import { Link } from "react-router-dom";
import { clearScrollHistory } from "../extra/Clearscroll";

const Nav = (props) => {
  const { selected } = props;
  var dynamic = false;
  const handleScroll = (e) => {
    var element = document.getElementsByClassName("navbar")[0];
    if (window.scrollY > 10 && dynamic == false) {
      element.classList.add("dynamicNav");
      dynamic = true;
    }
    if (window.scrollY < 5 && dynamic == true) {
      element.classList.remove("dynamicNav");
      dynamic = false;
    }
  };
  useEffect(() => {
    document.addEventListener("scroll", (e) => handleScroll(e));
  }, []);

  return (
    <>
      <div className="navSpace"></div>
      <div className="navbar">
        <img src={logo} className="logo"></img>
        <div className="navLinks">
          <Link
            to={"/"}
            className={"nav " + (selected == "home" ? "selected" : "")}
            onClick={clearScrollHistory()}
          >
            <img className="navImg" src={home}></img>
            <div>Home</div>
          </Link>
          <Link
            onClick={clearScrollHistory()}
            to={"/stats"}
            className={"nav " + (selected == "stats" ? "selected" : "")}
          >
            <img className="navImg" src={stats}></img>
            <div>Stats</div>
          </Link>
          <Link
            to={"/feed"}
            className={"nav " + (selected == "feed" ? "selected" : "")}
            onClick={clearScrollHistory()}
          >
            <img className="navImg" src={feed}></img>
            <div>Feed</div>
          </Link>
          <Link
            to={"/guide"}
            className={"nav " + (selected == "guide" ? "selected" : "")}
            onClick={clearScrollHistory()}
          >
            <img className="navImg" src={guide}></img>
            <div>Guide</div>
          </Link>
        </div>
        <Button></Button>
      </div>
    </>
  );
};

export default Nav;
