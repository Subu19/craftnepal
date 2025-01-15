import React, { useEffect, useState } from "react";
import faqimage from "../../../assets/images/icons/faq.png";
import DropDown from "../../extra/dropdown/DropDown";
import DropDowns from "../../extra/dropdown/DropDown";
import axios from "axios";
// import faqs from "./faqs.json";

import { PhotoProvider, PhotoView } from "react-photo-view";
const FAQ = () => {
    const [faq, setfaq] = useState(null);
    useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API + "guide/FAQ").then((res) => {
            setfaq(res.data);
        });
    });
    return (
        <div className="guide">
            <div className="guideHeader">
                <img src={faqimage} className="guideHeaderImage"></img>
                <div className="whitetext contentTitle" id="faq">
                    faq
                </div>
            </div>
            {faq && faq.header ? (
                <div className="guideContent">
                    <p className="normaltext guideText">{faq.header}</p>
                    <DropDowns data={faq.data}></DropDowns>
                    {faq.image ? (
                        <PhotoProvider>
                            <PhotoView src={process.env.REACT_APP_BASE_URL + "/uploads/" + faq.image}>
                                <img src={process.env.REACT_APP_BASE_URL + "/uploads/" + faq.image} className="guideContentImg"></img>
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

export default FAQ;
