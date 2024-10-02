import React, { useContext, useState } from "react";
import Coffee from "../components/extra/Coffee/Coffee";
import Nav from "../components/Nav/Nav";

const Map = () => {
    const [maperror, setmaperror] = useState(false);
    return (
        <div className="map">
            <Coffee></Coffee>
            <Nav selected="map" focused={true}></Nav>
            {maperror == false ? (
                <iframe className="mapContainner" src="https://map.craftnepal.net" onError={() => setmaperror(true)}></iframe>
            ) : (
                <div className="contentTitle whitetext">
                    Error showing map
                    <div className="normaltext">
                        please fall back to
                        <a href="http://play.craftnepal.net:8169/">Original MAP</a>{" "}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Map;
