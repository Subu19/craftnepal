import React from "react";
import CustomMarkDown from "../../extra/CustomMarkDown";
import rulespng from "../../../assets/images/icons/rules.png";

import rulesjson from "./rules.json";
import DropDowns from "../../extra/dropdown/DropDown";
const heading = ` Please keep in mind that all the posts and comments will be moderated
          each day (if applicable). We do appreciate your comments and feedback
          on the content of this website however, you will need to follow
          our rules and guidelines. Staff will never ask for your
          password so be wary of anyone stating they can give your free stuffs
          if you provide your password or other sensitive information. DO NOT
          click on any suspicious links that promotes free stuffs. All events
          and prizes will be announced officially in our Announcement channel,
          both in Discord and in this website. Failure to adhere to the
          following rules will result in in-game **jail time** or **permanent ban**.`;
const Rules = () => {
  return (
    <div className="guide">
      <div className="guideHeader">
        <img src={rulespng} className="guideHeaderImage"></img>
        <div className="whitetext contentTitle" id="rules">
          Rules
        </div>
      </div>
      <div className="guideContent">
        <p className="guideText normaltext">
          <CustomMarkDown content={heading}></CustomMarkDown>
        </p>
        <DropDowns data={rulesjson.data}></DropDowns>
      </div>
    </div>
  );
};

export default Rules;
