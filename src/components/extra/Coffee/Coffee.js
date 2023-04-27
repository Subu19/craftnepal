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
          src="https://media.discordapp.net/attachments/725600128852820039/853620336716283934/IMG_20210613_184625.jpg?width=523&height=663"
        ></img>
      </div>
    </div>
  );
};

export default Coffee;
