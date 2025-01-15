import React, { useEffect, useState } from "react";
import commandimage from "../../../assets/images/icons/market.png";
import DropDown from "../../extra/dropdown/DropDown";
import DropDowns from "../../extra/dropdown/DropDown";
import axios from "axios";
// import commands from "./commands.json";

import { PhotoProvider, PhotoView } from "react-photo-view";
const Market = () => {
    const [market, setmarket] = useState(null);
    useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API + "guide/Market").then((res) => {
            setmarket(res.data);
        });
    });
    return (
        <div className="guide">
            <div className="guideHeader">
                <img src={commandimage} className="guideHeaderImage"></img>
                <div className="whitetext contentTitle" id="market">
                    Market
                </div>
            </div>
            {market ? (
                <div className="guideContent">
                    <p className="normaltext guideText">{market.header}</p>
                    <DropDowns data={market.data}></DropDowns>
                    {market.image ? (
                        <PhotoProvider>
                            <PhotoView src={process.env.REACT_APP_BASE_URL + "/uploads/" + market.image}>
                                <img src={process.env.REACT_APP_BASE_URL + "/uploads/" + market.image} className="guideContentImg"></img>
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

export default Market;
