import React, { useState } from "react";
import rank from "../../../assets/images/icons/command.png";
import DropDown from "../../extra/dropdown/DropDown";
import DropDowns from "../../extra/dropdown/DropDown";

const data = [
  {
    title: "Market",
    text: "A player has to complete all the requirements of each rank to get them in game. When they complete the requirements, Server will promote them to their respective Rank In-game according to the fulfilled requirements. CraftNepal-BOT will change your Role in discord when you rank up In-game.",
  },
  {
    title: "Claim",
    text: "A player has to complete all the requirements of each rank to get them in game. When they complete the requirements, Server will promote them to their respective Rank In-game according to the fulfilled requirements. CraftNepal-BOT will change your Role in discord when you rank up In-game.",
  },
];

const Commands = () => {
  return (
    <div className="guide">
      <div className="guideHeader">
        <img src={rank} className="guideHeaderImage"></img>
        <div className="whitetext contentTitle" id="commands">
          Commands
        </div>
      </div>

      <div className="guideContent">
        <p className="normaltext guideText">
          A player has to complete all the requirements of each rank to get them
          in game. When they complete the requirements, Server will promote them
          to their respective Rank In-game according to the fulfilled
          requirements. CraftNepal-BOT will change your Role in discord when you
          rank up In-game.
          <br />
          <br /> Rank list and their requirements are listed below:
        </p>
        <DropDowns data={data}></DropDowns>
      </div>
    </div>
  );
};

export default Commands;
