import React from "react";
import lantern from "../../assets/images/lantern.png";
import etable from "../../assets/images/etable.png";

import rank from "../../assets/images/icons/rank.png";
import command from "../../assets/images/icons/command.png";
import faq from "../../assets/images/icons/faq.png";
import market from "../../assets/images/icons/market.png";
import others from "../../assets/images/icons/others.png";
import rules from "../../assets/images/icons/rules.png";

import "./main.css";
import Guides from "./Guides";
import { Link } from "react-router-dom";
import Particle from "./particle";
const GuideComponent = () => {
  return (
    <>
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
            <div className="contentTitle whitetext textcenter">
              Lost?
              <br />
              Help your self
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
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="guideLinkList">
      <div
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
      >
        <img src={market} className="guideIcon"></img>
        <div className="normaltext" style={{ color: "#EB5569" }}>
          Market
        </div>
      </div>

      <div
        className="guideLink"
        onClick={() => {
          showGuide("ranks");
        }}
      >
        <img src={command} className="guideIcon"></img>
        <div className="normaltext" style={{ color: "#B7B7B7" }}>
          Commands
        </div>
      </div>
      <div className="break"></div>
      <div
        className="guideLink"
        onClick={() => {
          showGuide("ranks");
        }}
      >
        <img src={rules} className="guideIcon"></img>
        <div className="normaltext" style={{ color: "#80B523" }}>
          Rules
        </div>
      </div>

      <div
        className="guideLink"
        onClick={() => {
          showGuide("ranks");
        }}
      >
        <img src={others} className="guideIcon"></img>
        <div className="normaltext" style={{ color: "#FFC850" }}>
          Others
        </div>
      </div>

      <div
        className="guideLink"
        onClick={() => {
          showGuide("ranks");
        }}
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
