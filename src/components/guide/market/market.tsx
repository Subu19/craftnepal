// @ts-nocheck
import React, { useEffect, useState } from "react";
import marketimage from "../../../assets/images/icons/market.png";
import CustomMarkDown from "../../extra/CustomMarkDown";
import axios from "axios";

import { PhotoProvider, PhotoView } from "react-photo-view";
const Market = () => {
    const [market, setmarket] = useState(null);
    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "guide/Market").then((res) => {
            setmarket(res.data);
        });
    }, []);
    return (
        <div className="guide">
            <div className="guideHeader">
                <img src={marketimage} className="guideHeaderImage"></img>
                <div className="whitetext contentTitle" id="market">
                    Market
                </div>
            </div>
            {market && (
                <div className="guide-plain-content">
                    {market.header && <p className="normaltext guideText">{market.header}</p>}
                    <div className="guide-list">
                        {market.data && market.data.map((item, index) => (
                            <div key={index} className="guide-section">
                                <h3 className="guide-section-title">{item.title}</h3>
                                <div className="guide-section-text">
                                    <CustomMarkDown>{item.text}</CustomMarkDown>
                                </div>
                            </div>
                        ))}
                    </div>
                    {market.image ? (
                        <PhotoProvider>
                            <PhotoView src={import.meta.env.VITE_APP_BASE_URL + "/uploads/" + market.image}>
                                <img src={import.meta.env.VITE_APP_BASE_URL + "/uploads/" + market.image} className="guideContentImg"></img>
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

export default Market;

