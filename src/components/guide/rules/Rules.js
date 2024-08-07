import React, { useEffect, useState } from "react";
import rulesimage from "../../../assets/images/icons/rank.png";
import DropDown from "../../extra/dropdown/DropDown";
import DropDowns from "../../extra/dropdown/DropDown";
import axios from "axios";
// import ruless from "./ruless.json";
import config from "../../../config.json";
import { PhotoProvider, PhotoView } from "react-photo-view";
const Rules = () => {
  const [rules, setrules] = useState(null);
  useEffect(() => {
    axios.get(config.baseUrl + config.api + "guide/Rules").then((res) => {
      setrules(res.data);
    });
  });
  return (
    <div className="guide">
      <div className="guideHeader">
        <img src={rulesimage} className="guideHeaderImage"></img>
        <div className="whitetext contentTitle" id="rules">
          rules
        </div>
      </div>
      {rules && rules.header ? (
        <div className="guideContent">
          <p className="normaltext guideText">{rules.header}</p>
          <DropDowns data={rules.data}></DropDowns>
          {rules.image ? (
            <PhotoProvider>
              <PhotoView src={config.baseUrl + "/uploads/" + rules.image}>
                <img
                  src={config.baseUrl + "/uploads/" + rules.image}
                  className="guideContentImg"
                ></img>
              </PhotoView>
            </PhotoProvider>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Rules;
