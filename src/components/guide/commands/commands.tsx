// @ts-nocheck
import React, { useEffect, useState } from "react";
import commandimage from "../../../assets/images-test/icons/command.png";
import CustomMarkDown from "../../extra/CustomMarkDown";
import axios from "axios";

import { PhotoProvider, PhotoView } from "react-photo-view";
const Commands = () => {
    const [commands, setcommands] = useState(null);
    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "guide/Commands").then((res) => {
            setcommands(res.data);
        });
    }, []);
    return (
        <div className="guide">
            <div className="guideHeader">
                <img src={commandimage} className="guideHeaderImage"></img>
                <div className="whitetext contentTitle" id="commands">
                    Commands
                </div>
            </div>
            {commands && (
                <div className="guide-plain-content">
                    {commands.header && <p className="normaltext guideText">{commands.header}</p>}
                    <div className="guide-list">
                        {commands.data && commands.data.map((item, index) => (
                            <div key={index} className="guide-section">
                                <h3 className="guide-section-title">{item.title}</h3>
                                <div className="guide-section-text">
                                    <CustomMarkDown>{item.text}</CustomMarkDown>
                                </div>
                            </div>
                        ))}
                    </div>
                    {commands.image ? (
                        <PhotoProvider>
                            <PhotoView src={import.meta.env.VITE_APP_BASE_URL + "/uploads/" + commands.image}>
                                <img src={import.meta.env.VITE_APP_BASE_URL + "/uploads/" + commands.image} className="guideContentImg"></img>
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

export default Commands;

