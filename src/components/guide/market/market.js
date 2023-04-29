import React from "react";
import marketpng from "../../../assets/images/icons/market.png";
import CustomMarkDown from "../../extra/CustomMarkDown";

import marketdata from "./market.json";
import DropDowns from "../../extra/dropdown/DropDown";
const Market = () => {
  return (
    <div className="guide">
      <div className="guideHeader">
        <img src={marketpng} className="guideHeaderImage"></img>
        <div className="whitetext contentTitle" id="market">
          Market
        </div>
      </div>

      <div className="guideContent">
        <p className="guideText normaltext">
          <CustomMarkDown content={marketdata.header}></CustomMarkDown>
        </p>
        <DropDowns data={marketdata.data}></DropDowns>
      </div>
    </div>
  );
};

export default Market;
