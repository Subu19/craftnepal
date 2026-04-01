// @ts-nocheck
import React, { useEffect, useState } from "react";
import faqimage from "../../../assets/images/icons/faq.png";
import CustomMarkDown from "../../extra/CustomMarkDown";
import axios from "axios";

import { PhotoProvider, PhotoView } from "react-photo-view";
const FAQ = () => {
    const [faq, setfaq] = useState(null);
    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "guide/FAQ").then((res) => {
            setfaq(res.data);
        });
    }, []);
    return (
        <div className="guide">
            <div className="guideHeader">
                <img src={faqimage} className="guideHeaderImage"></img>
                <div className="whitetext contentTitle" id="faq">
                    Faq
                </div>
            </div>
            {faq && (
                <div className="guide-plain-content">
                    {faq.header && <p className="normaltext guideText">{faq.header}</p>}
                    <div className="guide-list">
                        {faq.data && faq.data.map((item, index) => (
                            <div key={index} className="guide-section">
                                <h3 className="guide-section-title">{item.title}</h3>
                                <div className="guide-section-text">
                                    <CustomMarkDown>{item.text}</CustomMarkDown>
                                </div>
                            </div>
                        ))}
                    </div>
                    {faq.image ? (
                        <PhotoProvider>
                            <PhotoView src={import.meta.env.VITE_APP_BASE_URL + "/uploads/" + faq.image}>
                                <img src={import.meta.env.VITE_APP_BASE_URL + "/uploads/" + faq.image} className="guideContentImg"></img>
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

export default FAQ;

