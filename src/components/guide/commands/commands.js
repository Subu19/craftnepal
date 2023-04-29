import React, { useState } from "react";
import rank from "../../../assets/images/icons/command.png";
import DropDown from "../../extra/dropdown/DropDown";
import DropDowns from "../../extra/dropdown/DropDown";
import commands from "./commands.json";

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
        <p className="normaltext guideText">{commands.header}</p>
        <DropDowns data={commands.data}></DropDowns>
      </div>
    </div>
  );
};

export default Commands;
