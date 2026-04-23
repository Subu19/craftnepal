import { useEffect, useState } from "react";
import "./main.css";
import esewa from "../../../assets/images/esewa.png"
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
                    src={esewa}
                ></img>
            </div>
        </div>
    );
};

export default Coffee;
