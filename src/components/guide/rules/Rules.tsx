// @ts-nocheck
import React, { useEffect, useState } from "react";
import rulesimage from "../../../assets/images-test/icons/rules.png";
import CustomMarkDown from "../../extra/CustomMarkDown";
import axios from "axios";

import { PhotoProvider, PhotoView } from "react-photo-view";
const Rules = () => {
    const [rules, setrules] = useState(null);
    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "guide/Rules").then((res) => {
            setrules(res.data);
        });
    }, []);
    return (
        <div className="guide">
            <div className="guideHeader">
                <img src={rulesimage} className="guideHeaderImage"></img>
                <div className="whitetext contentTitle" id="rules">
                    Rules
                </div>
            </div>
            {rules && (
                <div className="guide-plain-content">
                    {rules.header && <p className="normaltext guideText">{rules.header}</p>}
                    <div className="guide-list">
                        {rules.data && rules.data.map((item, index) => (
                            <div key={index} className="guide-section">
                                <h3 className="guide-section-title">{item.title}</h3>
                                <div className="guide-section-text">
                                    <CustomMarkDown>{item.text}</CustomMarkDown>
                                </div>
                            </div>
                        ))}
                    </div>
                    {rules.image ? (
                        <PhotoProvider>
                            <PhotoView src={import.meta.env.VITE_APP_BASE_URL + "/uploads/" + rules.image}>
                                <img src={import.meta.env.VITE_APP_BASE_URL + "/uploads/" + rules.image} className="guideContentImg"></img>
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

export default Rules;


