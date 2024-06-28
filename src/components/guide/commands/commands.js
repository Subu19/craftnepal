import React, { useEffect, useState } from "react";
import commandimage from "../../../assets/images/icons/command.png";
import DropDown from "../../extra/dropdown/DropDown";
import DropDowns from "../../extra/dropdown/DropDown";
import axios from "axios";
// import commands from "./commands.json";
import config from "../../../config.json";
import { PhotoProvider, PhotoView } from "react-photo-view";
const Commands = () => {
  const [commands, setcommands] = useState(null);
  useEffect(() => {
    axios.get(config.baseUrl + config.api + "guide/Commands").then((res) => {
      setcommands(res.data);
    });
  });
  return (
    <div className="guide">
      <div className="guideHeader">
        <img src={commandimage} className="guideHeaderImage"></img>
        <div className="whitetext contentTitle" id="commands">
          Commands
        </div>
      </div>
      {commands ? (
        <div className="guideContent">
          <p className="normaltext guideText">{commands.header}</p>
          <DropDowns data={commands.data}></DropDowns>
          {commands.image ? (
            <PhotoProvider>
              <PhotoView src={config.baseUrl + "/uploads/" + commands.image}>
                <img
                  src={config.baseUrl + "/uploads/" + commands.image}
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

export default Commands;
