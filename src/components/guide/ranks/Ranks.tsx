// @ts-nocheck
import React, { useEffect, useState } from "react";
import ranksimage from "../../../assets/images/icons/rank.png";
import CustomMarkDown from "../../extra/CustomMarkDown";
import axios from "axios";

import { PhotoProvider, PhotoView } from "react-photo-view";
const Ranks = () => {
    const [ranks, setranks] = useState(null);
    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "guide/Ranks").then((res) => {
            setranks(res.data);
        });
    }, []);
    return (
        <div className="guide">
            <div className="guideHeader">
                <img src={ranksimage} className="guideHeaderImage"></img>
                <div className="whitetext contentTitle" id="ranks">
                    Ranks
                </div>
            </div>
            {ranks && (
                <div className="guide-plain-content">
                    {ranks.header && <p className="normaltext guideText">{ranks.header}</p>}
                    <div className="guide-list">
                        {ranks.data && ranks.data.map((item, index) => (
                            <div key={index} className="guide-section">
                                <h3 className="guide-section-title">{item.title}</h3>
                                <div className="guide-section-text">
                                    <CustomMarkDown>{item.text}</CustomMarkDown>
                                </div>
                            </div>
                        ))}
                    </div>
                    {ranks.image ? (
                        <PhotoProvider>
                            <PhotoView src={import.meta.env.VITE_APP_BASE_URL + "/uploads/" + ranks.image}>
                                <img src={import.meta.env.VITE_APP_BASE_URL + "/uploads/" + ranks.image} className="guideContentImg"></img>
                            </PhotoView>
                        </PhotoProvider>
                    ) : (
                        ""
                    )}
                </div>
            )}
        </div>
    );
};

export default Ranks;

