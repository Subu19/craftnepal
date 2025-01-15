import React, { useEffect, useState } from "react";
import othersimage from "../../../assets/images/icons/others.png";
import DropDown from "../../extra/dropdown/DropDown";
import DropDowns from "../../extra/dropdown/DropDown";
import axios from "axios";
// import otherss from "./otherss.json";

import { PhotoProvider, PhotoView } from "react-photo-view";
const Others = () => {
    const [others, setothers] = useState(null);
    useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API + "guide/Others").then((res) => {
            setothers(res.data);
        });
    });
    return (
        <div className="guide">
            <div className="guideHeader">
                <img src={othersimage} className="guideHeaderImage"></img>
                <div className="whitetext contentTitle" id="others">
                    Others
                </div>
            </div>
            {others && others.header ? (
                <div className="guideContent">
                    <p className="normaltext guideText">{others.header}</p>
                    <DropDowns data={others.data}></DropDowns>
                    {others.image ? (
                        <PhotoProvider>
                            <PhotoView src={process.env.REACT_APP_BASE_URL + "/uploads/" + others.image}>
                                <img src={process.env.REACT_APP_BASE_URL + "/uploads/" + others.image} className="guideContentImg"></img>
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

export default Others;
