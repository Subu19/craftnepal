// @ts-nocheck
import React, { useEffect, useState } from "react";
import othersimage from "../../../assets/images/icons/others.png";
import CustomMarkDown from "../../extra/CustomMarkDown";
import axios from "axios";

import { PhotoProvider, PhotoView } from "react-photo-view";
const Others = () => {
    const [others, setothers] = useState(null);
    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "guide/Others").then((res) => {
            setothers(res.data);
        });
    }, []);
    return (
        <div className="guide">
            <div className="guideHeader">
                <img src={othersimage} className="guideHeaderImage"></img>
                <div className="whitetext contentTitle" id="others">
                    Others
                </div>
            </div>
            {others && (
                <div className="guide-plain-content">
                    {others.header && <p className="normaltext guideText">{others.header}</p>}
                    <div className="guide-list">
                        {others.data && others.data.map((item, index) => (
                            <div key={index} className="guide-section">
                                <h3 className="guide-section-title">{item.title}</h3>
                                <div className="guide-section-text">
                                    <CustomMarkDown>{item.text}</CustomMarkDown>
                                </div>
                            </div>
                        ))}
                    </div>
                    {others.image ? (
                        <PhotoProvider>
                            <PhotoView src={import.meta.env.VITE_APP_BASE_URL + "/uploads/" + others.image}>
                                <img src={import.meta.env.VITE_APP_BASE_URL + "/uploads/" + others.image} className="guideContentImg"></img>
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

export default Others;

