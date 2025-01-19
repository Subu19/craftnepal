import React, { useEffect, useState } from "react";
import "./main.css";
const Coffee = () => {
    const [show, toggle] = useState(false);
    useEffect(() => {
        if (show) {
        } else {
        }
    }, [show]);
    return (
        <div className={show ? "CoffeeContainner coffeeShow" : "CoffeeContainner"}>
            <i class="fa fa-coffee coffee" onClick={() => toggle(!show)}></i>
            <div className="coffeeHeader">
                <b className="normaltext coffeeText ">Chya Kham na {":)"}</b>
            </div>
            <div className="coffContent">
                <img
                    className="supportImage"
                    src="https://cdn.discordapp.com/attachments/1135250278401187951/1135256475883815062/image.png?ex=678dd93b&is=678c87bb&hm=f83b25afaaa2acad24a31a7dc3ec672c1a34d192019939a8ae8b9afaa2a2bb19&"
                ></img>
            </div>
        </div>
    );
};

export default Coffee;
