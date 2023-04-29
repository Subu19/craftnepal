import React from "react";
import star from "../../../assets/images/icons/others.png";
import data from "./others.json";
import CustomMarkDown from "../../extra/CustomMarkDown";
import DropDowns from "../../extra/dropdown/DropDown";
const Others = () => {
  return (
    <div className="guide">
      <div className="guideHeader">
        <img src={star} className="guideHeaderImage"></img>
        <div className="whitetext contentTitle" id="others">
          Others
        </div>
      </div>

      <div className="guideContent">
        <p className="guideText normaltext">
          <CustomMarkDown content={data.header}></CustomMarkDown>
        </p>
        <DropDowns data={data.data}></DropDowns>
      </div>
    </div>
  );
};

export default Others;
