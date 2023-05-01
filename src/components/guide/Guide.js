import React, { useEffect } from "react";
import lantern from "../../assets/images/lantern.png";
import etable from "../../assets/images/etable.png";

import rank from "../../assets/images/icons/rank.png";
import command from "../../assets/images/icons/command.png";
import faq from "../../assets/images/icons/faq.png";
import market from "../../assets/images/icons/market.png";
import others from "../../assets/images/icons/others.png";
import rules from "../../assets/images/icons/rules.png";
import aos from "aos";

import "./main.css";
import "./mobile.css";
import "aos/dist/aos.css";
import Guides from "./Guides";
import { Link } from "react-router-dom";
import Particle from "./particle";
import ScrollToTop from "../extra/ScrollToTop";
const GuideComponent = () => {
  useEffect(() => {
    aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      <ScrollToTop></ScrollToTop>

      <div className="lanternContainner">
        <img
          className="lantern "
          src={lantern}
          onClick={() => {
            document
              .getElementsByClassName("lanternLight")[0]
              .classList.toggle("lightsON");
            document
              .getElementsByClassName("lantern")[0]
              .classList.toggle("lanternDark");
            document
              .getElementsByClassName("etableContainner")[0]
              .classList.toggle("darkEtable");
          }}
        ></img>
        <span className="lanternLight lightsON"></span>
      </div>
      <div className="guideMainContainner">
        <div className="etableContainner">
          <Particle></Particle>
          <img src={etable} className="etable"></img>
        </div>
        <div className="guideLinkContainner">
          <div className="columnflex">
            <div
              className="contentTitle whitetext textcenter"
              data-aos="fade-up"
              data-aos-anchor-placement="bottom-bottom"
              data-aos-easing="ease-out-back"
            >
              Lost?
              <br />
              Help yourself
            </div>
            <GuideLinks></GuideLinks>
          </div>
        </div>
      </div>

      <Guides></Guides>
    </>
  );
};

const GuideLinks = () => {
  const showGuide = (id) => {
    var element = document.getElementById(id);
    var headerOffset = 105;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };
  return (
    <div className="guideLinkList">
      <div
        className="guideLink"
        onClick={() => {
          showGuide("rules");
        }}
        data-aos="zoom-in"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-easing="ease-out-back"
      >
        <img src={rules} className="guideIcon"></img>
        <div className="normaltext" style={{ color: "#80B523" }}>
          Rules
        </div>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-easing="ease-out-back"
        className="guideLink"
        onClick={() => {
          showGuide("ranks");
        }}
      >
        <img src={rank} className="guideIcon"></img>
        <div className="normaltext" style={{ color: "#F7B84E" }}>
          Ranks
        </div>
      </div>

      <div
        className="guideLink"
        onClick={() => {
          showGuide("market");
        }}
        data-aos="zoom-in"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-easing="ease-out-back"
      >
        <img src={market} className="guideIcon"></img>
        <div className="normaltext" style={{ color: "#EB5569" }}>
          Market
        </div>
      </div>

      <div className="break"></div>
      <div
        className="guideLink"
        onClick={() => {
          showGuide("commands");
        }}
        data-aos="zoom-in"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-easing="ease-out-back"
      >
        <img src={command} className="guideIcon"></img>
        <div className="normaltext" style={{ color: "#B7B7B7" }}>
          Commands
        </div>
      </div>
      <div
        className="guideLink"
        onClick={() => {
          showGuide("others");
        }}
        data-aos="zoom-in"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-easing="ease-out-back"
      >
        <img src={others} className="guideIcon"></img>
        <div className="normaltext" style={{ color: "#FFC850" }}>
          Others
        </div>
      </div>

      <div
        className="guideLink"
        // onClick={() => {
        //   showGuide("ranks");
        // }}
        data-aos="zoom-in"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-easing="ease-out-back"
      >
        <img src={faq} className="guideIcon"></img>
        <div className="normaltext" style={{ color: "#369DFF" }}>
          FAQ
        </div>
      </div>
    </div>
  );
};

export default GuideComponent;
