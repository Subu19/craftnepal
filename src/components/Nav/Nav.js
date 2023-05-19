import React, { useEffect, useState } from "react";
import "../../css/nav.css";
import "../../css/mobile.css";

import gallery from "../../assets/images/icons/gallery.png";
import logo from "../../assets/svg/CN.svg";
import home from "../../assets/images/home.png";
import guide from "../../assets/images/guide.png";
import stats from "../../assets/images/stats.png";
import pin from "../../assets/images/pin.png";

import feed from "../../assets/images/feed.png";
import Button from "../extra/UserComponent";
import { Link } from "react-router-dom";
import { clearScrollHistory } from "../extra/Clearscroll";
import UserComponent from "../extra/UserComponent";

const Nav = (props) => {
  const { selected, focused } = props;
  const [mobilenav, setmobilenav] = useState(false);

  var dynamic = false;
  var STT = false;
  const handleScroll = (e) => {
    const scrollToTop = document.getElementById("scrollToTop");
    if (window.scrollY > 500) {
      if (scrollToTop && !STT) {
        scrollToTop.classList.add("showScrollToTop");
        STT = true;
      }
    } else {
      if (scrollToTop && STT) {
        scrollToTop.classList.remove("showScrollToTop");
        STT = false;
      }
    }
    if (mobilenav == true) return;
    var element = document.getElementsByClassName("navbar")[0];
    if (focused == false) {
      if (window.scrollY > 10 && dynamic == false) {
        element.classList.add("dynamicNav");
        dynamic = true;
      }
      if (window.scrollY < 5 && dynamic == true && !focused) {
        element.classList.remove("dynamicNav");
        dynamic = false;
      }
    } else {
      if (dynamic == false) {
        element.classList.add("dynamicNav");
        dynamic = true;
      }
    }
  };
  useEffect(() => {
    document.addEventListener("scroll", (e) => handleScroll(e));
  }, []);

  const handleMenu = () => {
    document
      .getElementsByClassName("mobileNavLinks")[0]
      .classList.toggle("openMobileNav");
    document.getElementsByClassName("navbar")[0].classList.toggle("solidNav");
    const button = document.getElementsByClassName("mybutton")[0];
    if (button) button.classList.toggle("showButton");
  };
  return (
    <>
      <div className="navSpace"></div>
      <div className={focused ? "navbar dynamicNav2" : "navbar"}>
        <Link className="navLogo" to={"/"} onClick={clearScrollHistory()}>
          <img src={logo} className="logo"></img>
        </Link>
        <div className="navLinks">
          <Link
            onClick={clearScrollHistory()}
            to={"/stats"}
            id="stats"
            className={"nav " + (selected == "stats" ? "selected" : "")}
          >
            <img className="navImg" src={stats}></img>
            <div>Stats</div>
            <i class="fa fa-chevron-down navDrop"></i>

            <Link
              onClick={clearScrollHistory()}
              to={"/leaderboard"}
              className="subNav"
            >
              <div>Leaderboard</div>
            </Link>
          </Link>
          <Link
            to={"/feed"}
            className={"nav " + (selected == "feed" ? "selected" : "")}
            onClick={() => clearScrollHistory()}
          >
            <img className="navImg" src={feed}></img>
            <div>Feed</div>
          </Link>
          <Link
            to={"/guide"}
            className={"nav " + (selected == "guide" ? "selected" : "")}
            onClick={() => clearScrollHistory()}
          >
            <img className="navImg" src={guide}></img>
            <div>Guide</div>
          </Link>
          <Link
            to={"/gallery"}
            className={"nav " + (selected == "gallery" ? "selected" : "")}
            onClick={() => clearScrollHistory()}
          >
            <img className="navImg" src={gallery}></img>
            <div>Fotos</div>
          </Link>
          <Link
            to={"/map"}
            className={"nav " + (selected == "map" ? "selected" : "")}
            onClick={() => clearScrollHistory()}
          >
            <img className="navImg" src={pin}></img>
            <div>Map</div>
          </Link>
        </div>
        <UserComponent></UserComponent>
        <i
          class="material-icons menuIcon"
          onClick={() => {
            handleMenu();
          }}
        >
          menu
        </i>
        <div className="mobileNavLinks">
          <Link
            to={"/"}
            className={"nav " + (selected == "home" ? "selected" : "")}
            onClick={() => clearScrollHistory()}
          >
            <img className="navImg" src={home}></img>
            <div>Home</div>
          </Link>
          <div
            id="statsmob"
            className={
              "subnavParent nav " + (selected == "stats" ? "selected" : "")
            }
          >
            <img className="navImg" src={stats}></img>
            <div className="subNavContainnerMob">
              <Link
                className="mobsubNav"
                onClick={() => clearScrollHistory()}
                to={"/stats"}
              >
                Stats
              </Link>
              <Link
                onClick={clearScrollHistory()}
                to={"/leaderboard"}
                className="mobsubNav"
              >
                Leaderboard
              </Link>
            </div>
          </div>
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
      </div>
    </>
  );
};

export default Nav;
