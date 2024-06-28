import React, { useEffect, useState } from "react";
import ranksimage from "../../../assets/images/icons/rank.png";
import DropDown from "../../extra/dropdown/DropDown";
import DropDowns from "../../extra/dropdown/DropDown";
import axios from "axios";
// import rankss from "./rankss.json";
import config from "../../../config.json";
import { PhotoProvider, PhotoView } from "react-photo-view";
const Ranks = () => {
  const [ranks, setranks] = useState(null);
  useEffect(() => {
    axios.get(config.baseUrl + config.api + "guide/Ranks").then((res) => {
      setranks(res.data);
    });
  });
  return (
    <div className="guide">
      <div className="guideHeader">
        <img src={ranksimage} className="guideHeaderImage"></img>
        <div className="whitetext contentTitle" id="ranks">
          ranks
        </div>
      </div>
      {ranks && ranks.header ? (
        <div className="guideContent">
          <p className="normaltext guideText">{ranks.header}</p>
          <DropDowns data={ranks.data}></DropDowns>
          {ranks.image ? (
            <PhotoProvider>
              <PhotoView src={config.baseUrl + "/uploads/" + ranks.image}>
                <img
                  src={config.baseUrl + "/uploads/" + ranks.image}
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

export default Ranks;
